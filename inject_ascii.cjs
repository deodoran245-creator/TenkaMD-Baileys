const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const imagePath = process.argv[2];
const indexTsPath = 'd:\\di sini all file bot\\baileys\\baileys-paiz-core\\src\\Socket\\index.ts';

const targetWidth = 50; 
const chars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

async function processImageAndInject() {
    try {
        const image = await Jimp.read(imagePath);
        
        const width = targetWidth;
        const height = Math.floor((image.bitmap.height / image.bitmap.width) * width * 0.5);
        
        image.resize(width, height);
        
        let output = '\\n'; // Start with a newline
        
        for (let y = 0; y < height; y++) {
            let row = '';
            for (let x = 0; x < width; x++) {
                const color = Jimp.intToRGBA(image.getPixelColor(x, y));
                const brightness = (color.r * 0.299 + color.g * 0.587 + color.b * 0.114) / 255;
                const charIndex = Math.floor((1 - brightness) * (chars.length - 1));
                const char = chars[charIndex];
                
                // Use \\x1b so that in the TS source code it appears as \x1b which TS parses to the escape character
                row += `\\x1b[38;2;${color.r};${color.g};${color.b}m${char}`;
            }
            row += '\\x1b[0m\\n';
            output += row;
        }
        
        let indexTs = fs.readFileSync(indexTsPath, 'utf8');
        
        // Find the end of the asciiArts array
        const searchString = '    ];\\n    \\n    const randomAscii';
        if (indexTs.includes(searchString)) {
            // Append the 6th ASCII art to the array
            // The previous element is string 5, we need to add a comma and then our string
            // Let's replace the last backtick of the 5th element + newline + brackets with comma + our string
            
            // The 5th ascii art ends with \n`
            // Let's just do a regex replace
            indexTs = indexTs.replace(/\\n\`\\n    \];/, '\\n`,\n        `' + output + '`\n    ];');
            
            fs.writeFileSync(indexTsPath, indexTs);
            console.log('Successfully injected 6th ASCII art into Socket/index.ts');
        } else {
            console.error('Could not find insertion point in index.ts');
            // Try fallback replacement
            const altSearch = '    ];\r\n    \r\n    const randomAscii';
            if (indexTs.includes(altSearch)) {
                 indexTs = indexTs.replace(/\\n\`\r\n    \];/, '\\n`,\n        `' + output + '`\n    ];');
                 fs.writeFileSync(indexTsPath, indexTs);
                 console.log('Successfully injected 6th ASCII art (CRLF)');
            } else {
                 console.log("Failed all replacements. Saving string to file so we can debug.");
                 fs.writeFileSync('d:\\di sini all file bot\\scratch\\debug_output.txt', output);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

processImageAndInject();
