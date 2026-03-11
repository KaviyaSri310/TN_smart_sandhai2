import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CheckCircle, DollarSign, Users, QrCode, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OfficerDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  const todayData = [
    { id: 'hour-1', time: '8 AM', vendors: 12 },
    { id: 'hour-2', time: '9 AM', vendors: 28 },
    { id: 'hour-3', time: '10 AM', vendors: 45 },
    { id: 'hour-4', time: '11 AM', vendors: 38 },
    { id: 'hour-5', time: '12 PM', vendors: 52 },
    { id: 'hour-6', time: '1 PM', vendors: 41 },
  ];

  const recentVerifications = [
    {
      vendorId: 'VND2026001234',
      name: language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar',
      stallType: t('vegetables'),
      time: language === 'ta' ? '11:45 காலை' : '11:45 AM',
      amount: '₹50'
    },
    {
      vendorId: 'VND2026001189',
      name: language === 'ta' ? 'லட்சுமி பாலாஜி' : 'Lakshmi Balaji',
      stallType: t('fruits'),
      time: language === 'ta' ? '11:30 காலை' : '11:30 AM',
      amount: '₹50'
    },
    {
      vendorId: 'VND2026001145',
      name: language === 'ta' ? 'முருகன் செல்வம்' : 'Murugan Selvam',
      stallType: t('fish'),
      time: language === 'ta' ? '11:15 காலை' : '11:15 AM',
      amount: '₹75'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'ta' ? 'வணக்கம், அதிகாரி கணேஷ்' : 'Welcome, Officer Ganesh'}
        </h1>
        <p className="text-blue-100">
          {language === 'ta'
            ? 'ஓலகடம் சந்தை • 09 மார்ச் 2026 • புதன்'
            : 'Olagadam Sandhai • March 09, 2026 • Wednesday'
          }
        </p>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('vendorsVerified')}</p>
                <p className="text-3xl font-bold text-gray-900">142</p>
                <p className="text-xs text-green-600 mt-1">
                  {language === 'ta' ? '+12 கடைசி மணி நேரத்தில்' : '+12 in last hour'}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('feesCollected')} {t('today')}</p>
                <p className="text-3xl font-bold text-gray-900">₹7,250</p>
                <p className="text-xs text-blue-600 mt-1">142 {t('vendors')}</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'மொத்த வியாபாரிகள்' : 'Total Vendors'}
                </p>
                <p className="text-3xl font-bold text-gray-900">245</p>
                <p className="text-xs text-gray-600 mt-1">
                  {language === 'ta' ? 'இந்த சந்தையில்' : 'in this market'}
                </p>
              </div>
              <Users className="h-10 w-10 text-purple-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'QR ஸ்கேன்கள்' : 'QR Scans'}
                </p>
                <p className="text-3xl font-bold text-gray-900">142</p>
                <p className="text-xs text-green-600 mt-1">100% {t('verified')}</p>
              </div>
              <QrCode className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {language === 'ta' ? 'இன்றைய வியாபாரி வருகை' : 'Today\'s Vendor Check-ins'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart key="officer-bar-chart" data={todayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="vendors" fill="#1d4ed8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Verifications */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ta' ? 'சமீபத்திய சரிபார்ப்புகள்' : 'Recent Verifications'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentVerifications.map((vendor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 p-2 rounded">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <p className="text-sm text-gray-600">
                      {vendor.vendorId} • {vendor.stallType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-700">{vendor.amount}</p>
                  <p className="text-xs text-gray-500">{vendor.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};