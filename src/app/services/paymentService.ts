// Payment Service - Handles payment processing and receipt generation

import { db } from './database';
import { authService } from './authService';
import { Payment, Receipt, APIResponse, MarketBooking } from '../types';

export interface PaymentRequest {
  vendorId: string;
  marketId: string;
  marketName: string;
  amount: number;
  paymentMethod: 'upi' | 'google_pay' | 'phonepe' | 'debit_card' | 'cash';
  bookingId?: string;
}

export interface SpotCollectionRequest {
  vendorId: string;
  marketId: string;
  marketName: string;
  amount: number;
  paymentMethod: 'cash' | 'upi';
  collectedBy: string; // Officer ID
}

class PaymentService {
  // Process prepaid payment
  async processPayment(request: PaymentRequest): Promise<APIResponse<{ payment: Payment; receipt: Receipt }>> {
    try {
      // Simulate payment gateway API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const vendor = db.getVendorById(request.vendorId);
      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      // Simulate payment success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;

      if (!isSuccess) {
        return { 
          success: false, 
          error: 'Payment failed. Please try again.' 
        };
      }

      const now = new Date();
      const paymentId = authService.generatePaymentId();
      const receiptNumber = authService.generateReceiptNumber();

      // Create payment record
      const payment: Payment = {
        paymentId,
        vendorId: request.vendorId,
        vendorName: vendor.name,
        marketId: request.marketId,
        marketName: request.marketName,
        amount: request.amount,
        paymentMethod: request.paymentMethod,
        transactionId: this.generateTransactionId(request.paymentMethod),
        paymentDate: now.toISOString().split('T')[0],
        paymentTime: now.toTimeString().split(' ')[0],
        status: 'success',
        receiptNumber,
        collectionType: 'prepaid'
      };

      db.createPayment(payment);

      // Update booking payment status if bookingId provided
      if (request.bookingId) {
        db.updateBooking(request.bookingId, { 
          paymentStatus: 'paid',
          paymentId 
        });
      }

      // Generate receipt
      const receipt = await this.generateReceipt(payment);

      return {
        success: true,
        data: { payment, receipt },
        message: 'Payment successful'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
  }

  // Process spot collection by field officer
  async processSpotCollection(request: SpotCollectionRequest): Promise<APIResponse<{ payment: Payment; receipt: Receipt }>> {
    try {
      const vendor = db.getVendorById(request.vendorId);
      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      const now = new Date();
      const paymentId = authService.generatePaymentId();
      const receiptNumber = authService.generateReceiptNumber();

      const payment: Payment = {
        paymentId,
        vendorId: request.vendorId,
        vendorName: vendor.name,
        marketId: request.marketId,
        marketName: request.marketName,
        amount: request.amount,
        paymentMethod: request.paymentMethod === 'upi' ? 'upi' : 'cash',
        transactionId: request.paymentMethod === 'upi' ? this.generateTransactionId('upi') : undefined,
        paymentDate: now.toISOString().split('T')[0],
        paymentTime: now.toTimeString().split(' ')[0],
        status: 'success',
        receiptNumber,
        collectedBy: request.collectedBy,
        collectionType: 'spot'
      };

      db.createPayment(payment);

      // Generate receipt
      const receipt = await this.generateReceipt(payment);

      return {
        success: true,
        data: { payment, receipt },
        message: 'Spot collection recorded successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Spot collection failed'
      };
    }
  }

  // Generate digital receipt
  async generateReceipt(payment: Payment): Promise<Receipt> {
    const qrCode = await this.generateQRCode({
      receiptNumber: payment.receiptNumber,
      vendorId: payment.vendorId,
      amount: payment.amount,
      date: payment.paymentDate
    });

    const receipt: Receipt = {
      receiptNumber: payment.receiptNumber,
      paymentId: payment.paymentId,
      vendorId: payment.vendorId,
      vendorName: payment.vendorName,
      marketName: payment.marketName,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      transactionId: payment.transactionId,
      date: payment.paymentDate,
      time: payment.paymentTime,
      qrCode,
      status: payment.status
    };

    db.createReceipt(receipt);
    return receipt;
  }

  // Generate QR code for receipt
  private async generateQRCode(data: any): Promise<string> {
    // In production, use a QR code library
    // For demo, return a data URL representing the QR code content
    const qrData = JSON.stringify(data);
    return `data:text/plain;base64,${btoa(qrData)}`;
  }

  // Generate transaction ID based on payment method
  private generateTransactionId(method: string): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(100000 + Math.random() * 900000);
    
    switch (method) {
      case 'upi':
        return `UPI${timestamp.slice(-8)}${random}`;
      case 'google_pay':
        return `GPAY${timestamp.slice(-8)}${random}`;
      case 'phonepe':
        return `PPE${timestamp.slice(-8)}${random}`;
      case 'debit_card':
        return `DC${timestamp.slice(-8)}${random}`;
      default:
        return `TXN${timestamp.slice(-8)}${random}`;
    }
  }

  // Get payment history for vendor
  async getVendorPayments(vendorId: string): Promise<Payment[]> {
    return db.getPaymentsByVendor(vendorId);
  }

  // Get receipts for vendor
  async getVendorReceipts(vendorId: string): Promise<Receipt[]> {
    return db.getReceiptsByVendor(vendorId);
  }

  // Verify payment status
  async verifyPaymentStatus(paymentId: string): Promise<APIResponse<Payment>> {
    const payment = db.getPaymentById(paymentId);
    
    if (!payment) {
      return { success: false, error: 'Payment not found' };
    }

    return {
      success: true,
      data: payment
    };
  }

  // Get payment statistics for market
  async getMarketPaymentStats(marketId: string): Promise<{
    totalRevenue: number;
    prepaidRevenue: number;
    spotRevenue: number;
    totalTransactions: number;
    pendingPayments: number;
  }> {
    const payments = db.getPaymentsByMarket(marketId);
    const successfulPayments = payments.filter(p => p.status === 'success');

    const prepaidPayments = successfulPayments.filter(p => p.collectionType === 'prepaid');
    const spotPayments = successfulPayments.filter(p => p.collectionType === 'spot');

    return {
      totalRevenue: successfulPayments.reduce((sum, p) => sum + p.amount, 0),
      prepaidRevenue: prepaidPayments.reduce((sum, p) => sum + p.amount, 0),
      spotRevenue: spotPayments.reduce((sum, p) => sum + p.amount, 0),
      totalTransactions: successfulPayments.length,
      pendingPayments: payments.filter(p => p.status === 'pending').length
    };
  }

  // Print receipt (thermal printer simulation)
  async printReceipt(receiptNumber: string): Promise<APIResponse<{ printed: boolean }>> {
    try {
      const receipt = db.getReceiptByNumber(receiptNumber);
      
      if (!receipt) {
        return { success: false, error: 'Receipt not found' };
      }

      // Simulate thermal printer
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('🖨️ Printing Receipt:');
      console.log('='.repeat(40));
      console.log('Smart Sandhai TN');
      console.log('Receipt No:', receipt.receiptNumber);
      console.log('Vendor:', receipt.vendorName);
      console.log('Market:', receipt.marketName);
      console.log('Amount: ₹', receipt.amount);
      console.log('Date:', receipt.date);
      console.log('Time:', receipt.time);
      console.log('Method:', receipt.paymentMethod);
      if (receipt.transactionId) {
        console.log('Transaction ID:', receipt.transactionId);
      }
      console.log('='.repeat(40));

      return {
        success: true,
        data: { printed: true },
        message: 'Receipt printed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Printing failed'
      };
    }
  }
}

export const paymentService = new PaymentService();
