# Smart Sandhai TN - Backend Architecture Documentation

## Overview
This document describes the complete backend architecture integrated into the Smart Sandhai TN application. The system uses a service-oriented architecture with mock backend services for development and demo purposes.

## Architecture Layers

### 1. Type Definitions (`/src/app/types/index.ts`)
Complete TypeScript type definitions for all entities:
- **Vendor**: User profile with ID, name, phone, stall type, status
- **Market**: Market details with location, fees, capacity
- **MarketBooking**: Vendor market participation records
- **Payment**: Payment transactions with methods (UPI, GPay, PhonePe, Debit Card, Cash)
- **Receipt**: Digital and printable receipts
- **Complaint**: Vendor complaints with photo support
- **Officer**: Field and Panchayat officer details
- **QRScanResult**: QR code scan data
- **AuthSession**: User authentication sessions

### 2. Database Service (`/src/app/services/database.ts`)
Mock database using LocalStorage with full CRUD operations:

**Features:**
- Persistent storage using browser LocalStorage
- Full CRUD operations for all entities
- Sample data initialization
- Relationship management between entities

**Operations Available:**
- Vendor management (create, read, update, delete)
- Market management
- Booking operations
- Payment records
- Receipt generation
- Complaint tracking
- Officer management
- Revenue reporting

### 3. Authentication Service (`/src/app/services/authService.ts`)

**Features:**
- OTP-based vendor registration
- OTP-based vendor login
- Officer login with credentials
- Session management
- Auto-generated Vendor IDs (format: VND2026XXXXXX)

**Functions:**
- `sendOTP()` - Sends 6-digit OTP (console logged for demo)
- `verifyOTPAndRegister()` - Verifies OTP and creates vendor account
- `verifyOTPAndLogin()` - Verifies OTP for existing vendors
- `officerLogin()` - Officer authentication
- `getCurrentSession()` - Retrieves active session
- `logout()` - Clears session
- `generateVendorId()` - Auto-generates unique vendor IDs

**Demo Credentials:**
- Any phone number works for vendors
- OTP is logged to browser console
- Sample officers: 9876543210, 9876543211

### 4. Payment Service (`/src/app/services/paymentService.ts`)

**Payment Methods Supported:**
- UPI
- Google Pay
- PhonePe
- Debit Card
- Cash (for spot collections)

**Features:**
- Prepaid payment processing
- Spot collection by field officers
- Digital receipt generation
- QR code for receipts
- Thermal printer simulation
- Transaction tracking
- Payment statistics

**Functions:**
- `processPayment()` - Process vendor prepayments
- `processSpotCollection()` - Record on-site payments by officers
- `generateReceipt()` - Create digital receipts
- `printReceipt()` - Simulate thermal printer
- `getVendorPayments()` - Payment history
- `getMarketPaymentStats()` - Revenue analytics

**Receipt Format:**
```
Receipt Number: RCP2026XXXXXX
Vendor ID: VND2026XXXXXX
Vendor Name: [Name]
Market: [Market Name]
Amount: ₹XX
Date: DD/MM/YYYY
Time: HH:MM:SS
Transaction ID: [Payment Method Prefix]XXXXX
QR Code: [Data URL]
```

### 5. QR Service (`/src/app/services/qrService.ts`)

**Features:**
- QR code generation for vendor market passes
- QR code scanning using device camera
- Payment status verification
- Booking validation

**Functions:**
- `generateVendorQR()` - Generate QR for vendor pass
- `scanQR()` - Decode and validate QR codes
- `startCameraScan()` - Initialize device camera
- `mockScan()` - Demo scan function
- `validateQR()` - Verify QR authenticity

**QR Data Structure:**
```json
{
  "vendorId": "VND2026XXXXXX",
  "vendorName": "Vendor Name",
  "bookingId": "BKGXXXXXX",
  "marketId": "MKTXXX",
  "marketDate": "YYYY-MM-DD"
}
```

**Scan Result:**
- Vendor Name
- Vendor ID
- Stall Type
- Payment Status (Paid/Not Paid)
- Market Name
- Market Date

### 6. Complaint Service (`/src/app/services/complaintService.ts`)

**Features:**
- Photo upload support
- Auto-complaint ID generation (format: CMPXXXXXX)
- Priority assignment (High/Medium/Low)
- Auto-assignment to officers
- Status tracking (Pending/Viewed/Resolved)

**Functions:**
- `submitComplaint()` - Submit with photo
- `getVendorComplaints()` - Vendor's complaint history
- `getAllComplaints()` - Officer view with filters
- `updateComplaintStatus()` - Mark viewed/resolved
- `getComplaintStats()` - Analytics

**Complaint Data Captured:**
- Vendor ID (auto)
- Vendor Name (auto)
- Market Name (auto)
- Date & Time (auto)
- Complaint Type (user selected)
- Description (user input)
- Photo (optional upload)

**Notifications Sent To:**
- Assigned Field Officer
- Panchayat Officer
- District Admin (high priority)

### 7. Market Service (`/src/app/services/marketService.ts`)

**Features:**
- Market creation and management
- Vendor booking system
- Capacity management
- Stall fee configuration
- Auto stall number assignment

**Functions:**
- `createBooking()` - Book vendor for market date
- `confirmBooking()` - Confirm after payment
- `createMarket()` - Admin creates new market
- `updateStallFee()` - Change market fees
- `getMarketStats()` - Occupancy and revenue
- `getUpcomingMarketsForVendor()` - Vendor schedule

