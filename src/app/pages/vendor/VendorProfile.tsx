import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { User, Edit, Camera } from 'lucide-react';

export const VendorProfile: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('profile')}</h1>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          {t('edit')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar'}
                </h3>
                <p className="text-sm text-gray-600">VND2026001234</p>
                <p className="text-xs text-green-600 mt-1">
                  {language === 'ta' ? '✓ சரிபார்க்கப்பட்டது' : '✓ Verified'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'தனிப்பட்ட தகவல்' : 'Personal Information'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('name')}</Label>
                <Input value={language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar'} disabled />
              </div>
              <div className="space-y-2">
                <Label>{t('mobileNumber')}</Label>
                <Input value="9876543210" disabled />
              </div>
              <div className="space-y-2">
                <Label>{t('aadhaarNumber')}</Label>
                <Input value="XXXX XXXX 5678" disabled />
              </div>
              <div className="space-y-2">
                <Label>{t('vendorType')}</Label>
                <Input value={t('farmer')} disabled />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>{t('address')}</Label>
                <Input 
                  value={language === 'ta' 
                    ? '123, கிராமம் தெரு, ஓலகடம், ஈரோடு - 638102'
                    : '123, Village Street, Olagadam, Erode - 638102'
                  } 
                  disabled 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ta' ? 'வியாபார தகவல்' : 'Business Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t('stallType')}</Label>
              <Input value={t('vegetables')} disabled />
            </div>
            <div className="space-y-2">
              <Label>
                {language === 'ta' ? 'விருப்ப சந்தை' : 'Preferred Market'}
              </Label>
              <Input 
                value={language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai'} 
                disabled 
              />
            </div>
            <div className="space-y-2">
              <Label>
                {language === 'ta' ? 'பதிவு தேதி' : 'Registration Date'}
              </Label>
              <Input 
                value={language === 'ta' ? '15 ஜனவரி 2026' : 'January 15, 2026'} 
                disabled 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                {language === 'ta' ? 'மொத்த சந்தைகள்' : 'Total Markets'}
              </p>
              <p className="text-4xl font-bold text-blue-700">24</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                {language === 'ta' ? 'மொத்த செலவு' : 'Total Spent'}
              </p>
              <p className="text-4xl font-bold text-green-700">₹1,200</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                {language === 'ta' ? 'சராசரி/மாதம்' : 'Average/Month'}
              </p>
              <p className="text-4xl font-bold text-purple-700">₹600</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
