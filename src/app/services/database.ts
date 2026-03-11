// Mock Database Service using LocalStorage
// This simulates a backend database for development and demo purposes

import { 
  Vendor, 
  Market, 
  MarketBooking, 
  Payment, 
  Complaint, 
  Officer, 
  Receipt,
  RevenueReport 
} from '../types';

class DatabaseService {
  private getFromStorage<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return [];
    }
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }

  // Vendor Operations
  createVendor(vendor: Vendor): Vendor {
    const vendors = this.getFromStorage<Vendor>('vendors');
    vendors.push(vendor);
    this.saveToStorage('vendors', vendors);
    return vendor;
  }

  getVendorById(vendorId: string): Vendor | null {
    const vendors = this.getFromStorage<Vendor>('vendors');
    return vendors.find(v => v.vendorId === vendorId) || null;
  }

  getVendorByPhone(phone: string): Vendor | null {
    const vendors = this.getFromStorage<Vendor>('vendors');
    return vendors.find(v => v.phone === phone) || null;
  }

  updateVendor(vendorId: string, updates: Partial<Vendor>): Vendor | null {
    const vendors = this.getFromStorage<Vendor>('vendors');
    const index = vendors.findIndex(v => v.vendorId === vendorId);
    if (index === -1) return null;
    
    vendors[index] = { ...vendors[index], ...updates };
    this.saveToStorage('vendors', vendors);
    return vendors[index];
  }

  getAllVendors(): Vendor[] {
    return this.getFromStorage<Vendor>('vendors');
  }

  // Market Operations
  createMarket(market: Market): Market {
    const markets = this.getFromStorage<Market>('markets');
    markets.push(market);
    this.saveToStorage('markets', markets);
    return market;
  }

  getMarketById(marketId: string): Market | null {
    const markets = this.getFromStorage<Market>('markets');
    return markets.find(m => m.marketId === marketId) || null;
  }

  getAllMarkets(): Market[] {
    return this.getFromStorage<Market>('markets');
  }

  updateMarket(marketId: string, updates: Partial<Market>): Market | null {
    const markets = this.getFromStorage<Market>('markets');
    const index = markets.findIndex(m => m.marketId === marketId);
    if (index === -1) return null;
    
    markets[index] = { ...markets[index], ...updates };
    this.saveToStorage('markets', markets);
    return markets[index];
  }

  // Market Booking Operations
  createBooking(booking: MarketBooking): MarketBooking {
    const bookings = this.getFromStorage<MarketBooking>('bookings');
    bookings.push(booking);
    this.saveToStorage('bookings', bookings);
    return booking;
  }

  getBookingsByVendor(vendorId: string): MarketBooking[] {
    const bookings = this.getFromStorage<MarketBooking>('bookings');
    return bookings.filter(b => b.vendorId === vendorId);
  }

  getBookingsByMarket(marketId: string, marketDate: string): MarketBooking[] {
    const bookings = this.getFromStorage<MarketBooking>('bookings');
    return bookings.filter(b => b.marketId === marketId && b.marketDate === marketDate);
  }

  updateBooking(bookingId: string, updates: Partial<MarketBooking>): MarketBooking | null {
    const bookings = this.getFromStorage<MarketBooking>('bookings');
    const index = bookings.findIndex(b => b.bookingId === bookingId);
    if (index === -1) return null;
    
    bookings[index] = { ...bookings[index], ...updates };
    this.saveToStorage('bookings', bookings);
    return bookings[index];
  }

  // Payment Operations
  createPayment(payment: Payment): Payment {
    const payments = this.getFromStorage<Payment>('payments');
    payments.push(payment);
    this.saveToStorage('payments', payments);
    return payment;
  }

  getPaymentById(paymentId: string): Payment | null {
    const payments = this.getFromStorage<Payment>('payments');
    return payments.find(p => p.paymentId === paymentId) || null;
  }

  getPaymentsByVendor(vendorId: string): Payment[] {
    const payments = this.getFromStorage<Payment>('payments');
    return payments.filter(p => p.vendorId === vendorId);
  }

  getPaymentsByMarket(marketId: string): Payment[] {
    const payments = this.getFromStorage<Payment>('payments');
    return payments.filter(p => p.marketId === marketId);
  }

  getAllPayments(): Payment[] {
    return this.getFromStorage<Payment>('payments');
  }

  // Receipt Operations
  createReceipt(receipt: Receipt): Receipt {
    const receipts = this.getFromStorage<Receipt>('receipts');
    receipts.push(receipt);
    this.saveToStorage('receipts', receipts);
    return receipt;
  }

  getReceiptByNumber(receiptNumber: string): Receipt | null {
    const receipts = this.getFromStorage<Receipt>('receipts');
    return receipts.find(r => r.receiptNumber === receiptNumber) || null;
  }

  getReceiptsByVendor(vendorId: string): Receipt[] {
    const receipts = this.getFromStorage<Receipt>('receipts');
    return receipts.filter(r => r.vendorId === vendorId);
  }

  // Complaint Operations
  createComplaint(complaint: Complaint): Complaint {
    const complaints = this.getFromStorage<Complaint>('complaints');
    complaints.push(complaint);
    this.saveToStorage('complaints', complaints);
    return complaint;
  }

  getComplaintById(complaintId: string): Complaint | null {
    const complaints = this.getFromStorage<Complaint>('complaints');
    return complaints.find(c => c.complaintId === complaintId) || null;
  }

  getComplaintsByVendor(vendorId: string): Complaint[] {
    const complaints = this.getFromStorage<Complaint>('complaints');
    return complaints.filter(c => c.vendorId === vendorId);
  }

  getAllComplaints(): Complaint[] {
    return this.getFromStorage<Complaint>('complaints');
  }

  updateComplaint(complaintId: string, updates: Partial<Complaint>): Complaint | null {
    const complaints = this.getFromStorage<Complaint>('complaints');
    const index = complaints.findIndex(c => c.complaintId === complaintId);
    if (index === -1) return null;
    
    complaints[index] = { ...complaints[index], ...updates };
    this.saveToStorage('complaints', complaints);
    return complaints[index];
  }

  // Officer Operations
  createOfficer(officer: Officer): Officer {
    const officers = this.getFromStorage<Officer>('officers');
    officers.push(officer);
    this.saveToStorage('officers', officers);
    return officer;
  }

  getOfficerById(officerId: string): Officer | null {
    const officers = this.getFromStorage<Officer>('officers');
    return officers.find(o => o.officerId === officerId) || null;
  }

  getOfficerByPhone(phone: string): Officer | null {
    const officers = this.getFromStorage<Officer>('officers');
    return officers.find(o => o.phone === phone) || null;
  }

  getAllOfficers(): Officer[] {
    return this.getFromStorage<Officer>('officers');
  }

  // Revenue Report Operations
  createRevenueReport(report: RevenueReport): RevenueReport {
    const reports = this.getFromStorage<RevenueReport>('revenue_reports');
    reports.push(report);
    this.saveToStorage('revenue_reports', reports);
    return report;
  }

  getRevenueReportsByMarket(marketId: string): RevenueReport[] {
    const reports = this.getFromStorage<RevenueReport>('revenue_reports');
    return reports.filter(r => r.marketId === marketId);
  }

  getAllRevenueReports(): RevenueReport[] {
    return this.getFromStorage<RevenueReport>('revenue_reports');
  }

  // Initialize with sample data
  initializeSampleData(): void {
    // Check if data already exists
    if (this.getAllVendors().length > 0) return;

    // Sample Markets
    const sampleMarkets: Market[] = [
      {
        marketId: 'MKT001',
        marketName: 'Olagadam Sandhai',
        district: 'Erode',
        block: 'Perundurai Union',
        panchayat: 'Olagadam Panchayat',
        marketDay: 'Wednesday',
        location: { address: 'Olagadam, Erode District' },
        stallFee: 50,
        status: 'active',
        capacity: 200,
        amenities: ['Parking', 'Toilets', 'Drinking Water'],
        createdBy: 'ADMIN001',
        createdDate: '2026-01-01'
      },
      {
        marketId: 'MKT002',
        marketName: 'Perundurai Sandhai',
        district: 'Erode',
        block: 'Perundurai Union',
        panchayat: 'Perundurai Panchayat',
        marketDay: 'Friday',
        location: { address: 'Perundurai, Erode District' },
        stallFee: 60,
        status: 'active',
        capacity: 250,
        amenities: ['Parking', 'Toilets', 'Drinking Water', 'Shed'],
        createdBy: 'ADMIN001',
        createdDate: '2026-01-01'
      }
    ];

    sampleMarkets.forEach(market => this.createMarket(market));

    // Sample Officers
    const sampleOfficers: Officer[] = [
      {
        officerId: 'OFF001',
        name: 'Ganesh Kumar',
        phone: '9876543210',
        role: 'field_officer',
        assignedMarkets: ['MKT001', 'MKT002'],
        district: 'Erode',
        block: 'Perundurai Union',
        status: 'active',
        joinedDate: '2025-06-01'
      },
      {
        officerId: 'OFF002',
        name: 'Suresh Raj',
        phone: '9876543211',
        role: 'panchayat_officer',
        assignedMarkets: ['MKT001', 'MKT002'],
        district: 'Erode',
        panchayat: 'Olagadam Panchayat',
        status: 'active',
        joinedDate: '2025-05-15'
      }
    ];

    sampleOfficers.forEach(officer => this.createOfficer(officer));
  }

  // Clear all data (for testing)
  clearAllData(): void {
    localStorage.clear();
  }
}

export const db = new DatabaseService();
