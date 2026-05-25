/**
 * PaizTypography - Geometric Block & Modular Typography Engine
 * 
 * Engine ini mengubah string teks menjadi representasi visual blok geometris
 * menggunakan matriks 5x5. Mendukung dua mode output:
 * 1. renderBlock() - Menggunakan karakter monospace (██, ░░, dll)
 * 2. renderEmoji() - Menggunakan emoji kotak berwarna (🟥, ⬛, dll)
 * 
 * Fitur Anti-Wrap: Validasi panjang input maksimal 6 karakter untuk mencegah
 * word wrap di layar mobile WhatsApp.
 */

export interface TypographyOptions {
    maxLength?: number;     // Batas maksimal karakter (default: 6)
    letterSpacing?: number; // Jarak antar huruf (default: 1)
}

export class PaizTypography {
    // Matriks font modular 5x5. Angka 1 = blok dinding, 0 = ruang kosong.
    private static fontBlocks: { [key: string]: number[][] | null } = {
        'A': [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
        'B': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0]],
        'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1]],
        'D': [[1,1,1,0,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,1,1,0,0]],
        'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
        'F': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,0,0],[1,0,0,0,0],[1,0,0,0,0]],
        'G': [[0,1,1,1,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[0,1,1,1,1]],
        'H': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
        'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
        'J': [[0,0,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0]],
        'K': [[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
        'L': [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
        'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
        'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
        'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
        'P': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
        'Q': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,0],[0,1,1,0,1]],
        'R': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,1,0],[1,0,0,0,1]],
        'S': [[0,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
        'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
        'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
        'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
        'W': [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
        'X': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
        'Y': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
        'Z': [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
        '1': [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
        '2': [[0,1,1,1,0],[0,0,0,0,1],[0,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
        '3': [[1,1,1,1,0],[0,0,0,0,1],[0,0,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
        '4': [[1,0,0,1,0],[1,0,0,1,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,0,1,0]],
        '5': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
        '6': [[0,1,1,1,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
        '7': [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[0,1,0,0,0]],
        '8': [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
        '9': [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],
        '0': [[0,1,1,1,0],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[0,1,1,1,0]],
        '!': [[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]],
        '?': [[0,1,1,1,0],[1,0,0,0,1],[0,0,1,1,0],[0,0,0,0,0],[0,0,1,0,0]],
        ' ': null // Spasi khusus
    };

    /**
     * Validasi panjang input untuk mencegah word wrap di layar mobile.
     * Default maksimal 6 karakter agar tetap proporsional di WhatsApp.
     */
    private static validateInput(text: string, options?: TypographyOptions): string {
        const maxLen = options?.maxLength ?? 6;
        const clean = text.toUpperCase();

        if (clean.length > maxLen) {
            console.warn(`[PaizTypography] Input melebihi batas ${maxLen} karakter. Memotong otomatis.`);
            return clean.substring(0, maxLen);
        }
        return clean;
    }

    /**
     * Render teks menjadi blok geometris menggunakan karakter monospace.
     * Output harus dibungkus ``` (triple backtick) di WhatsApp agar lurus.
     * 
     * @param text - Teks yang akan dirender
     * @param fill - Karakter untuk blok aktif (default: '██')
     * @param bg - Karakter untuk latar belakang (default: '  ')
     * @param options - Opsi tambahan (maxLength, letterSpacing)
     */
    public static renderBlock(
        text: string, 
        fill: string = '██', 
        bg: string = '  ',
        options?: TypographyOptions
    ): string {
        const input = this.validateInput(text, options);
        const spacing = options?.letterSpacing ?? 1;
        let lines = ['', '', '', '', ''];

        for (const char of input) {
            const matrix = this.fontBlocks[char];

            if (matrix) {
                for (let r = 0; r < 5; r++) {
                    let rowStr = '';
                    for (let c = 0; c < 5; c++) {
                        rowStr += matrix[r][c] === 1 ? fill : bg;
                    }
                    lines[r] += rowStr + bg.repeat(spacing);
                }
            } else if (char === ' ') {
                // Spasi antar kata (3 kolom bg)
                for (let r = 0; r < 5; r++) lines[r] += bg.repeat(3);
            } else {
                // Karakter tidak dikenali, render sebagai spasi
                for (let r = 0; r < 5; r++) lines[r] += bg.repeat(5 + spacing);
            }
        }
        return lines.join('\n');
    }

    /**
     * Render teks menjadi susunan emoji geometris modular.
     * Sangat estetik untuk UI Chat WhatsApp.
     * 
     * @param text - Teks yang akan dirender
     * @param primaryEmoji - Emoji untuk blok aktif (default: '🟥')
     * @param secondaryEmoji - Emoji untuk latar belakang (default: '⬛')
     * @param options - Opsi tambahan (maxLength, letterSpacing)
     */
    public static renderEmoji(
        text: string, 
        primaryEmoji: string = '🟥', 
        secondaryEmoji: string = '⬛',
        options?: TypographyOptions
    ): string {
        return this.renderBlock(text, primaryEmoji, secondaryEmoji, options);
    }

    /**
     * Dapatkan daftar karakter yang didukung oleh engine.
     */
    public static getSupportedChars(): string[] {
        return Object.keys(this.fontBlocks);
    }
}
