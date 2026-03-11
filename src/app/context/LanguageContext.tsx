import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ta' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  appTitle: { ta: 'ஸ்மார்ட் சந்தை TN', en: 'Smart Sandhai TN' },
  search: { ta: 'தேடுக...', en: 'Search...' },
  
  // Navigation
  dashboard: { ta: 'முகப்பு', en: 'Dashboard' },
  markets: { ta: 'சந்தைகள்', en: 'Markets' },
  vendors: { ta: 'வியாபாரிகள்', en: 'Vendors' },
  qrScanner: { ta: 'QR ஸ்கேனர்', en: 'QR Scanner' },
  collections: { ta: 'வசூல்', en: 'Collections' },
  complaints: { ta: 'புகார்கள்', en: 'Complaints' },
  reports: { ta: 'அறிக்கைகள்', en: 'Reports' },
  profile: { ta: 'சுயவிவரம்', en: 'Profile' },
  
  // Home Page
  heroTitle: { ta: 'டிஜிட்டல் வாராந்திர சந்தை மேலாண்மை அமைப்பு', en: 'Digital Weekly Market Management System' },
  heroSubtitle: { ta: 'தமிழ்நாடு அரசின் நவீன சந்தை நிர்வாக தீர்வு', en: 'Tamil Nadu Government\'s Modern Market Administration Solution' },
  announcements: { ta: 'அறிவிப்புகள்', en: 'Announcements' },
  totalMarkets: { ta: 'மொத்த சந்தைகள்', en: 'Total Markets' },
  registeredVendors: { ta: 'பதிவு செய்யப்பட்ட வியாபாரிகள்', en: 'Registered Vendors' },
  marketsActiveToday: { ta: 'இன்று செயல்படும் சந்தைகள்', en: 'Markets Active Today' },
  totalRevenue: { ta: 'மொத்த வருவாய்', en: 'Total Revenue' },
  
  // Markets Page
  marketName: { ta: 'சந்தை பெயர்', en: 'Market Name' },
  district: { ta: 'மாவட்டம்', en: 'District' },
  marketDay: { ta: 'சந்தை நாள்', en: 'Market Day' },
  location: { ta: 'இடம்', en: 'Location' },
  
  // Days
  monday: { ta: 'திங்கள்', en: 'Monday' },
  tuesday: { ta: 'செவ்வாய்', en: 'Tuesday' },
  wednesday: { ta: 'புதன்', en: 'Wednesday' },
  thursday: { ta: 'வியாழன்', en: 'Thursday' },
  friday: { ta: 'வெள்ளி', en: 'Friday' },
  saturday: { ta: 'சனி', en: 'Saturday' },
  sunday: { ta: 'ஞாயிறு', en: 'Sunday' },
  
  // Contact Page
  contactUs: { ta: 'எங்களை தொடர்பு கொள்ளுங்கள்', en: 'Contact Us' },
  departmentContact: { ta: 'துறை தொடர்பு விவரங்கள்', en: 'Department Contact Details' },
  name: { ta: 'பெயர்', en: 'Name' },
  phone: { ta: 'தொலைபேசி', en: 'Phone' },
  message: { ta: 'செய்தி', en: 'Message' },
  submit: { ta: 'சமர்ப்பிக்கவும்', en: 'Submit' },
  
  // Login
  selectRole: { ta: 'உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்', en: 'Select Your Role' },
  vendor: { ta: 'வியாபாரி', en: 'Vendor' },
  fieldOfficer: { ta: 'கள அதிகாரி', en: 'Field Officer' },
  panchayatOfficer: { ta: 'பஞ்சாயத்து அதிகாரி', en: 'Panchayat Officer' },
  login: { ta: 'உள்நுழைய', en: 'Login' },
  register: { ta: 'பதிவு செய்ய', en: 'Register' },
  
  // Vendor Registration
  vendorRegistration: { ta: 'வியாபாரி பதிவு', en: 'Vendor Registration' },
  mobileNumber: { ta: 'மொபைல் எண்', en: 'Mobile Number' },
  aadhaarNumber: { ta: 'ஆதார் எண்', en: 'Aadhaar Number' },
  address: { ta: 'முகவரி', en: 'Address' },
  next: { ta: 'அடுத்து', en: 'Next' },
  
  // Profile Setup
  profileSetup: { ta: 'சுயவிவர அமைப்பு', en: 'Profile Setup' },
  vendorType: { ta: 'வியாபாரி வகை', en: 'Vendor Type' },
  farmer: { ta: 'விவசாயி', en: 'Farmer' },
  trader: { ta: 'வியாபாரி', en: 'Trader' },
  stallType: { ta: 'கடை வகை', en: 'Stall Type' },
  vegetables: { ta: 'காய்கறிகள்', en: 'Vegetables' },
  fruits: { ta: 'பழங்கள்', en: 'Fruits' },
  greens: { ta: 'கீரைகள்', en: 'Greens' },
  fish: { ta: 'மீன்', en: 'Fish' },
  meat: { ta: 'இறைச்சி', en: 'Meat' },
  poultry: { ta: 'கோழி', en: 'Poultry' },
  groceries: { ta: 'மளிகை', en: 'Groceries' },
  grains: { ta: 'தானியங்கள்', en: 'Grains' },
  flowers: { ta: 'பூக்கள்', en: 'Flowers' },
  pots: { ta: 'பானைகள்', en: 'Pots' },
  ironTools: { ta: 'இரும்பு கருவிகள்', en: 'Iron Tools' },
  clothes: { ta: 'துணிகள்', en: 'Clothes' },
  toys: { ta: 'பொம்மைகள்', en: 'Toys' },
  livestock: { ta: 'கால்நடைகள்', en: 'Livestock' },
  others: { ta: 'பிற', en: 'Others' },
  uploadPhoto: { ta: 'புகைப்படம் பதிவேற்றுக', en: 'Upload Photo' },
  
  // Market Selection
  marketSelection: { ta: 'சந்தை தேர்வு', en: 'Market Selection' },
  block: { ta: 'வட்டம் / ஒன்றியம்', en: 'Block / Panchayat Union' },
  townPanchayat: { ta: 'நகர் பஞ்சாயத்து / கிராம பஞ்சாயத்து', en: 'Town Panchayat / Village Panchayat' },
  marketDate: { ta: 'சந்தை தேதி', en: 'Market Date' },
  
  // Payment
  payment: { ta: 'கட்டணம்', en: 'Payment' },
  selectPaymentMethod: { ta: 'கட்டண முறையைத் தேர்ந்தெடுக்கவும்', en: 'Select Payment Method' },
  marketFee: { ta: 'சந்தை கட்டணம்', en: 'Market Fee' },
  payNow: { ta: 'இப்போது செலுத்துங்கள்', en: 'Pay Now' },
  
  // QR Pass
  qrPass: { ta: 'QR அனுமதி பத்திரம்', en: 'QR Pass' },
  vendorId: { ta: 'வியாபாரி அடையாள எண்', en: 'Vendor ID' },
  validUntil: { ta: 'செல்லுபடியாகும் வரை', en: 'Valid Until' },
  download: { ta: 'பதிவிறக்கம்', en: 'Download' },
  
  // Complaints
  submitComplaint: { ta: 'புகார் சமர்ப்பிக்கவும்', en: 'Submit Complaint' },
  complaintType: { ta: 'புகார் வகை', en: 'Complaint Type' },
  description: { ta: 'விளக்கம்', en: 'Description' },
  status: { ta: 'நிலை', en: 'Status' },
  pending: { ta: 'நிலுவையில்', en: 'Pending' },
  resolved: { ta: 'தீர்க்கப்பட்டது', en: 'Resolved' },
  inProgress: { ta: 'செயலில்', en: 'In Progress' },
  
  // Officer Dashboard
  vendorsVerified: { ta: 'சரிபார்க்கப்பட்ட வியாபாரிகள்', en: 'Vendors Verified' },
  feesCollected: { ta: 'வசூலிக்கப்பட்ட கட்டணம்', en: 'Fees Collected' },
  today: { ta: 'இன்று', en: 'Today' },
  
  // Verification
  vendorVerification: { ta: 'வியாபாரி சரிபார்ப்பு', en: 'Vendor Verification' },
  paymentStatus: { ta: 'கட்டண நிலை', en: 'Payment Status' },
  paid: { ta: 'செலுத்தப்பட்டது', en: 'Paid' },
  notPaid: { ta: 'செலுத்தப்படவில்லை', en: 'Not Paid' },
  verify: { ta: 'சரிபார்', en: 'Verify' },
  
  // Revenue Dashboard
  revenueToday: { ta: 'இன்றைய வருவாய்', en: 'Revenue Today' },
  totalVendors: { ta: 'மொத்த வியாபாரிகள்', en: 'Total Vendors' },
  revenueByStallType: { ta: 'கடை வகை வாரியாக வருவாய்', en: 'Revenue by Stall Type' },
  revenueByMarket: { ta: 'சந்தை வாரியாக வருவாய்', en: 'Revenue by Market' },
  
  // Common
  save: { ta: 'சேமிக்கவும்', en: 'Save' },
  cancel: { ta: 'ரத்து செய்', en: 'Cancel' },
  edit: { ta: 'திருத்து', en: 'Edit' },
  delete: { ta: 'நீக்கு', en: 'Delete' },
  view: { ta: 'பார்க்க', en: 'View' },
  back: { ta: 'பின்செல்', en: 'Back' },
  
  // My Market
  myMarket: { ta: 'எனது சந்தை', en: 'My Market' },
  
  // Market Management
  marketManagement: { ta: 'சந்தை மேலாண்மை', en: 'Market Management' },
  stallFeeConfiguration: { ta: 'கடை கட்டண அமைப்பு', en: 'Stall Fee Configuration' },
  vendorManagement: { ta: 'வியாபாரி மேலாண்மை', en: 'Vendor Management' },
  fieldStaffMonitoring: { ta: 'கள ஊழியர் கண்காணிப்பு', en: 'Field Staff Monitoring' },
  revenueDashboard: { ta: 'வருவாய் பலகை', en: 'Revenue Dashboard' },
  complaintManagement: { ta: 'புகார் மேலாண்மை', en: 'Complaint Management' },
  
  // Staff
  checkIn: { ta: 'வருகை பதிவு', en: 'Check-In' },
  spotFeeCollection: { ta: 'உடனடி கட்டண வசூல்', en: 'Spot Fee Collection' },
  marketEndReport: { ta: 'சந்தை முடிவு அறிக்கை', en: 'Market End Report' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ta'); // Default to Tamil

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ta' ? 'en' : 'ta');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
