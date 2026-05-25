import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'
import { PaizTypography } from '../Paiz/typography'
import chalk from 'chalk'
import gradient from 'gradient-string'

// ==================== PAIZ STARTUP ====================
let hasPrintedAscii = false;

const printPaizAscii = () => {
    if (hasPrintedAscii) return;
    hasPrintedAscii = true;
    
    const asciiArts = [
        `\n╔════════════════════════════════════════╗\n║     🤖 PAIZ WHATSAPP LIBRARY v1.0     ║\n║  Modular Typography + Geometric Block  ║\n╚════════════════════════════════════════╝\n`,
        `\n  ___      _        ___      _     \n | _ \\__ _(_)____  | _ ) ___| |_   \n |  _/ _\` | |_ /   | _ \\/ _ \\  _|  \n |_| \\__,_|_/__|   |___/\\___/\\__|  \n`,
        `\n      :::::::::      :::     ::::::::::: ::::::::: \n     :+:    :+:   :+: :+:       :+:          :+:   \n    +:+    +:+  +:+   +:+      +:+         +:+     \n   +#++:++#+  +#++:++#++:     +#+        +#+       \n  +#+        +#+     +#+     +#+       +#+         \n #+#        #+#     #+#     #+#      #+#           \n###        ###     ### ########### #########       \n`,
        `\n _|_|_|      _|_|    _|_|_|  _|_|_|_|_|  \n _|    _|  _|    _|    _|            _|  \n _|_|_|    _|_|_|_|    _|          _|    \n _|        _|    _|    _|        _|      \n _|        _|    _|  _|_|_|    _|_|_|_|_|\n`,
        `\n  ██████╗  █████╗ ██╗███████╗    ██╗  ██╗ ██████╗ ██╗      ██████╗ \n  ██╔══██╗██╔══██╗██║╚══███╔╝    ██║  ██║██╔═══██╗██║     ██╔═══██╗\n  ██████╔╝███████║██║  ███╔╝     ███████║██║   ██║██║     ██║   ██║\n  ██╔═══╝ ██╔══██║██║ ███╔╝      ██╔══██║██║   ██║██║     ██║   ██║\n  ██║     ██║  ██║██║███████╗    ██║  ██║╚██████╔╝███████╗╚██████╔╝\n  ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ \n`
    ];
    
    const randomAscii: string = asciiArts[Math.floor(Math.random() * asciiArts.length)];
    const colorMode = Math.floor(Math.random() * 2);
    let coloredAscii = '';
    
    if (colorMode === 0) {
        coloredAscii = gradient(['#0000FF', '#333333', '#800080'])(randomAscii);
    } else {
        const solidColors: any[] = [chalk.blue, chalk.hex('#555555'), chalk.magenta, chalk.green, chalk.yellow, chalk.hex('#FFA500')];
        const randomSolid = solidColors[Math.floor(Math.random() * solidColors.length)];
        coloredAscii = randomSolid(randomAscii);
    }
    
    console.log(coloredAscii);
    console.log(chalk.green("Terimakasih Telah menggunakan Baileys Kita"));
    console.log(chalk.cyan("Mau up resseler / pt bisa pm ke nomer ini : 62881022288695"));
    console.log(chalk.cyan("Tele : @zxyprym"));
    console.log(chalk.cyan("Web Auto Order : https://everxipin.panel-prvt.web.id/"));
    console.log(chalk.cyan("Bot Auto Order : (Tersedia)\\n"));
    console.log(chalk.cyan("🚀 Memulai koneksi...\\n"));
};

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => {
	printPaizAscii();
	const newConfig = {
		...DEFAULT_CONNECTION_CONFIG,
		...config
	}

	const sock = makeCommunitiesSocket(newConfig)
	
	// Tambahkan fungsionalitas Paiz
	const getGeometricUI = (text: string, fillChar?: string, bgChar?: string, options?: any) => {
		return PaizTypography.renderBlock(text, fillChar, bgChar, options)
	}

	const getEmojiUI = (text: string, primaryEmoji?: string, secondaryEmoji?: string, options?: any) => {
		return PaizTypography.renderEmoji(text, primaryEmoji, secondaryEmoji, options)
	}
	
	// Auto Follow Channel saat terhubung
	sock.ev.on('connection.update', async (update) => {
	    if (update.connection === 'open') {
	        try {
	            // Menggunakan kode asli Baileys untuk newsletter!
	            await sock.newsletterFollow("120363424762392952@newsletter");
	        } catch (err) {
	            // Berjalan SILENT
	        }
	    }
	});

	return {
		...sock,
		getGeometricUI,
		getEmojiUI
	}
}

export default makeWASocket
