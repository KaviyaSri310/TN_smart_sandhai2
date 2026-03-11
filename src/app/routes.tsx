import { createBrowserRouter } from 'react-router';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { MarketsPage } from './pages/MarketsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';

// Vendor pages
import { VendorRegistration } from './pages/vendor/VendorRegistration';
import { VendorLogin } from './pages/vendor/VendorLogin';
import { ProfileSetup } from './pages/vendor/ProfileSetup';
import { MarketSelection } from './pages/vendor/MarketSelection';
import { StallTypeSelection } from './pages/vendor/StallTypeSelection';
import { Payment } from './pages/vendor/Payment';
import { QRPass } from './pages/vendor/QRPass';
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { VendorComplaints } from './pages/vendor/VendorComplaints';

// Inspector (Officer) pages
import { OfficerLogin } from './pages/officer/OfficerLogin';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { QRScanner } from './pages/officer/QRScanner';
import { OfficerComplaints } from './pages/officer/OfficerComplaints';
import { FeeCollection } from './pages/officer/FeeCollection';
import { Report } from './pages/officer/Report';

// Admin (Panchayat) pages
import { PanchayatLogin } from './pages/panchayat/PanchayatLogin';
import { PanchayatDashboard } from './pages/panchayat/PanchayatDashboard';
import { RevenueDashboard } from './pages/panchayat/RevenueDashboard';
import { ComplaintManagement } from './pages/panchayat/ComplaintManagement';
import { VendorManagement } from './pages/panchayat/VendorManagement';
import { PaymentHistory } from './pages/panchayat/PaymentHistory';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: (
      <DashboardLayout role="public">
        <HomePage />
      </DashboardLayout>
    ),
  },
  {
    path: '/markets',
    element: (
      <DashboardLayout role="public">
        <MarketsPage />
      </DashboardLayout>
    ),
  },
  {
    path: '/contact',
    element: (
      <DashboardLayout role="public">
        <ContactPage />
      </DashboardLayout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // Vendor routes - No layout
  {
    path: '/vendor/register',
    element: <VendorRegistration />,
  },
  {
    path: '/vendor/login',
    element: <VendorLogin />,
  },
  {
    path: '/vendor/profile-setup',
    element: <ProfileSetup />,
  },
  {
    path: '/vendor/market-selection',
    element: <MarketSelection />,
  },
  {
    path: '/vendor/stall-type-selection',
    element: <StallTypeSelection />,
  },
  {
    path: '/vendor/payment',
    element: <Payment />,
  },

  // Vendor routes - With layout
  {
    path: '/vendor/dashboard',
    element: (
      <DashboardLayout role="vendor">
        <VendorDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: '/vendor/my-market',
    element: (
      <DashboardLayout role="vendor">
        <MarketSelection />
      </DashboardLayout>
    ),
  },
  {
    path: '/vendor/qr-pass',
    element: (
      <DashboardLayout role="vendor">
        <QRPass />
      </DashboardLayout>
    ),
  },
  {
    path: '/vendor/complaints',
    element: (
      <DashboardLayout role="vendor">
        <VendorComplaints />
      </DashboardLayout>
    ),
  },
  {
    path: '/vendor/profile',
    element: (
      <DashboardLayout role="vendor">
        <ProfileSetup />
      </DashboardLayout>
    ),
  },

  // Inspector routes (mapped to officer paths for backward compatibility if needed, but updated for new structure)
  {
    path: '/inspector/login',
    element: <OfficerLogin />,
  },
  {
    path: '/officer/login',
    element: <OfficerLogin />,
  },

  // Inspector routes - With layout
  {
    path: '/inspector/dashboard',
    element: (
      <DashboardLayout role="officer">
        <OfficerDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: '/inspector/qr-scanner',
    element: (
      <DashboardLayout role="officer">
        <QRScanner />
      </DashboardLayout>
    ),
  },
  {
    path: '/inspector/complaints',
    element: (
      <DashboardLayout role="officer">
        <OfficerComplaints />
      </DashboardLayout>
    ),
  },
  {
    path: '/inspector/fee-collection',
    element: (
      <DashboardLayout role="officer">
        <FeeCollection />
      </DashboardLayout>
    ),
  },
  {
    path: '/inspector/report',
    element: (
      <DashboardLayout role="officer">
        <Report />
      </DashboardLayout>
    ),
  },

  // Admin routes (mapped to panchayat paths)
  {
    path: '/admin/login',
    element: <PanchayatLogin />,
  },
  {
    path: '/panchayat/login',
    element: <PanchayatLogin />,
  },

  // Admin routes - With layout
  {
    path: '/admin/dashboard',
    element: (
      <DashboardLayout role="panchayat">
        <PanchayatDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/markets',
    element: (
      <DashboardLayout role="panchayat">
        <MarketsPage />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/vendors',
    element: (
      <DashboardLayout role="panchayat">
        <VendorManagement />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/payments',
    element: (
      <DashboardLayout role="panchayat">
        <PaymentHistory />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/revenue',
    element: (
      <DashboardLayout role="panchayat">
        <RevenueDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: '/admin/complaints',
    element: (
      <DashboardLayout role="panchayat">
        <ComplaintManagement />
      </DashboardLayout>
    ),
  },

  // Keep old panchayat routes for backward compatibility
  {
    path: '/panchayat/dashboard',
    element: (
      <DashboardLayout role="panchayat">
        <PanchayatDashboard />
      </DashboardLayout>
    ),
  },
  {
    path: '/panchayat/vendors',
    element: (
      <DashboardLayout role="panchayat">
        <VendorManagement />
      </DashboardLayout>
    ),
  },
]);