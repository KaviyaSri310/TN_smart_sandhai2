import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useBooking } from '../../context/BookingContext';

export const MarketSelection: React.FC = () => {
  const { t, language } = useLanguage();
  const { setMarket } = useBooking();
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [marketId, setMarketId] = useState('');
  const [date, setDate] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (district && block && panchayat && marketId && date) {
      const marketName = marketId === 'market1' ? 'Olagadam Sandhai' : marketId === 'market2' ? 'Perundurai Sandhai' : 'Vellakovil Sandhai';
      setMarket({
        id: marketId,
        name: marketName,
        district,
        block,
        panchayat,
        date
      });
      navigate('/vendor/stall-type-selection');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8" />
              <CardTitle className="text-2xl">{t('marketSelection')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-4" onSubmit={handleNext}>
              <div className="space-y-2">
                <Label>{t('district')}</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'மாவட்டம் தேர்வு செய்க' : 'Select district'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="erode">{language === 'ta' ? 'ஈரோடு' : 'Erode'}</SelectItem>
                    <SelectItem value="coimbatore">{language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore'}</SelectItem>
                    <SelectItem value="tiruppur">{language === 'ta' ? 'திருப்பூர்' : 'Tiruppur'}</SelectItem>
                    <SelectItem value="salem">{language === 'ta' ? 'சேலம்' : 'Salem'}</SelectItem>
                    <SelectItem value="namakkal">{language === 'ta' ? 'நாமக்கல்' : 'Namakkal'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('block')}</Label>
                <Select value={block} onValueChange={setBlock}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'வட்டம் தேர்வு செய்க' : 'Select block'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block1">{language === 'ta' ? 'பெருந்துறை ஒன்றியம்' : 'Perundurai Union'}</SelectItem>
                    <SelectItem value="block2">{language === 'ta' ? 'கோபிச்செட்டிபாளையம் ஒன்றியம்' : 'Gobichettipalayam Union'}</SelectItem>
                    <SelectItem value="block3">{language === 'ta' ? 'பவானி ஒன்றியம்' : 'Bhavani Union'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('townPanchayat')}</Label>
                <Select value={panchayat} onValueChange={setPanchayat}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'பஞ்சாயத்து தேர்வு செய்க' : 'Select panchayat'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="panchayat1">{language === 'ta' ? 'ஓலகடம் பஞ்சாயத்து' : 'Olagadam Panchayat'}</SelectItem>
                    <SelectItem value="panchayat2">{language === 'ta' ? 'வெள்ளகோவில் பஞ்சாயத்து' : 'Vellakovil Panchayat'}</SelectItem>
                    <SelectItem value="panchayat3">{language === 'ta' ? 'கொடிவேரி பஞ்சாயத்து' : 'Kodiveri Panchayat'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('marketName')}</Label>
                <Select value={marketId} onValueChange={setMarketId}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'சந்தை தேர்வு செய்க' : 'Select market'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market1">{language === 'ta' ? 'ஓலகடம் சந்தை - புதன்' : 'Olagadam Sandhai - Wednesday'}</SelectItem>
                    <SelectItem value="market2">{language === 'ta' ? 'பெருந்துறை சந்தை - வெள்ளி' : 'Perundurai Sandhai - Friday'}</SelectItem>
                    <SelectItem value="market3">{language === 'ta' ? 'வெள்ளகோவில் சந்தை - சனி' : 'Vellakovil Sandhai - Saturday'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('marketDate')}</Label>
                <Select value={date} onValueChange={setDate}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'தேதி தேர்வு செய்க' : 'Select date'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026-03-12">
                      {language === 'ta' ? '12 மார்ச் 2026 - புதன்' : 'March 12, 2026 - Wednesday'}
                    </SelectItem>
                    <SelectItem value="2026-03-19">
                      {language === 'ta' ? '19 மார்ச் 2026 - புதன்' : 'March 19, 2026 - Wednesday'}
                    </SelectItem>
                    <SelectItem value="2026-03-26">
                      {language === 'ta' ? '26 மார்ச் 2026 - புதன்' : 'March 26, 2026 - Wednesday'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!district || !block || !panchayat || !marketId || !date}>
                {t('next')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};