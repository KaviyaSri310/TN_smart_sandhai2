import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Store, Users, TrendingUp, ShoppingBag, ArrowRight, Megaphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    {
      title: t('totalMarkets'),
      value: '247',
      icon: Store,
      color: 'bg-green-100 text-green-700',
      iconBg: 'bg-green-700'
    },
    {
      title: t('registeredVendors'),
      value: '15,432',
      icon: Users,
      color: 'bg-blue-100 text-blue-700',
      iconBg: 'bg-blue-700'
    },
    {
      title: t('marketsActiveToday'),
      value: '38',
      icon: ShoppingBag,
      color: 'bg-yellow-100 text-yellow-700',
      iconBg: 'bg-yellow-600'
    },
    {
      title: t('totalRevenue'),
      value: '₹45.2L',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-700',
      iconBg: 'bg-purple-700'
    },
  ];

  const announcements = language === 'ta' ? [
    {
      title: 'புதிய QR அடிப்படையிலான அனுமதி முறை',
      date: '05 மார்ச் 2026',
      content: 'அனைத்து வியாபாரிகளும் இப்போது QR குறியீட்டை பயன்படுத்தி சந்தையில் நுழைய வேண்டும்.'
    },
    {
      title: 'சந்தை கட்டண விகிதங்கள் மாற்றம்',
      date: '28 பிப்ரவரி 2026',
      content: 'புதிய கட்டண கட்டமைப்பு மார்ச் 15 முதல் அமலுக்கு வரும்.'
    },
    {
      title: 'டிஜிட்டல் பயிற்சி திட்டங்கள்',
      date: '20 பிப்ரவரி 2026',
      content: 'வியாபாரிகளுக்கான இலவச டிஜிட்டல் பயிற்சி வகுப்புகள் ஒவ்வொரு மாவட்டத்திலும் ஏற்பாடு செய்யப்பட்டுள்ளன.'
    }
  ] : [
    {
      title: 'New QR-Based Entry System',
      date: 'March 05, 2026',
      content: 'All vendors must now use QR codes for market entry verification.'
    },
    {
      title: 'Market Fee Structure Update',
      date: 'February 28, 2026',
      content: 'New fee structure will be implemented from March 15, 2026.'
    },
    {
      title: 'Digital Training Programs',
      date: 'February 20, 2026',
      content: 'Free digital training classes organized for vendors in each district.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-green-50 mb-6">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login">
              <Button className="bg-yellow-500 text-green-900 hover:bg-yellow-400">
                {t('vendor')} {t('login')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/markets">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                {t('markets')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.iconBg} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Announcements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-yellow-600" />
            {t('announcements')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.map((announcement, index) => (
            <div key={index} className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                <span className="text-xs text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-sm text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <Store className="h-10 w-10 text-green-700 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ta' ? 'சந்தைகளைக் கண்டறியுங்கள்' : 'Find Markets'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ta' 
                ? 'உங்கள் பகுதியில் உள்ள வாராந்திர சந்தைகளைக் கண்டறியுங்கள்'
                : 'Locate weekly markets in your area'
              }
            </p>
            <Link to="/markets">
              <Button variant="outline" size="sm" className="border-green-700 text-green-700">
                {t('view')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <Users className="h-10 w-10 text-blue-700 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ta' ? 'வியாபாரி பதிவு' : 'Vendor Registration'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ta'
                ? 'உங்களை வியாபாரியாக பதிவு செய்து சந்தையில் விற்க தொடங்குங்கள்'
                : 'Register as a vendor and start selling in markets'
              }
            </p>
            <Link to="/vendor/register">
              <Button variant="outline" size="sm" className="border-blue-700 text-blue-700">
                {t('register')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <Megaphone className="h-10 w-10 text-yellow-700 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ta' ? 'உதவி மற்றும் ஆதரவு' : 'Help & Support'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ta'
                ? 'உதவி பெறவும் அல்லது புகார் பதிவு செய்யவும்'
                : 'Get help or file a complaint'
              }
            </p>
            <Link to="/contact">
              <Button variant="outline" size="sm" className="border-yellow-700 text-yellow-700">
                {t('contactUs')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