**Booking Flow:**
1. Vendor selects market and date
2. System checks capacity
3. Auto-assigns stall number
4. Creates pending booking
5. Awaits payment
6. Confirms booking after payment
7. Generates QR pass

### 8. Authentication Context (`/src/app/context/AuthContext.tsx`)

**React Context for Global Auth State:**
- Session management
- Auto-load session on mount
- Login/Logout functions
- Role-based access

**Available Hooks:**
```typescript
const { session, isAuthenticated, login, logout, getCurrentUser } = useAuth();
```

## Data Flow Examples

### Vendor Registration Flow:
```
1. User enters name + mobile
2. sendOTP() → Generates OTP, stores in memory
3. OTP sent (console logged for demo)
4. User enters OTP
5. verifyOTPAndRegister() → Validates OTP
6. Auto-generates Vendor ID
7. Creates vendor record in database
8. Creates auth session
9. Logs in user
10. Redirects to dashboard
```

### Market Booking & Payment Flow:
```
1. Vendor browses markets
2. Selects market, date, stall type
3. createBooking() → Creates pending booking
4. Assigns stall number
5. Redirects to payment
6. Vendor selects payment method
7. processPayment() → Simulates gateway
8. Creates payment record
9. Generates receipt with QR
10. Updates booking status to 'confirmed'
11. Generates vendor QR pass
```

### QR Scanning Flow (Field Officer):
```
1. Officer opens QR scanner
2. startCameraScan() → Activates camera
3. Points at vendor's QR code
4. scanQR() → Decodes QR data
5. Fetches vendor details from database
6. Checks payment status
7. Displays vendor info:
   - Name, ID, Stall Type
   - Payment Status (Paid/Not Paid)
8. If not paid → Officer can collect spot fee
9. processSpotCollection() → Records payment
10. Generates receipt
```

### Complaint Submission Flow:
```
1. Vendor opens complaint form
2. Auto-captures:
   - Vendor ID from session
   - Current market
   - Date & time
3. User enters complaint type
4. User writes description
5. User uploads photo (optional)
6. submitComplaint() → Uploads photo
7. Auto-generates Complaint ID
8. Assigns priority based on type
9. Auto-assigns to relevant officers
10. Sends notifications (simulated)
11. Complaint stored in database
```

### Spot Fee Collection Flow:
```
1. Officer scans vendor QR
2. System shows "Not Paid" status
3. Officer clicks "Collect Fee"
4. Officer selects payment method (Cash/UPI)
5. Enters amount
6. processSpotCollection() → Records payment
7. Links to officer ID
8. Generates receipt
9. Updates vendor booking status
10. Option to print thermal receipt
```

## API Response Format

All services return standardized API responses:

```typescript
{
  success: boolean,
  data?: any,
  error?: string,
  message?: string
}
```

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error description"
}
```

## Storage & Persistence

**LocalStorage Keys:**
- `vendors` - All vendor records
- `markets` - Market listings
- `bookings` - Market bookings
- `payments` - Payment transactions
- `receipts` - Digital receipts
- `complaints` - Complaint records
- `officers` - Officer accounts
- `revenue_reports` - Revenue analytics
- `auth_session` - Active user session

**Sample Data Initialized:**
- 2 sample markets (Olagadam, Perundurai)
- 2 sample officers (Ganesh, Suresh)

## Security Features

1. **OTP Expiry**: 5 minutes
2. **Session Expiry**: 30 days
3. **Token-based auth**: Random generated tokens
4. **Role-based access**: Vendor/Officer/Panchayat/Admin

## Production Migration Path

To convert to real backend:

1. **Replace LocalStorage with API calls:**
   ```typescript
   // Current (Demo)
   db.getVendorById(id)
   
   // Production
   await fetch(`/api/vendors/${id}`)
   ```

2. **Integrate SMS Gateway:**
   ```typescript
   // Add Twilio/AWS SNS for OTP
   await smsGateway.send({ phone, otp })
   ```

3. **Add Payment Gateway:**
   ```typescript
   // Razorpay/Stripe/PayU integration
   await razorpay.createOrder({ amount, ... })
   ```

4. **Cloud Storage for Photos:**
   ```typescript
   // AWS S3/Firebase Storage
   await storage.upload(photo)
   ```

5. **Real Database:**
   - PostgreSQL/MySQL for relational data
   - MongoDB for flexible schemas
   - Redis for sessions/cache

6. **Backend API Framework:**
   - Node.js (Express/NestJS)
   - Python (Django/FastAPI)
   - Java (Spring Boot)

## Testing

**Demo Features:**
- OTP logged to console
- 90% payment success rate simulation
- Auto-generated mock data
- All APIs return instant responses

**To Test:**
1. Register with any 10-digit phone
2. Check console for OTP
3. Complete registration
4. Book a market
5. Make payment (will succeed 9/10 times)
6. Download QR pass
7. Submit complaint with photo
8. Login as officer to scan QR

## Future Enhancements

1. Real-time notifications (WebSocket/FCM)
2. Offline mode (Service Workers)
3. Analytics dashboard
4. Bulk operations for admins
5. Report generation (PDF/Excel)
6. Multi-language receipts
7. Biometric authentication
8. Geo-fencing for market check-in
9. Automated market reminders
10. Revenue forecasting

## Support & Maintenance

**Clear All Data:**
```javascript
db.clearAllData()
```

**Reinitialize:**
```javascript
db.initializeSampleData()
```

**Check Storage:**
```javascript
console.log(localStorage)
```

---

**Note**: This backend architecture is designed for seamless migration to a real backend. All UI components remain unchanged - only service implementations need to be swapped with actual API calls.
