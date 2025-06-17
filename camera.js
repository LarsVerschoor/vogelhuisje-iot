import { spawn } from 'child_process';
import net from 'net';
import { EventEmitter } from 'events';

class Camera extends EventEmitter{
    constructor(settings) {
        super();
        this.settings = settings;
        this.libcameraProcess = null;

        this.server = net.createServer(socket => {
            socket.on('data', (chunk) => {
                console.log(`Received frame chunk of size: ${chunk.length} bytes`);
                this.emit('chunk', chunk);
            });

            socket.on('end', () => {
                console.log('Camera stream disconnected');
            });
        });

        this.server.listen(5000);
    }

    start() {
        if (this.libcameraProcess) return;
        this.libcameraProcess = spawn('libcamera-vid', this.settings);
    }

    stop() {
        if (!this.libcameraProcess) return;
        this.libcameraProcess.kill();
        this.libcameraProcess = null;
    }
}

export default Camera;

