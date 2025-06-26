# vogelhuisje-iot
De iot code voor het TLE 2 Deel 2 digitale vogelhuisje

## Opstarten

Assuming you have already connected your infrared camera module to your raspberry pi:

1. Install dependencies
    ```bash
    npm install
    ```

2. Install FFmpeg
    ```bash
   sudo apt install ffmpeg
    ```

3. Start camera and TCP client
    ```bash
   npm run start
    ```