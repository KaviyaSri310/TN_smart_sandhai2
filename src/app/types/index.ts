// Database Schema Type Definitions for Smart Sandhai TN

export interface Vendor {
  vendorId: string;
  name: string;
  phone: string;
  stallType: string;
  vendorType: 'farmer' | 'trader';
  profilePhoto?: string;
  district: string;
  registrationDate: string;
  status: 'active' | 'suspended' | 'pending';
  aadhaar?: string;
  address?: string;
}

export interface Market {
  marketId: string;
  marketName: string;
  district: string;
  block: string;
  panchayat: string;
  marketDay: string;
  location: {
    latitude?: number;
    longitude?: number;
    address: string;
  };
  stallFee: number;
  status: 'active' | 'inactive';
  capacity: number;
  amenities: string[];
  createdBy: string;
  createdDate: string;
}

export interface MarketBooking {
  bookingId: string;
  vendorId: string;
  marketId: string;
  marketName: string;
  bookingDate: string;
  marketDate: string;
  stallType: string;
  stallNumber?: string;
  paymentStatus: 'paid' | 'not_paid' | 'pending';
  paymentId?: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export interface Payment {
  paymentId: string;
  vendorId: string;
  vendorName: string;
  marketId: string;
  marketName: string;
  amount: number;
  paymentMethod: 'upi' | 'google_pay' | 'phonepe' | 'debit_card' | 'cash' | 'spot_collection';
  transactionId?: string;
  paymentDate: string;
  paymentTime: string;
  status: 'success' | 'pending' | 'failed';
  receiptNumber: string;
  collectedBy?: string; // Officer ID for spot collections
  collectionType: 'prepaid' | 'spot';
}

export interface Receipt {
  receiptNumber: string;
  paymentId: string;
  vendorId: string;
  vendorName: string;
  marketName: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  date: string;
  time: string;
  qrCode: string;
  status: string;
}

export interface Complaint {
  complaintId: string;
  vendorId: string;
  vendorName: string;
  marketId: string;
  marketName: string;
  complaintType: string;
  description: string;
  photo?: string;
  submittedDate: string;
  submittedTime: string;
  status: 'pending' | 'viewed' | 'resolved';
  assignedOfficer?: string;
  resolution?: string;
  resolvedDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Officer {
  officerId: string;
  name: string;
  phone: string;
  email?: string;
  role: 'field_officer' | 'panchayat_officer' | 'district_admin';
  assignedMarkets: string[];
  district: string;
  block?: string;
  panchayat?: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface QRScanResult {
  vendorId: string;
  vendorName: string;
  stallType: string;
  paymentStatus: 'paid' | 'not_paid';
  marketName: string;
  marketDate: string;
  bookingId?: string;
}

export interface RevenueReport {
  reportId: string;
  marketId: string;
  marketName: string;
  reportDate: string;
  totalVendors: number;
  totalRevenue: number;
  prepaidCollections: number;
  spotCollections: number;
  pendingPayments: number;
  collectionsByStallType: Record<string, number>;
  generatedBy: string;
  generatedDate: string;
}

export interface AuthSession {
  userId: string;
  role: 'vendor' | 'officer' | 'panchayat' | 'admin';
  name: string;
  phone: string;
  token: string;
  expiresAt: string;
}

export interface OTPRequest {
  phone: string;
  purpose: 'registration' | 'login';
}

export interface OTPVerification {
  phone: string;
  otp: string;
  vendorName?: string; // For registration
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
