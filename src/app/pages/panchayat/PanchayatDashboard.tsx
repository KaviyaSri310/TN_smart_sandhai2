import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Store, Users, DollarSign, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const PanchayatDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  const revenueData = [
    { id: 'month-1', month: language === 'ta' ? 'ஜன' : 'Jan', revenue: 45000 },
    { id: 'month-2', month: language === 'ta' ? 'பிப்' : 'Feb', revenue: 52000 },
    { id: 'month-3', month: language === 'ta' ? 'மார்' : 'Mar', revenue: 48000 },
    { id: 'month-4', month: language === 'ta' ? 'ஏப்' : 'Apr', revenue: 61000 },
    { id: 'month-5', month: language === 'ta' ? 'மே' : 'May', revenue: 55000 },
    { id: 'month-6', month: language === 'ta' ? 'ஜூன்' : 'Jun', revenue: 67000 },
  ];

  const marketData = [
    { id: 'market-1', name: language === 'ta' ? 'ஓலகடம்' : 'Olagadam', vendors: 245, revenue: 12250 },
    { id: 'market-2', name: language === 'ta' ? 'பெருந்துறை' : 'Perundurai', vendors: 312, revenue: 15600 },
    { id: 'market-3', name: language === 'ta' ? 'சூளூர்' : 'Sulur', vendors: 428, revenue: 21400 },
    { id: 'market-4', name: language === 'ta' ? 'பொள்ளாச்சி' : 'Pollachi', vendors: 356, revenue: 17800 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'ta' ? 'வணக்கம், பஞ்சாயத்து அதிகாரி சுந்தரம்' : 'Welcome, Panchayat Officer Sundaram'}
        </h1>
        <p className="text-purple-100">
          {language === 'ta'
            ? 'ஈரோடு மாவட்டம் • பெருந்துறை ஒன்றியம்'
            : 'Erode District • Perundurai Union'
          }
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalMarkets')}</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600 mt-1">
                  {language === 'ta' ? '4 இன்று செயலில்' : '4 active today'}
                </p>
              </div>
              <Store className="h-10 w-10 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalVendors')}</p>
                <p className="text-3xl font-bold text-gray-900">1,341</p>
                <p className="text-xs text-blue-600 mt-1">
                  +45 {language === 'ta' ? 'இந்த மாதம்' : 'this month'}
                </p>
              </div>
              <Users className="h-10 w-10 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('revenueToday')}</p>
                <p className="text-3xl font-bold text-gray-900">₹28.5K</p>
                <p className="text-xs text-purple-600 mt-1">
                  {language === 'ta' ? '4 சந்தைகளிலிருந்து' : 'from 4 markets'}
                </p>
              </div>
              <DollarSign className="h-10 w-10 text-purple-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'இந்த மாத வருவாய்' : 'Monthly Revenue'}
                </p>
                <p className="text-3xl font-bold text-gray-900">₹4.8L</p>
                <p className="text-xs text-green-600 mt-1">
                  +12% {language === 'ta' ? 'வளர்ச்சி' : 'growth'}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'வருவாய் போக்கு' : 'Revenue Trend'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart key="panchayat-line-chart" data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Market Performance */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'சந்தை செயல்திறன்' : 'Market Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart key="panchayat-bar-chart" data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendors" fill="#3b82f6" name={t('vendors')} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Markets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {language === 'ta' ? 'இன்றைய சந்தைகள்' : 'Today\'s Markets'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai', vendors: 245, status: 'active' },
              { name: language === 'ta' ? 'சூளூர் சந்தை' : 'Sulur Sandhai', vendors: 428, status: 'active' },
              { name: language === 'ta' ? 'மேட்டுப்பாளையம் சந்தை' : 'Mettupalayam Sandhai', vendors: 401, status: 'active' },
              { name: language === 'ta' ? 'கொடிவேரி சந்தை' : 'Kodiveri Sandhai', vendors: 187, status: 'active' },
            ].map((market, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <h4 className="font-semibold">{market.name}</h4>
                  <p className="text-sm text-gray-600">{market.vendors} {t('vendors')}</p>
                </div>
                <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                  {language === 'ta' ? 'செயலில்' : 'Active'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {language === 'ta' ? 'சமீபத்திய புகார்கள்' : 'Recent Complaints'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { 
                id: 'CMP001234', 
                type: language === 'ta' ? 'கட்டண சிக்கல்' : 'Fee Issue',
                market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
                status: 'pending'
              },
              { 
                id: 'CMP001189', 
                type: language === 'ta' ? 'குப்பை சேகரிக்கப்படவில்லை' : 'Garbage not collected',
                market: language === 'ta' ? 'பெருந்துறை சந்தை' : 'Perundurai Sandhai',
                status: 'in_progress'
              },
              { 
                id: 'CMP001145', 
                type: language === 'ta' ? 'வடிகால் பிரச்சனை' : 'Drainage problem',
                market: language === 'ta' ? 'சூளூர் சந்தை' : 'Sulur Sandhai',
                status: 'resolved'
              },
            ].map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{complaint.type}</h4>
                  <p className="text-xs text-gray-600">{complaint.market} • {complaint.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {t(complaint.status)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};