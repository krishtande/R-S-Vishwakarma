import fs from 'fs';

async function testUpload() {
  try {
    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: new FormData()
    });

    const text = await res.text();
    console.log('POST /api/upload Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

testUpload();
