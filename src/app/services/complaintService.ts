// Complaint Service - Handles complaint submission and management

import { db } from './database';
import { authService } from './authService';
import { Complaint, APIResponse } from '../types';

export interface ComplaintSubmission {
  vendorId: string;
  marketId: string;
  marketName: string;
  complaintType: string;
  description: string;
  photo?: File | string;
}

class ComplaintService {
  // Submit complaint
  async submitComplaint(submission: ComplaintSubmission): Promise<APIResponse<Complaint>> {
    try {
      const vendor = db.getVendorById(submission.vendorId);
      if (!vendor) {
        return { success: false, error: 'Vendor not found' };
      }

      const now = new Date();
      const complaintId = authService.generateComplaintId();

      // Handle photo upload
      let photoUrl: string | undefined;
      if (submission.photo) {
        photoUrl = await this.uploadPhoto(submission.photo);
      }

      const complaint: Complaint = {
        complaintId,
        vendorId: submission.vendorId,
        vendorName: vendor.name,
        marketId: submission.marketId,
        marketName: submission.marketName,
        complaintType: submission.complaintType,
        description: submission.description,
        photo: photoUrl,
        submittedDate: now.toISOString().split('T')[0],
        submittedTime: now.toTimeString().split(' ')[0],
        status: 'pending',
        priority: this.determinePriority(submission.complaintType)
      };

      db.createComplaint(complaint);

      // Auto-assign to officers
      await this.assignComplaintToOfficers(complaint);

      return {
        success: true,
        data: complaint,
        message: 'Complaint submitted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit complaint'
      };
    }
  }

  // Upload photo (simulated)
  private async uploadPhoto(photo: File | string): Promise<string> {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 500));

    if (typeof photo === 'string') {
      return photo;
    }

    // In production, upload to cloud storage (S3, Firebase, etc.)
    // For demo, convert to data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(photo);
    });
  }

  // Determine complaint priority
  private determinePriority(complaintType: string): 'low' | 'medium' | 'high' {
    const highPriorityTypes = ['harassment', 'officer_issue', 'payment_issue'];
    const mediumPriorityTypes = ['space_issue', 'fee_issue'];

    const type = complaintType.toLowerCase().replace(/\s+/g, '_');

    if (highPriorityTypes.some(t => type.includes(t))) {
      return 'high';
    }
    if (mediumPriorityTypes.some(t => type.includes(t))) {
      return 'medium';
    }
    return 'low';
  }

  // Auto-assign complaint to relevant officers
  private async assignComplaintToOfficers(complaint: Complaint): Promise<void> {
    const officers = db.getAllOfficers();
    const market = db.getMarketById(complaint.marketId);

    if (!market) return;

    // Find officers assigned to this market
    const relevantOfficers = officers.filter(officer => 
      officer.assignedMarkets.includes(market.marketId) &&
      officer.status === 'active'
    );

    if (relevantOfficers.length > 0) {
      // Assign to first available field officer
      const fieldOfficer = relevantOfficers.find(o => o.role === 'field_officer');
      if (fieldOfficer) {
        db.updateComplaint(complaint.complaintId, {
          assignedOfficer: fieldOfficer.officerId
        });
      }
    }

    // In production, send notifications to officers
    console.log(`📧 Complaint ${complaint.complaintId} assigned to officers for ${complaint.marketName}`);
  }

  // Get complaints for vendor
  async getVendorComplaints(vendorId: string): Promise<Complaint[]> {
    return db.getComplaintsByVendor(vendorId);
  }

  // Get all complaints (for officers)
  async getAllComplaints(filters?: {
    status?: string;
    marketId?: string;
    priority?: string;
  }): Promise<Complaint[]> {
    let complaints = db.getAllComplaints();

    if (filters?.status) {
      complaints = complaints.filter(c => c.status === filters.status);
    }

    if (filters?.marketId) {
      complaints = complaints.filter(c => c.marketId === filters.marketId);
    }

    if (filters?.priority) {
      complaints = complaints.filter(c => c.priority === filters.priority);
    }

    // Sort by date (newest first)
    return complaints.sort((a, b) => {
      const dateA = new Date(`${a.submittedDate} ${a.submittedTime}`);
      const dateB = new Date(`${b.submittedDate} ${b.submittedTime}`);
      return dateB.getTime() - dateA.getTime();
    });
  }

  // Update complaint status
  async updateComplaintStatus(
    complaintId: string, 
    status: 'pending' | 'viewed' | 'resolved',
    resolution?: string
  ): Promise<APIResponse<Complaint>> {
    try {
      const updates: Partial<Complaint> = { status };

      if (status === 'resolved') {
        updates.resolution = resolution;
        updates.resolvedDate = new Date().toISOString().split('T')[0];
      }

      const complaint = db.updateComplaint(complaintId, updates);

      if (!complaint) {
        return { success: false, error: 'Complaint not found' };
      }

      return {
        success: true,
        data: complaint,
        message: `Complaint ${status}`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update complaint'
      };
    }
  }

  // Get complaint statistics
  async getComplaintStats(marketId?: string): Promise<{
    total: number;
    pending: number;
    viewed: number;
    resolved: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    let complaints = db.getAllComplaints();

    if (marketId) {
      complaints = complaints.filter(c => c.marketId === marketId);
    }

    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    complaints.forEach(c => {
      byType[c.complaintType] = (byType[c.complaintType] || 0) + 1;
      byPriority[c.priority] = (byPriority[c.priority] || 0) + 1;
    });

    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === 'pending').length,
      viewed: complaints.filter(c => c.status === 'viewed').length,
      resolved: complaints.filter(c => c.status === 'resolved').length,
      byType,
      byPriority
    };
  }

  // Get complaint by ID
  async getComplaintById(complaintId: string): Promise<Complaint | null> {
    return db.getComplaintById(complaintId);
  }
}

export const complaintService = new ComplaintService();
