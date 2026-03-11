import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { DollarSign, TrendingUp, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export const RevenueDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  const dailyRevenue = [
    { id: 'day-1', date: '03', amount: 28500 },
    { id: 'day-2', date: '04', amount: 31200 },
    { id: 'day-3', date: '05', amount: 29800 },
    { id: 'day-4', date: '06', amount: 34500 },
    { id: 'day-5', date: '07', amount: 27900 },
    { id: 'day-6', date: '08', amount: 32100 },
    { id: 'day-7', date: '09', amount: 28500 },
  ];

  const stallTypeRevenue = [
    { id: 'stall-1', type: t('vegetables'), value: 12500, percentage: 28 },
    { id: 'stall-2', type: t('fruits'), value: 9800, percentage: 22 },
    { id: 'stall-3', type: t('fish'), value: 7200, percentage: 16 },
    { id: 'stall-4', type: t('groceries'), value: 6500, percentage: 15 },
    { id: 'stall-5', type: t('clothes'), value: 5400, percentage: 12 },
    { id: 'stall-6', type: t('others'), value: 3100, percentage: 7 },
  ];

  const marketRevenue = [
    { 
      id: 'market-1',
      market: language === 'ta' ? 'ஓலகடம்' : 'Olagadam', 
      today: 12250, 
      thisMonth: 147000,
      vendors: 245
    },
    { 
      id: 'market-2',
      market: language === 'ta' ? 'பெருந்துறை' : 'Perundurai', 
      today: 15600, 
      thisMonth: 187200,
      vendors: 312
    },
    { 
      id: 'market-3',
      market: language === 'ta' ? 'சூளூர்' : 'Sulur', 
      today: 21400, 
      thisMonth: 256800,
      vendors: 428
    },
    { 
      id: 'market-4',
      market: language === 'ta' ? 'பொள்ளாச்சி' : 'Pollachi', 
      today: 17800, 
      thisMonth: 213600,
      vendors: 356
    },
  ];

  const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('revenueDashboard')}</h1>
        <p className="text-gray-600 mt-1">
          {language === 'ta'
            ? 'வருவாய் பகுப்பாய்வு மற்றும் அறிக்கைகள்'
            : 'Revenue analytics and reports'
          }
        </p>
      </div>

      {/* Key Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('revenueToday')}</p>
                <p className="text-3xl font-bold text-gray-900">₹67.05K</p>
                <p className="text-xs text-green-600 mt-1">+8.2%</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'வார வருவாய்' : 'Weekly Revenue'}
                </p>
                <p className="text-3xl font-bold text-gray-900">₹2.12L</p>
                <p className="text-xs text-blue-600 mt-1">+12.5%</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'மாத வருவாய்' : 'Monthly Revenue'}
                </p>
                <p className="text-3xl font-bold text-gray-900">₹8.05L</p>
                <p className="text-xs text-purple-600 mt-1">+15.3%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'சராசரி/சந்தை' : 'Avg per Market'}
                </p>
                <p className="text-3xl font-bold text-gray-900">₹16.76K</p>
                <p className="text-xs text-yellow-600 mt-1">
                  {language === 'ta' ? '4 சந்தைகள்' : '4 markets'}
                </p>
              </div>
              <PieChartIcon className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ta' ? '7 நாள் வருவாய் போக்கு' : '7-Day Revenue Trend'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart key="revenue-line-chart" data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#16a34a" 
                strokeWidth={3}
                name={language === 'ta' ? 'வருவாய் (₹)' : 'Revenue (₹)'}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Stall Type */}
        <Card>
          <CardHeader>
            <CardTitle>{t('revenueByStallType')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stallTypeRevenue.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-sm font-semibold text-green-700">₹{item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index]
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'வருவாய் விநியோகம்' : 'Revenue Distribution'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart key="revenue-pie-chart">
                <Pie
                  data={stallTypeRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stallTypeRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market-wise Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>{t('revenueByMarket')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketRevenue.map((market, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{market.market}</h4>
                  <span className="text-sm text-gray-600">
                    {market.vendors} {t('vendors')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">{t('today')}</p>
                    <p className="text-xl font-bold text-green-700">₹{market.today.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {language === 'ta' ? 'இந்த மாதம்' : 'This Month'}
                    </p>
                    <p className="text-xl font-bold text-blue-700">₹{market.thisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ta' ? 'சந்தை ஒப்பீடு' : 'Market Comparison'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart key="revenue-bar-chart" data={marketRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="market" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="today" fill="#16a34a" name={t('today')} />
              <Bar dataKey="thisMonth" fill="#3b82f6" name={language === 'ta' ? 'இந்த மாதம்' : 'This Month'} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};