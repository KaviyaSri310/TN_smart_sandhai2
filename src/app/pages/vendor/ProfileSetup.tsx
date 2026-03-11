import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowRight, Upload, User } from 'lucide-react';
import { Link } from 'react-router';

export const ProfileSetup: React.FC = () => {
  const { t, language } = useLanguage();
  const [vendorType, setVendorType] = useState('farmer');
  const [stallType, setStallType] = useState('');

  const stallTypes = [
    { value: 'vegetables', label: t('vegetables') },
    { value: 'fruits', label: t('fruits') },
    { value: 'greens', label: t('greens') },
    { value: 'fish', label: t('fish') },
    { value: 'meat', label: t('meat') },
    { value: 'poultry', label: t('poultry') },
    { value: 'groceries', label: t('groceries') },
    { value: 'grains', label: t('grains') },
    { value: 'flowers', label: t('flowers') },
    { value: 'pots', label: t('pots') },
    { value: 'ironTools', label: t('ironTools') },
    { value: 'clothes', label: t('clothes') },
    { value: 'toys', label: t('toys') },
    { value: 'livestock', label: t('livestock') },
    { value: 'others', label: t('others') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8" />
              <CardTitle className="text-2xl">{t('profileSetup')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <Button variant="outline" size="sm" type="button">
                  <Upload className="mr-2 h-4 w-4" />
                  {t('uploadPhoto')}
                </Button>
                <p className="text-xs text-gray-500">
                  {language === 'ta' ? 'விருப்பமானது' : 'Optional'}
                </p>
              </div>

              {/* Vendor Type */}
              <div className="space-y-3">
                <Label>{t('vendorType')}</Label>
                <RadioGroup value={vendorType} onValueChange={setVendorType}>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="farmer" id="farmer" />
                    <Label htmlFor="farmer" className="flex-1 cursor-pointer">
                      {t('farmer')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="trader" id="trader" />
                    <Label htmlFor="trader" className="flex-1 cursor-pointer">
                      {t('trader')}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Stall Type */}
              <div className="space-y-2">
                <Label>{t('stallType')}</Label>
                <Select value={stallType} onValueChange={setStallType}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'தேர்வு செய்க' : 'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    {stallTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Link to="/vendor/market-selection">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {t('next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};