import crypto from 'crypto';

export interface PaymentResponse {
    success: boolean;
    msg: string;
    data?: any;
}

/**
 * ==============================================================
 * PAIZ MEGA PAYMENT GATEWAY API - KELAS DEWA (ULTIMATE EDITION)
 * 100% Terlengkap sampai ke akar-akarnya. Support semua raksasa:
 * 1. PayDisini
 * 2. Tripay
 * 3. Pakkasir
 * 4. Tokopay
 * 5. Midtrans
 * 6. Xendit
 * ==============================================================
 */

export class PayDisiniGateway {
    public apiKey: string;
    
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async createTransaction(uniqueCode: string, service: string, amount: number, note: string): Promise<PaymentResponse> {
        try {
            const signature = crypto.createHash('md5').update(this.apiKey + uniqueCode + service + amount + 'NewTransaction').digest('hex');
            
            const params = new URLSearchParams();
            params.append('key', this.apiKey);
            params.append('request', 'new');
            params.append('unique_code', uniqueCode);
            params.append('service', service);
            params.append('amount', amount.toString());
            params.append('note', note);
            params.append('valid_time', '1800');
            params.append('type_fee', '1');
            params.append('signature', signature);

            const response = await fetch('https://paydisini.co.id/api/', { method: 'POST', body: params });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }

    public async checkStatus(uniqueCode: string): Promise<PaymentResponse> {
        try {
            const signature = crypto.createHash('md5').update(this.apiKey + uniqueCode + 'StatusTransaction').digest('hex');
            const params = new URLSearchParams();
            params.append('key', this.apiKey);
            params.append('request', 'status');
            params.append('unique_code', uniqueCode);
            params.append('signature', signature);

            const response = await fetch('https://paydisini.co.id/api/', { method: 'POST', body: params });
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

    public async createTransaction(method: string, merchantRef: string, amount: number, customerData: { name: string, email: string, phone: string }): Promise<PaymentResponse> {
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
                headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
    
    public async checkStatus(reference: string): Promise<PaymentResponse> {
        try {
            const response = await fetch(`${this.getBaseUrl()}/transaction/detail?reference=${reference}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
}

export class PakkasirGateway {
    public apiKey: string;
    
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async createQRIS(amount: number, orderId: string): Promise<PaymentResponse> {
        try {
            const response = await fetch('https://pakkasir.com/api/v1/qris/create', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, order_id: orderId })
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }

    public async checkStatus(orderId: string): Promise<PaymentResponse> {
        try {
            const response = await fetch(`https://pakkasir.com/api/v1/qris/status?order_id=${orderId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
}

export class TokoPayGateway {
    public merchantId: string;
    public secretKey: string;

    constructor(merchantId: string, secretKey: string) {
        this.merchantId = merchantId;
        this.secretKey = secretKey;
    }

    public async createTransaction(orderId: string, amount: number, method: string = 'QRIS'): Promise<PaymentResponse> {
        try {
            const signature = crypto.createHash('md5').update(this.merchantId + this.secretKey + orderId + amount).digest('hex');
            
            const payload = {
                merchant_id: this.merchantId,
                order_id: orderId,
                amount: amount,
                method: method,
                signature: signature
            };

            const response = await fetch('https://api.tokopay.id/v1/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }

    public async checkStatus(orderId: string): Promise<PaymentResponse> {
        try {
            const signature = crypto.createHash('md5').update(this.merchantId + this.secretKey + orderId).digest('hex');
            const response = await fetch(`https://api.tokopay.id/v1/order/status?merchant_id=${this.merchantId}&order_id=${orderId}&signature=${signature}`, {
                method: 'GET'
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
}

export class MidtransGateway {
    public serverKey: string;
    public isProduction: boolean;

    constructor(serverKey: string, isProduction: boolean = false) {
        this.serverKey = serverKey;
        this.isProduction = isProduction;
    }

    private getBaseUrl() {
        return this.isProduction ? 'https://app.midtrans.com/snap/v1/transactions' : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    }

    public async createTransaction(orderId: string, amount: number): Promise<PaymentResponse> {
        try {
            const authStr = Buffer.from(this.serverKey + ':').toString('base64');
            const payload = {
                transaction_details: { order_id: orderId, gross_amount: amount },
                credit_card: { secure: true }
            };

            const response = await fetch(this.getBaseUrl(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authStr}`
                },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
}

export class XenditGateway {
    public secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public async createInvoice(externalId: string, amount: number, payerEmail: string, description: string): Promise<PaymentResponse> {
        try {
            const authStr = Buffer.from(this.secretKey + ':').toString('base64');
            const payload = {
                external_id: externalId,
                amount: amount,
                payer_email: payerEmail,
                description: description
            };

            const response = await fetch('https://api.xendit.co/v2/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authStr}`
                },
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (err) {
            return { success: false, msg: String(err) };
        }
    }
}

export class PaizPaymentGateway {
    public static PayDisini = PayDisiniGateway;
    public static Tripay = TripayGateway;
    public static Pakkasir = PakkasirGateway;
    public static TokoPay = TokoPayGateway;
    public static Midtrans = MidtransGateway;
    public static Xendit = XenditGateway;
}
