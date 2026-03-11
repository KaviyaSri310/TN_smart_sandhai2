// QR Service - Handles QR code generation and scanning

import { db } from './database';
import { QRScanResult, APIResponse, Vendor, MarketBooking } from '../types';

export interface VendorQRData {
  vendorId: string;
  vendorName: string;
  bookingId?: string;
  marketId?: string;
  marketDate?: string;
}

class QRService {
  // Generate QR code for vendor's market pass
  async generateVendorQR(vendorId: string, bookingId?: string): Promise<string> {
    const vendor = db.getVendorById(vendorId);
    if (!vendor) throw new Error('Vendor not found');

    let booking: MarketBooking | null = null;
    if (bookingId) {
      const bookings = db.getBookingsByVendor(vendorId);
      booking = bookings.find(b => b.bookingId === bookingId) || null;
    }

    const qrData: VendorQRData = {
      vendorId: vendor.vendorId,
      vendorName: vendor.name,
      bookingId: booking?.bookingId,
      marketId: booking?.marketId,
      marketDate: booking?.marketDate
    };

    // In production, use a proper QR code generation library
    // For demo, encode as base64 JSON
    const qrString = JSON.stringify(qrData);
    return `data:text/plain;base64,${btoa(qrString)}`;
  }

  // Scan and decode QR code
  async scanQR(qrData: string): Promise<APIResponse<QRScanResult>> {
    try {
      // Decode QR data
      let vendorData: VendorQRData;
      
      if (qrData.startsWith('data:text/plain;base64,')) {
        const base64Data = qrData.replace('data:text/plain;base64,', '');
        const jsonString = atob(base64Data);
        vendorData = JSON.parse(jsonString);
      } else {
        // Try parsing as JSON directly
        vendorData = JSON.parse(qrData);
      }

      // Fetch vendor details
      const vendor = db.getVendorById(vendorData.vendorId);
      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      // Determine payment status
      let paymentStatus: 'paid' | 'not_paid' = 'not_paid';
      let marketName = 'Unknown Market';
      let marketDate = new Date().toISOString().split('T')[0];

      if (vendorData.bookingId) {
        const bookings = db.getBookingsByVendor(vendor.vendorId);
        const booking = bookings.find(b => b.bookingId === vendorData.bookingId);
        
        if (booking) {
          paymentStatus = booking.paymentStatus === 'paid' ? 'paid' : 'not_paid';
          marketName = booking.marketName;
          marketDate = booking.marketDate;
        }
      }

      const result: QRScanResult = {
        vendorId: vendor.vendorId,
        vendorName: vendor.name,
        stallType: vendor.stallType || 'Not specified',
        paymentStatus,
        marketName,
        marketDate,
        bookingId: vendorData.bookingId
      };

      return {
        success: true,
        data: result,
        message: 'QR scanned successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid QR code'
      };
    }
  }

  // Simulate camera QR scan
  async startCameraScan(): Promise<APIResponse<string>> {
    return new Promise((resolve) => {
      // Simulate camera initialization
      setTimeout(() => {
        // In production, this would open device camera
        // For demo, return a success message
        resolve({
          success: true,
          data: 'camera_ready',
          message: 'Camera ready. Point at QR code to scan.'
        });
      }, 500);
    });
  }

  // Mock scan for demo purposes
  async mockScan(vendorId: string): Promise<APIResponse<QRScanResult>> {
    try {
      const vendor = db.getVendorById(vendorId);
      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      const bookings = db.getBookingsByVendor(vendorId);
      const latestBooking = bookings[bookings.length - 1];

      const result: QRScanResult = {
        vendorId: vendor.vendorId,
        vendorName: vendor.name,
        stallType: vendor.stallType || 'Not specified',
        paymentStatus: latestBooking?.paymentStatus === 'paid' ? 'paid' : 'not_paid',
        marketName: latestBooking?.marketName || 'Unknown Market',
        marketDate: latestBooking?.marketDate || new Date().toISOString().split('T')[0],
        bookingId: latestBooking?.bookingId
      };

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: 'Scan failed'
      };
    }
  }

  // Generate downloadable QR code image
  async downloadQRCode(vendorId: string, bookingId?: string): Promise<Blob> {
    const qrData = await this.generateVendorQR(vendorId, bookingId);
    
    // In production, generate actual QR image using library like qrcode
    // For demo, create a simple text blob
    const blob = new Blob([qrData], { type: 'text/plain' });
    return blob;
  }

  // Validate QR code
  async validateQR(qrData: string, marketId: string, marketDate: string): Promise<APIResponse<{ valid: boolean; reason?: string }>> {
    const scanResult = await this.scanQR(qrData);
    
    if (!scanResult.success || !scanResult.data) {
      return {
        success: true,
        data: { valid: false, reason: 'Invalid QR code' }
      };
    }

    const result = scanResult.data;

    // Check if vendor has booking for this market and date
    const bookings = db.getBookingsByVendor(result.vendorId);
    const validBooking = bookings.find(
      b => b.marketId === marketId && 
           b.marketDate === marketDate && 
           b.status === 'confirmed'
    );

    if (!validBooking) {
      return {
        success: true,
        data: { valid: false, reason: 'No valid booking for this market' }
      };
    }

    if (result.paymentStatus === 'not_paid') {
      return {
        success: true,
        data: { valid: false, reason: 'Payment not completed' }
      };
    }

    return {
      success: true,
      data: { valid: true }
    };
  }
}

export const qrService = new QRService();
