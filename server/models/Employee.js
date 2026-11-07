import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
