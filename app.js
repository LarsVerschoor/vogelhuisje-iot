const net = require('net');
const fs = require('fs');
const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const libcameraProcess = spawn('libcamera-vid', ['--codec', 'h264', '-o', 'tcp://127.0.0.1:5000', '--inline', '--timeout', '0']);

const server = net.createServer(socket => {
  console.log('Client connected');
  const file = fs.createWriteStream('stream2.h264');

  socket.on('data', (chunk) => {
    console.log(`Received frame chunk of size: ${chunk.length} bytes`);
  });

  socket.pipe(file);

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  timeoutId = setTimeout(() => {
    console.log('10 seconds passed since first data chunk, killing libcameraProcess...');
    libcameraProcess.kill();
  }, 10000);
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});

