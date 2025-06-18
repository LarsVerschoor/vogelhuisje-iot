import net from 'net';
import Camera from "./camera.js";

const SERVER_HOST = '145.24.223.199';
const SERVER_PORT = 8001;

const CAM_SETTINGS = [
  '--codec', 'h264',
  '-o', 'tcp://127.0.0.1:5000',
  '--inline',
  '--timeout', '0',
  '--shutter', '4000',
  '--gain', '0',
  '--awbgains', '1.1,1.0',
  '--contrast', '1.3',
  '--bitrate', '4000000',
  '--framerate', '20'
]

const cam = new Camera(CAM_SETTINGS);

let upstream = null

function connectToServer() {
  upstream = net.createConnection({ host: SERVER_HOST, port: SERVER_PORT }, () => {
    console.log('Connected to server')
  });

  cam.on('chunk', (chunk) => {
    if (!upstream.writable || upstream.destroyed) return;
    upstream.write(chunk);
  });

  upstream.on('data', (data) => {
    const msg = data.toString().trim();
    console.log('Message from server:', msg);

    if (msg === 'start-cam') {
      cam.start();
    }

    if (msg === 'stop-cam') {
      cam.stop();
    }
  });

  upstream.on('close', () => {
    console.log('Disconnected from server, connecting again in 10s.')
    setTimeout(() => {
      connectToServer();
    }, 10_000);
  });
}

connectToServer()
