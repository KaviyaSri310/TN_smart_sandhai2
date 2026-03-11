import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Calendar, Store } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const MarketsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const markets = [
    {
      name: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
      district: language === 'ta' ? 'ஈரோடு' : 'Erode',
      day: t('wednesday'),
      location: language === 'ta' ? 'ஓலகடம், ஈரோடு' : 'Olagadam, Erode',
      vendors: 245,
      active: true
    },
    {
      name: language === 'ta' ? 'பெருந்துறை சந்தை' : 'Perundurai Sandhai',
      district: language === 'ta' ? 'ஈரோடு' : 'Erode',
      day: t('friday'),
      location: language === 'ta' ? 'பெருந்துறை, ஈரோடு' : 'Perundurai, Erode',
      vendors: 312,
      active: false
    },
    {
      name: language === 'ta' ? 'சூளூர் சந்தை' : 'Sulur Sandhai',
      district: language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore',
      day: t('sunday'),
      location: language === 'ta' ? 'சூளூர், கோயம்புத்தூர்' : 'Sulur, Coimbatore',
      vendors: 428,
      active: true
    },
    {
      name: language === 'ta' ? 'அவினாசி சந்தை' : 'Avinashi Sandhai',
      district: language === 'ta' ? 'திருப்பூர்' : 'Tiruppur',
      day: t('tuesday'),
      location: language === 'ta' ? 'அவினாசி, திருப்பூர்' : 'Avinashi, Tiruppur',
      vendors: 198,
      active: false
    },
    {
      name: language === 'ta' ? 'பொள்ளாச்சி சந்தை' : 'Pollachi Sandhai',
      district: language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore',
      day: t('saturday'),
      location: language === 'ta' ? 'பொள்ளாச்சி, கோயம்புத்தூர்' : 'Pollachi, Coimbatore',
      vendors: 356,
      active: false
    },
    {
      name: language === 'ta' ? 'உடுமலைப்பேட்டை சந்தை' : 'Udumalaipettai Sandhai',
      district: language === 'ta' ? 'திண்டுக்கல்' : 'Dindigul',
      day: t('thursday'),
      location: language === 'ta' ? 'உடுமலைப்பேட்டை' : 'Udumalaipettai',
      vendors: 289,
      active: false
    },
    {
      name: language === 'ta' ? 'தாராபுரம் சந்தை' : 'Dharapuram Sandhai',
      district: language === 'ta' ? 'ஈரோடு' : 'Erode',
      day: t('monday'),
      location: language === 'ta' ? 'தாராபுரம், ஈரோடு' : 'Dharapuram, Erode',
      vendors: 267,
      active: false
    },
    {
      name: language === 'ta' ? 'கோபிச்செட்டிபாளையம் சந்தை' : 'Gobichettipalayam Sandhai',
      district: language === 'ta' ? 'ஈரோடு' : 'Erode',
      day: t('saturday'),
      location: language === 'ta' ? 'கோபிச்செட்டிபாளையம்' : 'Gobichettipalayam',
      vendors: 334,
      active: false
    },
    {
      name: language === 'ta' ? 'மேட்டுப்பாளையம் சந்தை' : 'Mettupalayam Sandhai',
      district: language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore',
      day: t('wednesday'),
      location: language === 'ta' ? 'மேட்டுப்பாளையம்' : 'Mettupalayam',
      vendors: 401,
      active: true
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('markets')}</h1>
          <p className="text-gray-600 mt-1">
            {language === 'ta' 
              ? 'இந்த பஞ்சாயத்தில் உள்ள வாராந்திர சந்தைகள்'
              : 'Weekly Markets in This Panchayat'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market, index) => (
          <Card key={index} className="hover:shadow-lg transition-all border-l-4 border-l-green-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-green-700" />
                  <CardTitle className="text-lg">{market.name}</CardTitle>
                </div>
                {market.active && (
                  <Badge className="bg-green-600">{language === 'ta' ? 'செயலில்' : 'Active'}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{market.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{market.day}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'ta' ? 'வியாபாரிகள்' : 'Vendors'}
                  </span>
                  <span className="font-semibold text-blue-700">{market.vendors}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};