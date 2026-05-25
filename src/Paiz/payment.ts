import crypto from 'crypto';

export interface PayDisiniResponse {
    success: boolean;
    msg: string;
    data?: any;
}

/**
 * ==============================================================
 * PAIZ PAYMENT GATEWAY API - KELAS DEWA
 * Menghubungkan Baileys langsung ke Payment Gateway resmi di Web
 * Mendukung QRIS, E-Wallet (OVO, DANA, GoPay, ShopeePay), dan VA
 * ==============================================================
 */

export class PayDisiniGateway {
    public apiKey: string;
    
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Buat Tagihan Pembayaran Baru
     * @param uniqueCode ID Transaksi unik (misal: INV-001)
     * @param service Kode layanan (misal: 11 untuk QRIS PayDisini)
     * @param amount Jumlah pembayaran (misal: 50000)
     * @param note Catatan pembayaran
     */
    public async createTransaction(uniqueCode: string, service: string, amount: number, note: string): Promise<PayDisiniResponse> {
        try {
            const signature = crypto.createHash('md5').update(this.apiKey + uniqueCode + service + amount + 'NewTransaction').digest('hex');
            
            const params = new URLSearchParams();
            params.append('key', this.apiKey);
            params.append('request', 'new');
            params.append('unique_code', uniqueCode);
            params.append('service', service);
            params.append('amount', amount.toString());
            params.append('note', note);
            params.append('valid_time', '1800'); // 30 menit
            params.append('type_fee', '1'); // 1 = Biaya ditanggung customer, 2 = merchant
            params.append('signature', signature);

            const response = await fetch('https://paydisini.co.id/api/', {
                method: 'POST',
                body: params
            });

            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }

    /**
     * Cek Status Transaksi (Pending/Sukses/Batal)
     */
    public async checkStatus(uniqueCode: string): Promise<PayDisiniResponse> {
        try {
            const signature = crypto.createHash('md5').update(this.apiKey + uniqueCode + 'StatusTransaction').digest('hex');
            const params = new URLSearchParams();
            params.append('key', this.apiKey);
            params.append('request', 'status');
            params.append('unique_code', uniqueCode);
            params.append('signature', signature);

            const response = await fetch('https://paydisini.co.id/api/', {
                method: 'POST',
                body: params
            });

            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
}

export class TripayGateway {
    public apiKey: string;
    public privateKey: string;
    public merchantCode: string;
    public isProduction: boolean;
    
    constructor(apiKey: string, privateKey: string, merchantCode: string, isProduction: boolean = false) {
        this.apiKey = apiKey;
        this.privateKey = privateKey;
        this.merchantCode = merchantCode;
        this.isProduction = isProduction;
    }

    public getBaseUrl() {
        return this.isProduction ? 'https://tripay.co.id/api' : 'https://tripay.co.id/api-sandbox';
    }

    /**
     * Buat Tagihan Pembayaran Baru (Tripay)
     * @param method Metode pembayaran (contoh: QRIS)
     * @param merchantRef ID Transaksi (INV-001)
     * @param amount Jumlah harga
     * @param customerData Data pelanggan (nama, email, phone)
     */
    public async createTransaction(method: string, merchantRef: string, amount: number, customerData: { name: string, email: string, phone: string }) {
        try {
            const signatureStr = this.merchantCode + merchantRef + amount;
            const signature = crypto.createHmac('sha256', this.privateKey).update(signatureStr).digest('hex');

            const payload = {
                method,
                merchant_ref: merchantRef,
                amount,
                customer_name: customerData.name,
                customer_email: customerData.email,
                customer_phone: customerData.phone,
                order_items: [{ sku: 'PRODUK1', name: 'Pembayaran Bot', price: amount, quantity: 1 }],
                signature
            };

            const response = await fetch(`${this.getBaseUrl()}/transaction/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            return await response.json();
        } catch (err) {
            return { success: false, message: String(err) };
        }
    }
    
    public async checkStatus(reference: string) {
        try {
            const response = await fetch(`${this.getBaseUrl()}/transaction/detail?reference=${reference}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return await response.json();
        } catch (err) {
            return { success: false, message: String(err) };
        }
    }
}

export class PaizPaymentGateway {
    public static PayDisini = PayDisiniGateway;
    public static Tripay = TripayGateway;
}
