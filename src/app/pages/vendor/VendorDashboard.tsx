import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { QrCode, Store, Calendar, DollarSign, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router';

export const VendorDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  const upcomingMarkets = [
    {
      name: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
      date: language === 'ta' ? '12 மார்ச் 2026' : 'March 12, 2026',
      day: t('wednesday'),
      status: 'confirmed'
    },
    {
      name: language === 'ta' ? 'பெருந்துறை சந்தை' : 'Perundurai Sandhai',
      date: language === 'ta' ? '14 மார்ச் 2026' : 'March 14, 2026',
      day: t('friday'),
      status: 'pending'
    }
  ];

  const recentPayments = [
    {
      market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
      date: language === 'ta' ? '05 மார்ச் 2026' : 'March 05, 2026',
      amount: '₹50',
      status: 'paid'
    },
    {
      market: language === 'ta' ? 'பெருந்துறை சந்தை' : 'Perundurai Sandhai',
      date: language === 'ta' ? '28 பிப்ரவரி 2026' : 'Feb 28, 2026',
      amount: '₹50',
      status: 'paid'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'ta' ? 'வணக்கம், ராமு குமார்' : 'Welcome, Ramu Kumar'}
        </h1>
        <p className="text-green-100">
          {language === 'ta' 
            ? 'வியாபாரி அடையாள எண்: VND2026001234'
            : 'Vendor ID: VND2026001234'
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'வரவிருக்கும் சந்தைகள்' : 'Upcoming Markets'}
                </p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <Calendar className="h-10 w-10 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'இந்த மாதம் சந்தைகள்' : 'Markets This Month'}
                </p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <Store className="h-10 w-10 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'மொத்த செலவு' : 'Total Spent'}
                </p>
                <p className="text-3xl font-bold text-gray-900">₹400</p>
              </div>
              <DollarSign className="h-10 w-10 text-purple-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/vendor/qr-pass">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-700 p-3 rounded-lg">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('qrPass')}</h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ta' 
                      ? 'உங்கள் QR பாஸை பார்க்கவும்'
                      : 'View your QR pass'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/vendor/my-market">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-700 p-3 rounded-lg">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('myMarket')}</h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ta'
                      ? 'புதிய சந்தை முன்பதிவு செய்க'
                      : 'Book new market'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Upcoming Markets */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ta' ? 'வரவிருக்கும் சந்தைகள்' : 'Upcoming Markets'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingMarkets.map((market, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-semibold">{market.name}</h4>
                  <p className="text-sm text-gray-600">{market.date} • {market.day}</p>
                </div>
              </div>
              {market.status === 'confirmed' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-600" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ta' ? 'சமீபத்திய கட்டணங்கள்' : 'Recent Payments'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-semibold">{payment.market}</h4>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">{payment.amount}</p>
                  <p className="text-xs text-green-600">{t('paid')}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
