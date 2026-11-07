import ContactMessage from '../models/ContactMessage.js';
import { isDbConnected } from '../config/db.js';
import { mockMessages } from '../utils/mockStore.js';

// @desc    Submit a contact message
// @route   POST /api/messages
// @access  Public
export const submitMessage = async (req, res) => {
    try {
        const { name, email, phone, message, type } = req.body;

        if (!name || (!email && !phone)) {
            return res.status(400).json({ success: false, message: 'Please provide name and contact info' });
        }

        if (!isDbConnected()) {
            const newMsg = {
                _id: 'msg_' + Date.now(),
                name,
                email,
                phone,
                message,
                type: type || 'Message',
                status: 'New',
                isRead: false,
                createdAt: new Date().toISOString()
            };
            mockMessages.unshift(newMsg);
            return res.status(201).json({
                success: true,
                message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
                data: newMsg
            });
        }

        const newMessage = await ContactMessage.create({ name, email, phone, message, type: type || 'Message' });
        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({ success: true, data: mockMessages });
        }
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        res.json({ success: true, data: mockMessages });
    }
};

// @desc    Update message status (read/unread/status)
// @route   PUT /api/messages/:id
// @access  Private/Admin
export const updateMessageStatus = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const msg = mockMessages.find(m => m._id === req.params.id);
            if (msg) {
                if (req.body.isRead !== undefined) msg.isRead = req.body.isRead;
                if (req.body.status !== undefined) msg.status = req.body.status;
                return res.json({ success: true, data: msg });
            }
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        const message = await ContactMessage.findById(req.params.id);
        if (message) {
            if (req.body.isRead !== undefined) message.isRead = req.body.isRead;
            if (req.body.status !== undefined) message.status = req.body.status;
            const updatedMessage = await message.save();
            res.json({ success: true, data: updatedMessage });
        } else {
            res.status(404).json({ success: false, message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
    try {
        if (!isDbConnected()) {
            const idx = mockMessages.findIndex(m => m._id === req.params.id);
            if (idx !== -1) {
                mockMessages.splice(idx, 1);
                return res.json({ success: true, message: 'Message removed' });
            }
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        const message = await ContactMessage.findById(req.params.id);
        if (message) {
            await message.deleteOne();
            res.json({ success: true, message: 'Message removed' });
        } else {
            res.status(404).json({ success: false, message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
