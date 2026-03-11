// Market Service - Handles market management and vendor bookings

import { db } from './database';
import { authService } from './authService';
import { Market, MarketBooking, APIResponse } from '../types';

export interface MarketBookingRequest {
  vendorId: string;
  marketId: string;
  marketName: string;
  marketDate: string;
  stallType: string;
}

export interface MarketCreationRequest {
  marketName: string;
  district: string;
  block: string;
  panchayat: string;
  marketDay: string;
  location: string;
  stallFee: number;
  capacity: number;
  amenities: string[];
  createdBy: string;
}

class MarketService {
  // Create market booking
  async createBooking(request: MarketBookingRequest): Promise<APIResponse<MarketBooking>> {
    try {
      const vendor = db.getVendorById(request.vendorId);
      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      const market = db.getMarketById(request.marketId);
      if (!market) {
        return { success: false, error: 'Market not found' };
      }

      // Check if vendor already has booking for this market and date
      const existingBookings = db.getBookingsByVendor(request.vendorId);
      const duplicate = existingBookings.find(
        b => b.marketId === request.marketId && 
             b.marketDate === request.marketDate &&
             b.status !== 'cancelled'
      );

      if (duplicate) {
        return { 
          success: false, 
          error: 'You already have a booking for this market on this date' 
        };
      }

      // Check market capacity
      const dateBookings = db.getBookingsByMarket(request.marketId, request.marketDate);
      const confirmedBookings = dateBookings.filter(b => b.status === 'confirmed');
      
      if (confirmedBookings.length >= market.capacity) {
        return { 
          success: false, 
          error: 'Market is fully booked for this date' 
        };
      }

      const bookingId = authService.generateBookingId();
      const now = new Date().toISOString().split('T')[0];

      const booking: MarketBooking = {
        bookingId,
        vendorId: request.vendorId,
        marketId: request.marketId,
        marketName: request.marketName,
        bookingDate: now,
        marketDate: request.marketDate,
        stallType: request.stallType,
        stallNumber: this.assignStallNumber(request.marketId, request.marketDate),
        paymentStatus: 'not_paid',
        status: 'pending'
      };

      db.createBooking(booking);

      return {
        success: true,
        data: booking,
        message: 'Booking created successfully. Please complete payment to confirm.'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create booking'
      };
    }
  }

  // Assign stall number
  private assignStallNumber(marketId: string, marketDate: string): string {
    const bookings = db.getBookingsByMarket(marketId, marketDate);
    const nextNumber = bookings.length + 1;
    return `S${String(nextNumber).padStart(3, '0')}`;
  }

  // Confirm booking after payment
  async confirmBooking(bookingId: string, paymentId: string): Promise<APIResponse<MarketBooking>> {
    const booking = db.updateBooking(bookingId, {
      paymentStatus: 'paid',
      paymentId,
      status: 'confirmed'
    });

    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    return {
      success: true,
      data: booking,
      message: 'Booking confirmed'
    };
  }

  // Get vendor bookings
  async getVendorBookings(vendorId: string): Promise<MarketBooking[]> {
    return db.getBookingsByVendor(vendorId);
  }

  // Get market bookings for a specific date
  async getMarketBookings(marketId: string, marketDate: string): Promise<MarketBooking[]> {
    return db.getBookingsByMarket(marketId, marketDate);
  }

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<APIResponse<MarketBooking>> {
    const booking = db.updateBooking(bookingId, { status: 'cancelled' });

    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    return {
      success: true,
      data: booking,
      message: 'Booking cancelled'
    };
  }

  // Create new market (Admin/Panchayat Officer)
  async createMarket(request: MarketCreationRequest): Promise<APIResponse<Market>> {
    try {
      const marketId = `MKT${Date.now().toString().slice(-6)}`;
      
      const market: Market = {
        marketId,
        marketName: request.marketName,
        district: request.district,
        block: request.block,
        panchayat: request.panchayat,
        marketDay: request.marketDay,
        location: { address: request.location },
        stallFee: request.stallFee,
        status: 'active',
        capacity: request.capacity,
        amenities: request.amenities,
        createdBy: request.createdBy,
        createdDate: new Date().toISOString().split('T')[0]
      };

      db.createMarket(market);

      return {
        success: true,
        data: market,
        message: 'Market created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create market'
      };
    }
  }

  // Get all markets
  async getAllMarkets(filters?: { district?: string; status?: string }): Promise<Market[]> {
    let markets = db.getAllMarkets();

    if (filters?.district) {
      markets = markets.filter(m => m.district === filters.district);
    }

    if (filters?.status) {
      markets = markets.filter(m => m.status === filters.status);
    }

    return markets;
  }

  // Get market by ID
  async getMarketById(marketId: string): Promise<Market | null> {
    return db.getMarketById(marketId);
  }

  // Update market
  async updateMarket(marketId: string, updates: Partial<Market>): Promise<APIResponse<Market>> {
    const market = db.updateMarket(marketId, updates);

    if (!market) {
      return { success: false, error: 'Market not found' };
    }

    return {
      success: true,
      data: market,
      message: 'Market updated successfully'
    };
  }

  // Update stall fee
  async updateStallFee(marketId: string, newFee: number): Promise<APIResponse<Market>> {
    return this.updateMarket(marketId, { stallFee: newFee });
  }

  // Get market statistics
  async getMarketStats(marketId: string): Promise<{
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    totalRevenue: number;
    occupancyRate: number;
  }> {
    const market = db.getMarketById(marketId);
    if (!market) {
      return {
        totalBookings: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        totalRevenue: 0,
        occupancyRate: 0
      };
    }

    // Get all bookings for this market
    const allBookings = db.getBookingsByVendor('').filter(b => b.marketId === marketId);
    const payments = db.getPaymentsByMarket(marketId);

    const confirmedBookings = allBookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = allBookings.filter(b => b.status === 'pending').length;
    const totalRevenue = payments
      .filter(p => p.status === 'success')
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      totalBookings: allBookings.length,
      confirmedBookings,
      pendingBookings,
      totalRevenue,
      occupancyRate: market.capacity > 0 ? (confirmedBookings / market.capacity) * 100 : 0
    };
  }

  // Get upcoming markets for vendor
  async getUpcomingMarketsForVendor(vendorId: string): Promise<MarketBooking[]> {
    const bookings = db.getBookingsByVendor(vendorId);
    const today = new Date().toISOString().split('T')[0];

    return bookings.filter(b => 
      b.marketDate >= today && 
      b.status === 'confirmed'
    ).sort((a, b) => a.marketDate.localeCompare(b.marketDate));
  }
}

export const marketService = new MarketService();
