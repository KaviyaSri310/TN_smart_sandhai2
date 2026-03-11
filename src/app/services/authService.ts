// Authentication Service - Handles OTP, Login, Registration

import { db } from './database';
import { Vendor, Officer, AuthSession, APIResponse, OTPRequest, OTPVerification } from '../types';

class AuthService {
  private otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();
  
  // Generate random 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate unique Vendor ID
  generateVendorId(): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `VND${year}${randomNum}`;
  }

  // Generate unique IDs for other entities
  generateBookingId(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `BKG${timestamp}${random}`;
  }

  generatePaymentId(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(100 + Math.random() * 900);
    return `PAY${timestamp}${random}`;
  }

  generateReceiptNumber(): string {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `RCP${year}${timestamp}`;
  }

  generateComplaintId(): string {
    const timestamp = Date.now().toString().slice(-6);
    return `CMP${timestamp}`;
  }

  // Send OTP (Simulated - In production, this would call SMS API)
  async sendOTP(request: OTPRequest): Promise<APIResponse<{ phone: string }>> {
    try {
      const otp = this.generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      this.otpStore.set(request.phone, { otp, expiresAt });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In development, log the OTP to console
      console.log(`📱 OTP for ${request.phone}: ${otp}`);
      
      // In production, you would call SMS gateway API here
      // await smsGateway.send({ phone: request.phone, message: `Your OTP is ${otp}` });

      return {
        success: true,
        data: { phone: request.phone },
        message: 'OTP sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send OTP'
      };
    }
  }

  // Verify OTP and Register Vendor
  async verifyOTPAndRegister(verification: OTPVerification): Promise<APIResponse<{ vendor: Vendor; session: AuthSession }>> {
    try {
      const stored = this.otpStore.get(verification.phone);

      // Check if OTP exists and is valid
      if (!stored) {
        return { success: false, error: 'OTP not found. Please request a new OTP.' };
      }

      if (stored.expiresAt < Date.now()) {
        this.otpStore.delete(verification.phone);
        return { success: false, error: 'OTP expired. Please request a new OTP.' };
      }

      if (stored.otp !== verification.otp) {
        return { success: false, error: 'Invalid OTP. Please try again.' };
      }

      // OTP verified successfully
      this.otpStore.delete(verification.phone);

      // Check if vendor already exists
      let vendor = db.getVendorByPhone(verification.phone);

      if (!vendor && verification.vendorName) {
        // Create new vendor
        const vendorId = this.generateVendorId();
        vendor = db.createVendor({
          vendorId,
          name: verification.vendorName,
          phone: verification.phone,
          stallType: '',
          vendorType: 'farmer',
          district: '',
          registrationDate: new Date().toISOString().split('T')[0],
          status: 'active'
        });
      }

      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      // Create session
      const session: AuthSession = {
        userId: vendor.vendorId,
        role: 'vendor',
        name: vendor.name,
        phone: vendor.phone,
        token: this.generateSessionToken(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      };

      // Store session
      localStorage.setItem('auth_session', JSON.stringify(session));

      return {
        success: true,
        data: { vendor, session },
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Verification failed'
      };
    }
  }

  // Verify OTP and Login
  async verifyOTPAndLogin(verification: OTPVerification): Promise<APIResponse<{ vendor: Vendor; session: AuthSession }>> {
    try {
      const stored = this.otpStore.get(verification.phone);

      if (!stored || stored.expiresAt < Date.now()) {
        return { success: false, error: 'OTP expired or invalid' };
      }

      if (stored.otp !== verification.otp) {
        return { success: false, error: 'Invalid OTP' };
      }

      this.otpStore.delete(verification.phone);

      const vendor = db.getVendorByPhone(verification.phone);
      if (!vendor) {
        return { success: false, error: 'Vendor not found. Please register first.' };
      }

      const session: AuthSession = {
        userId: vendor.vendorId,
        role: 'vendor',
        name: vendor.name,
        phone: vendor.phone,
        token: this.generateSessionToken(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('auth_session', JSON.stringify(session));

      return {
        success: true,
        data: { vendor, session },
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed'
      };
    }
  }

  // Officer Login
  async officerLogin(phone: string, password: string): Promise<APIResponse<{ officer: Officer; session: AuthSession }>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const officer = db.getOfficerByPhone(phone);
      if (!officer) {
        return { success: false, error: 'Officer not found' };
      }

      // In production, verify password hash
      // For demo, accept any password

      const session: AuthSession = {
        userId: officer.officerId,
        role: officer.role === 'panchayat_officer' ? 'panchayat' : 'officer',
        name: officer.name,
        phone: officer.phone,
        token: this.generateSessionToken(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('auth_session', JSON.stringify(session));

      return {
        success: true,
        data: { officer, session },
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed'
      };
    }
  }

  // Get current session
  getCurrentSession(): AuthSession | null {
    try {
      const sessionData = localStorage.getItem('auth_session');
      if (!sessionData) return null;

      const session: AuthSession = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        this.logout();
        return null;
      }

      return session;
    } catch (error) {
      return null;
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem('auth_session');
  }

  // Generate session token
  private generateSessionToken(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  }
}

export const authService = new AuthService();
