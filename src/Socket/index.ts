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

    // ==================== 30 FITUR EKSTENSI DEWA ====================

    // 1. Kirim Kontak VCard
    const sendContact = async (jid: string, number: string, name: string, quoted?: any) => {
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`
        return sock.sendMessage(jid, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted });
    };
    // 2. Kirim Lokasi / Map
    const sendLocation = async (jid: string, lat: number, long: number, quoted?: any) => {
        return sock.sendMessage(jid, { location: { degreesLatitude: lat, degreesLongitude: long } }, { quoted });
    };
    // 3. Kirim File/Dokumen (APK, PDF, ZIP, dll)
    const sendFile = async (jid: string, urlOrBuffer: any, fileName: string, mimetype: string, quoted?: any) => {
        return sock.sendMessage(jid, { document: urlOrBuffer, mimetype, fileName }, { quoted });
    };
    // 4. Forward Pesan
    const forwardMsg = async (jid: string, message: any) => {
        return sock.sendMessage(jid, { forward: message, force: true });
    };
    // 5. Dapatkan Link Invite Grup
    const getGroupInvite = async (jid: string) => {
        return sock.groupInviteCode(jid);
    };
    // 6. Reset Link Grup (Anti-Bocil)
    const revokeGroupInvite = async (jid: string) => {
        return sock.groupRevokeInvite(jid);
    };
    // 7. Ubah Nama Grup
    const setGroupName = async (jid: string, name: string) => {
        return sock.groupUpdateSubject(jid, name);
    };
    // 8. Ubah Deskripsi Grup
    const setGroupDesc = async (jid: string, desc: string) => {
        return sock.groupUpdateDescription(jid, desc);
    };
    // 9. Ubah Foto Profil Grup
    const setGroupPP = async (jid: string, urlOrBuffer: any) => {
        return sock.updateProfilePicture(jid, urlOrBuffer);
    };
    // 10. Promote Member jadi Admin
    const promote = async (jid: string, participants: string[]) => {
        return sock.groupParticipantsUpdate(jid, participants, 'promote');
    };
    // 11. Demote Admin jadi Member biasa
    const demote = async (jid: string, participants: string[]) => {
        return sock.groupParticipantsUpdate(jid, participants, 'demote');
    };
    // 12. Add Member ke Grup
    const addMember = async (jid: string, participants: string[]) => {
        return sock.groupParticipantsUpdate(jid, participants, 'add');
    };
    // 13. Kick Member dari Grup
    const kickMember = async (jid: string, participants: string[]) => {
        return sock.groupParticipantsUpdate(jid, participants, 'remove');
    };
    // 14. Tutup Grup (Hanya Admin yang bisa chat)
    const closeGroup = async (jid: string) => {
        return sock.groupSettingUpdate(jid, 'announcement');
    };
    // 15. Buka Grup (Semua bisa chat)
    const openGroup = async (jid: string) => {
        return sock.groupSettingUpdate(jid, 'not_announcement');
    };
    // 16. Bot keluar dari Grup
    const leaveGroup = async (jid: string) => {
        return sock.groupLeave(jid);
    };
    // 17. Buat Grup Baru
    const createGroup = async (name: string, participants: string[]) => {
        return sock.groupCreate(name, participants);
    };
    // 18. Ubah Nama Profil Bot
    const setBotName = async (name: string) => {
        return sock.updateProfileName(name);
    };
    // 19. Ubah Bio/Status Bot
    const setBotBio = async (bio: string) => {
        return sock.updateProfileStatus(bio);
    };
    // 20. Ubah Foto Profil Bot (DP)
    const setBotPP = async (urlOrBuffer: any) => {
        return sock.updateProfilePicture(sock.user?.id || '', urlOrBuffer);
    };
    // 21. Intip Profil Bisnis WA Bisnis Orang
    const getBusinessProfile = async (jid: string) => {
        return sock.getBusinessProfile(jid);
    };
    // 22. Post Status WA (Story)
    const postStatus = async (content: any) => {
        return sock.sendMessage('status@broadcast', content);
    };
    // 23. Baca Story/Status WA orang (Silent)
    const readStatus = async (key: any) => {
        return sock.readMessages([key]);
    };
    // 24. Hapus Riwayat Chat (Clear Chat)
    const clearChat = async (jid: string) => {
        return sock.chatModify({ clear: { messages: [] } } as any, jid);
    };
    // 25. Arsipkan Chat
    const archiveChat = async (jid: string, archive: boolean = true) => {
        return sock.chatModify({ archive } as any, jid);
    };
    // 26. Cek Online/Presence User
    const pingUser = async (jid: string) => {
        return sock.presenceSubscribe(jid);
    };
    // 27. Unblock User (Buka Blokir)
    const unblock = async (jid: string) => {
        return sock.updateBlockStatus(jid, 'unblock');
    };
    // 28. Kirim Banyak Kontak Sekaligus
    const sendContacts = async (jid: string, contacts: { name: string, number: string }[], quoted?: any) => {
        const vcards = contacts.map(c => ({
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;type=CELL;type=VOICE;waid=${c.number}:+${c.number}\nEND:VCARD`
        }));
        return sock.sendMessage(jid, { contacts: { displayName: `${contacts.length} Kontak`, contacts: vcards } }, { quoted });
    };
    // 29. Dapatkan Metadata Grup Lengkap
    const getGroupData = async (jid: string) => {
        return sock.groupMetadata(jid);
    };
    // 30. Bintangi / Tandai Pesan Penting (Star)
    const starMsg = async (jid: string, messageId: string, fromMe: boolean, star: boolean = true) => {
        return sock.chatModify({ star: { messages: [{ id: messageId, fromMe }], star } }, jid);
    };

    return {
        ...sock,
        // Paiz Typography
        getGeometricUI,
        getEmojiUI,
        // 10 fitur sebelumnya
        sendPoll,
        react,
        setTyping,
        setRecording,
        markRead,
        deleteMsg,
        getPP,
        block,
        pinMsg,
        sendVN,
        // 30 fitur baru
        sendContact,
        sendLocation,
        sendFile,
        forwardMsg,
        getGroupInvite,
        revokeGroupInvite,
        setGroupName,
        setGroupDesc,
        setGroupPP,
        promote,
        demote,
        addMember,
        kickMember,
        closeGroup,
        openGroup,
        leaveGroup,
        createGroup,
        setBotName,
        setBotBio,
        setBotPP,
        getBusinessProfile,
        postStatus,
        readStatus,
        clearChat,
        archiveChat,
        pingUser,
        unblock,
        sendContacts,
        getGroupData,
        starMsg
    }
}

export default makeWASocket
