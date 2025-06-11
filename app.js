const io = require('socket.io-client');
const { StreamCamera, Codec, Flip, SensorMode } = require('pi-camera-connect');
const socket = io.connect('http://87.212.214.27/whatsvogel/iot');

const streamCamera = new StreamCamera({
	codec: Codec.MJPEG,
	flip: Flip.Vertical,
	sensorMode: SensorMode.Mode6
});

socket.on('connect', () => {
	socket.sendBuffer = [];

	socket.emit('pi-cam-init', 'cam-1');

	console.log('Connected to the server!' + socket.id);
});

async function cameraStartCapture() {
	await streamCamera.startCapture();
}

async function cameraStopCapture() {
	await streamCamera.stopCapture();
}

cameraStartCapture().then(() => {
	console.log('Camera is not capturing!');
});
