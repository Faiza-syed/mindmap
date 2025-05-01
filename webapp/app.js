// Replace with your deployed Flask backend URL
const API_URL = "http://mindmap-flask-backend.herokuapp.com";

let isDrawing = false;
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Canvas Drawing Logic
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

async function login() {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    });
    const data = await response.json();
    if (data.token) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('drawing-section').style.display = 'block';
    }
}

async function predict() {
    const imageData = canvas.toDataURL();  // Get drawing as base64
    const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    });
    const result = await response.json();
    document.getElementById('result').innerHTML = `Result: ${result.prediction}`;
}