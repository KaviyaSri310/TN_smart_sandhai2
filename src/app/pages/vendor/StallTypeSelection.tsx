import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowRight, Store, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useBooking } from '../../context/BookingContext';

export const StallTypeSelection: React.FC = () => {
  const { t, language } = useLanguage();
  const { booking, setStallType, setCommodity } = useBooking();
  const navigate = useNavigate();
  const [selectedStallType, setSelectedStallType] = useState(booking.stallType || '');
  const [selectedCommodity, setSelectedCommodity] = useState(booking.commodity || '');
  const [error, setError] = useState('');

  // Fixed stall types as requested
  const stallTypes = [
    { value: 'small', label: language === 'ta' ? 'சிறிய கடை (₹50)' : 'Small Stall (₹50)', price: 50 },
    { value: 'medium', label: language === 'ta' ? 'நடுத்தர கடை (₹100)' : 'Medium Stall (₹100)', price: 100 },
    { value: 'large', label: language === 'ta' ? 'பெரிய கடை (₹150)' : 'Large Stall (₹150)', price: 150 },
    { value: 'roadside', label: language === 'ta' ? 'சாலையோர வியாபாரி (₹30)' : 'Roadside Vendor (₹30)', price: 30 },
  ];

  const commodities = [
    { value: 'vegetables', label: t('vegetables') },
    { value: 'fruits', label: t('fruits') },
    { value: 'greens', label: t('greens') },
    { value: 'fish', label: t('fish') },
    { value: 'meat', label: t('meat') },
    { value: 'poultry', label: t('poultry') },
    { value: 'groceries', label: t('groceries') },
    { value: 'grains', label: t('grains') },
    { value: 'flowers', label: t('flowers') },
    { value: 'livestock', label: t('livestock') },
    { value: 'others', label: t('others') },
  ];

  const handleContinue = () => {
    if (!booking.market) {
      setError(language === 'ta' ? 'தயவுசெய்து முதலில் சந்தையைத் தேர்ந்தெடுக்கவும்' : 'Please select a market first');
      return;
    }

    if (selectedStallType && selectedCommodity) {
      setStallType(selectedStallType);
      setCommodity(selectedCommodity);
      navigate('/vendor/payment');
    } else {
      setError(language === 'ta' ? 'அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்' : 'Please fill all details');
    }
  };

  const getPrice = () => {
    const stall = stallTypes.find(s => s.value === selectedStallType);
    return stall ? stall.price : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8" />
              <CardTitle className="text-2xl">
                {language === 'ta' ? 'கடை வகை தேர்வு' : 'Select Stall Type'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Selected Market Info */}
              {booking.market && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-sm">
                  <p className="font-semibold text-green-800">{booking.market.name}</p>
                  <p className="text-green-600">{booking.market.date}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stallType">{language === 'ta' ? 'கடை வகை' : 'Stall Type'}</Label>
                  <Select value={selectedStallType} onValueChange={setSelectedStallType}>
                    <SelectTrigger id="stallType">
                      <SelectValue placeholder={language === 'ta' ? 'கடை வகை தேர்வு செய்க' : 'Select stall type'} />
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

                <div className="space-y-2">
                  <Label htmlFor="commodity">{t('commodity') || (language === 'ta' ? 'பொருட்கள்' : 'Commodity')}</Label>
                  <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                    <SelectTrigger id="commodity">
                      <SelectValue placeholder={language === 'ta' ? 'பொருளைத் தேர்ந்தெடுக்கவும்' : 'Select commodity'} />
                    </SelectTrigger>
                    <SelectContent>
                      {commodities.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedStallType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{language === 'ta' ? 'முன்பதிவு கட்டணம்:' : 'Booking Fee:'}</span>
                    <span className="text-2xl font-bold text-blue-700">₹{getPrice()}</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleContinue}
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg shadow-md"
                disabled={!selectedStallType || !selectedCommodity}
              >
                {language === 'ta' ? 'பணம் செலுத்தவும்' : 'Proceed to Payment'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center">
                <Link to="/vendor/market-selection" className="text-sm text-gray-600 hover:text-green-700 font-medium">
                  {language === 'ta' ? '← வேறு சந்தையை மாற்ற' : '← Change Market'}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
