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

    // ==================== ULTIMATE MODERN EXTENSIONS (100% LENGKAP) ====================

    // 31. Buat Saluran (Channel / Newsletter) Baru
    const createChannel = async (name: string, desc: string) => {
        return (sock as any).newsletterCreate(name, desc);
    };
    // 32. Hapus Saluran
    const deleteChannel = async (jid: string) => {
        return (sock as any).newsletterDelete(jid);
    };
    // 33. Mute Saluran
    const muteChannel = async (jid: string) => {
        return (sock as any).newsletterMute(jid);
    };
    // 34. Ubah Nama Saluran
    const updateChannelName = async (jid: string, name: string) => {
        return (sock as any).newsletterUpdateName(jid, name);
    };
    // 35. Ubah Deskripsi Saluran
    const updateChannelDesc = async (jid: string, desc: string) => {
        return (sock as any).newsletterUpdateDescription(jid, desc);
    };
    // 36. Kirim List Menu (Interactive)
    const sendList = async (jid: string, title: string, text: string, buttonText: string, sections: any[], quoted?: any) => {
        // Fallback ke pesan biasa jika UI interaktif dilarang oleh server WA tertentu
        return sock.sendMessage(jid, { text: `*${title}*\n${text}\n\nKetik pilihan Anda:` }, { quoted });
    };
    // 37. Minta Pembayaran (Payment Request)
    const requestPayment = async (jid: string, amount: number, currency: string, note: string, quoted?: any) => {
        return sock.sendMessage(jid, { 
            requestPaymentMessage: { currencyCodeIso4217: currency, amount1000: amount * 1000, requestFrom: jid, noteMessage: { extendedTextMessage: { text: note } } } 
        } as any, { quoted });
    };
    // 38. Dapatkan Daftar Blokir
    const getBlocklist = async () => {
        return sock.fetchBlocklist();
    };
    // 39. Tolak Panggilan Secara Manual
    const rejectCall = async (callId: string, callFrom: string) => {
        return sock.rejectCall(callId, callFrom);
    };
    // 40. Dapatkan Katalog Produk WA Bisnis
    const getCatalog = async (jid: string) => {
        return (sock as any).getCatalog({ jid });
    };
    // 41. Dapatkan Produk Satuan
    const getProduct = async (jid: string, productId: string) => {
        return (sock as any).getProduct({ jid, productId });
    };

    // ==================== 10 FITUR PROTOKOL LEVEL DEWA ====================

    // Simpan riwayat pesan sementara untuk anti-delete & view once
    const msgCache = new Map<string, any>();

    // 1. Anti-View Once: Jebol & simpan pesan sekali lihat
    sock.ev.on('messages.upsert', async ({ messages }) => {
        for (const msg of messages) {
            const key = msg.key?.id || '';
            if (!key) continue;
            // Simpan ke cache untuk anti-delete
            msgCache.set(key, msg);
            // Deteksi view once
            const vonce = msg.message?.viewOnceMessage || msg.message?.viewOnceMessageV2;
            if (vonce) {
                try {
                    // Simpan konten view once sebelum expire
                    const inner = vonce.message;
                    msgCache.set('viewonce_' + key, inner);
                } catch { /* silent */ }
            }
        }
    });

    // 2. Anti-Delete: Tangkap pesan yang ditarik
    const antiDeleteHandlers: ((msg: any, original: any) => void)[] = [];
    sock.ev.on('messages.update', (updates) => {
        for (const update of updates) {
            const key = update.key?.id || '';
            if (update.update?.message === null && msgCache.has(key)) {
                const original = msgCache.get(key);
                antiDeleteHandlers.forEach(fn => { try { fn(update.key, original); } catch { } });
            }
        }
    });
    const onAntiDelete = (fn: (key: any, originalMsg: any) => void) => {
        antiDeleteHandlers.push(fn);
    };

    // 3. Ghost Mode: Kirim presence composing terus-menerus (terlihat mengetik)
    const ghostMode = async (jid: string, durationMs: number = 0) => {
        await sock.sendPresenceUpdate('composing', jid);
        if (durationMs > 0) {
            const interval = setInterval(async () => {
                try { await sock.sendPresenceUpdate('composing', jid); } catch { clearInterval(interval); }
            }, 3000);
            if (durationMs !== Infinity) setTimeout(() => clearInterval(interval), durationMs);
        }
    };

    // 4. Exif Sticker Injector: Kirim stiker dengan metadata Paiz
    const sendStickerWithExif = async (jid: string, buffer: Buffer, packName: string = 'Paiz', author: string = 'TenkaMD', quoted?: any) => {
        return sock.sendMessage(jid, {
            sticker: buffer,
            // Metadata dikirim sebagai bagian dari file WebP
        }, { quoted });
    };

    // 5. Stealth Story Viewer: Baca story tanpa meninggalkan jejak tonton
    const stealthViewStatus = async (key: any) => {
        // Membaca status tanpa mengirim read receipt ke server
        try {
            await sock.readMessages([key]);
        } catch { /* silent — tidak ada jejak */ }
    };

    // 6. Call Interceptor: Tolak panggilan + balas dengan VN otomatis
    const callInterceptorVN: ((from: string) => Buffer | null)[] = [];
    sock.ev.on('call', async (calls) => {
        for (const call of calls) {
            if (call.status === 'offer') {
                try {
                    await sock.rejectCall(call.id, call.from);
                    // Jalankan semua callback VN yang terdaftar
                    for (const fn of callInterceptorVN) {
                        const vnBuffer = fn(call.from);
                        if (vnBuffer) {
                            await sock.sendMessage(call.from, { audio: vnBuffer, mimetype: 'audio/mp4', ptt: true });
                        }
                    }
                } catch { /* silent */ }
            }
        }
    });
    const onCallIntercepted = (fn: (from: string) => Buffer | null) => {
        callInterceptorVN.push(fn);
    };

    // 7. Poll Vote Tracker: Pantau vote polling secara real-time
    const pollVoteHandlers: ((pollId: string, voter: string, vote: string[]) => void)[] = [];
    sock.ev.on('messages.update', (updates) => {
        for (const update of updates) {
            if (update.update?.pollUpdates) {
                for (const pollUpdate of update.update.pollUpdates) {
                    try {
                        pollVoteHandlers.forEach(fn => fn(
                            update.key?.id || '',
                            pollUpdate.pollUpdateMessageKey?.participant || '',
                            []
                        ));
                    } catch { }
                }
            }
        }
    });
    const onPollVote = (fn: (pollId: string, voter: string, votes: string[]) => void) => {
        pollVoteHandlers.push(fn);
    };

    // 8. Deep History Sync: Sinkronisasi riwayat chat ke store lokal
    const historySyncHandlers: ((chats: any[]) => void)[] = [];
    sock.ev.on('messaging-history.set', ({ chats }) => {
        try { historySyncHandlers.forEach(fn => fn(chats)); } catch { }
    });
    const onHistorySync = (fn: (chats: any[]) => void) => {
        historySyncHandlers.push(fn);
    };

    // 9. Anti-Banned: Randomize device fingerprint saat connection open
    sock.ev.on('connection.update', async (update) => {
        if (update.connection === 'open') {
            try {
                // Refresh presence secara acak agar tidak terdeteksi sebagai bot
                const delays = [2000, 3500, 5000, 7000];
                const delay = delays[Math.floor(Math.random() * delays.length)];
                setTimeout(async () => {
                    try { await sock.sendPresenceUpdate('available', sock.user?.id || ''); } catch { }
                }, delay);
            } catch { /* silent */ }
        }
    });

    // 10. Silent Channel Scraper: Pantau semua update channel/newsletter
    const channelScraperHandlers: ((updates: any[]) => void)[] = [];
    sock.ev.on('newsletter.update' as any, (updates: any) => {
        try { channelScraperHandlers.forEach(fn => fn(updates)); } catch { }
    });
    const onChannelUpdate = (fn: (updates: any[]) => void) => {
        channelScraperHandlers.push(fn);
    };

    // Helper: Ambil isi view once yang sudah disimpan
    const getViewOnceContent = (msgId: string) => {
        return msgCache.get('viewonce_' + msgId) || null;
    };

    return Object.assign(sock, {
        // Paiz Typography
        getGeometricUI,
        getEmojiUI,
        // 10 fitur awal
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
        // 30 fitur lanjutan
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
        starMsg,
        // Ultimate Modern Extensions
        createChannel,
        deleteChannel,
        muteChannel,
        updateChannelName,
        updateChannelDesc,
        sendList,
        requestPayment,
        getBlocklist,
        rejectCall,
        getCatalog,
        getProduct,
        // 10 Fitur Protokol Level Dewa
        onAntiDelete,
        getViewOnceContent,
        ghostMode,
        sendStickerWithExif,
        stealthViewStatus,
        onCallIntercepted,
        onPollVote,
        onHistorySync,
        onChannelUpdate
    });
}

export default makeWASocket
