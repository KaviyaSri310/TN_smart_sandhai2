import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  QrCode, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  User,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  CreditCard
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Switch } from '../ui/switch';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'vendor' | 'officer' | 'panchayat' | 'public';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role = 'public' }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    if (role === 'vendor') {
      return [
        { path: '/vendor/dashboard', icon: LayoutDashboard, label: t('dashboard') },
        { path: '/vendor/my-market', icon: Store, label: t('myMarket') },
        { path: '/vendor/qr-pass', icon: QrCode, label: t('qrPass') },
        { path: '/vendor/complaints', icon: MessageSquare, label: t('complaints') },
        { path: '/vendor/profile', icon: User, label: t('profile') },
      ];
    } else if (role === 'officer') {
      // Inspector Role
      return [
        { path: '/inspector/dashboard', icon: LayoutDashboard, label: t('dashboard') },
        { path: '/inspector/qr-scanner', icon: QrCode, label: t('qrScanner') },
        { path: '/inspector/fee-collection', icon: DollarSign, label: language === 'ta' ? 'கட்டண வசூல்' : 'Fee Collection' },
        { path: '/inspector/report', icon: FileText, label: language === 'ta' ? 'அறிக்கை' : 'Report' },
        { path: '/inspector/complaints', icon: MessageSquare, label: t('complaints') },
      ];
    } else if (role === 'panchayat') {
      // Admin Role
      return [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: t('dashboard') },
        { path: '/admin/markets', icon: Store, label: t('marketManagement') },
        { path: '/admin/vendors', icon: Users, label: t('vendorManagement') },
        { path: '/admin/payments', icon: CreditCard, label: language === 'ta' ? 'கட்டணங்கள்' : 'Payment History' },
        { path: '/admin/revenue', icon: DollarSign, label: t('revenueDashboard') },
        { path: '/admin/complaints', icon: MessageSquare, label: t('complaints') },
      ];
    } else {
      return [
        { path: '/', icon: LayoutDashboard, label: t('dashboard') },
        { path: '/markets', icon: Store, label: t('markets') },
        { path: '/contact', icon: MessageSquare, label: t('contactUs') },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-green-800 to-green-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-green-900 font-bold text-lg">TN</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold">{t('appTitle')}</h1>
                <p className="text-xs text-green-100 hidden md:block">
                  {language === 'ta' ? 'வாராந்திர சந்தை மேலாண்மை' : 'Weekly Market Management'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('search')}
                  className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <span className="text-xs md:text-sm">{language === 'ta' ? 'த' : 'EN'}</span>
              <Switch
                checked={language === 'en'}
                onCheckedChange={toggleLanguage}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 hover:bg-green-700 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-green-700 rounded-lg px-3 py-2 transition-colors">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-green-900" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  {t('profile')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/login" className="flex items-center w-full">
                    {t('login')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[64px] left-0 h-[calc(100vh-64px)] z-40
            bg-white shadow-lg transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-64 overflow-y-auto
          `}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)] w-full">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};