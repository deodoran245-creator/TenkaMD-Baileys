const Jimp = require('jimp');
const fs = require('fs');

const imagePath = process.argv[2];
const targetWidth = 60; // Lebar karakter
const chars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

async function processImage() {
    try {
        const image = await Jimp.read(imagePath);
        
        // Terminal characters are about twice as tall as they are wide.
        // So we divide the target height by 2.
        const width = targetWidth;
        const height = Math.floor((image.bitmap.height / image.bitmap.width) * width * 0.5);
        
        image.resize(width, height);
        
        let output = '';
        
        for (let y = 0; y < height; y++) {
            let row = '';
            for (let x = 0; x < width; x++) {
                const color = Jimp.intToRGBA(image.getPixelColor(x, y));
                // Kalkulasi brightness
                const brightness = (color.r * 0.299 + color.g * 0.587 + color.b * 0.114) / 255;
                const charIndex = Math.floor((1 - brightness) * (chars.length - 1));
                const char = chars[charIndex];
                
                // ANSI truecolor escape code
                row += `\\x1b[38;2;${color.r};${color.g};${color.b}m${char}`;
            }
            // Reset color at the end of the line
            row += '\\x1b[0m\\n';
            output += row;
        }
        
        fs.writeFileSync('d:\\di sini all file bot\\scratch\\ascii_art_result.txt', output);
        console.log('Done!');
    } catch (e) {
        console.error(e);
    }
}

processImage();
