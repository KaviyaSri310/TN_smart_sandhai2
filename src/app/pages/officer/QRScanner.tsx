import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { QrCode, Camera, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

export const QRScanner: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [scannedVendor, setScannedVendor] = useState<any>(null);

  // Mock vendor with both paid and unpaid scenarios
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid'>('unpaid');

  const mockVendor = {
    vendorId: 'VND2026001234',
    name: language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar',
    phone: '9876543210',
    stallType: language === 'ta' ? 'காய்கறிகள்' : 'Vegetables',
    market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
    date: language === 'ta' ? '09 மார்ச் 2026' : 'March 09, 2026',
    paymentStatus: paymentStatus,
    amount: '₹30',
    vendorType: t('farmer')
  };

  const handleScan = () => {
    // Randomly set paid or unpaid for demo
    const isPaid = Math.random() > 0.5;
    setPaymentStatus(isPaid ? 'paid' : 'unpaid');
    setScannedVendor({ ...mockVendor, paymentStatus: isPaid ? 'paid' : 'unpaid' });
  };

  const handleCollectFee = () => {
    // Navigate to Fee Collection page with vendor data
    navigate('/inspector/fee-collection', {
      state: {
        vendor: {
          vendorId: scannedVendor.vendorId,
          name: scannedVendor.name,
          phone: scannedVendor.phone,
          stallType: scannedVendor.stallType === (language === 'ta' ? 'காய்கறிகள்' : 'Vegetables') ? 'Vegetables' : scannedVendor.stallType,
          market: scannedVendor.market,
        },
      },
    });
  };

  const handleVerify = () => {
    alert(language === 'ta' ? 'வியாபாரி சரிபார்க்கப்பட்டார்!' : 'Vendor verified!');
    setScannedVendor(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('qrScanner')}</h1>
        <p className="text-gray-600 mt-1">
          {language === 'ta'
            ? 'வியாபாரி QR குறியீட்டை ஸ்கேன் செய்து சரிபார்க்கவும்'
            : 'Scan vendor QR code to verify entry'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {language === 'ta' ? 'QR ஸ்கேனர்' : 'QR Scanner'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Camera View */}
              <div className="bg-gray-900 rounded-lg aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-green-500 rounded-lg"></div>
                </div>
                <Camera className="h-16 w-16 text-white/50" />
                {!scannedVendor && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white text-sm">
                      {language === 'ta' 
                        ? 'QR குறியீட்டை சதுரத்தில் வைக்கவும்'
                        : 'Position QR code within square'
                      }
                    </p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleScan} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <QrCode className="mr-2 h-4 w-4" />
                {language === 'ta' ? 'ஸ்கேன் செய்க' : 'Scan QR Code'}
              </Button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="text-blue-900">
                  {language === 'ta'
                    ? '💡 QR குறியீட்டை தெளிவாக காட்டும்படி வியாபாரிகளிடம் கேட்கவும்'
                    : '💡 Ask vendors to display QR code clearly'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Result */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'வியாபாரி விவரங்கள்' : 'Vendor Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scannedVendor ? (
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-center">
                  {scannedVendor.paymentStatus === 'paid' ? (
                    <Badge className="bg-green-600 text-white px-4 py-2">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {language === 'ta' ? 'கட்டண நிலை' : 'Payment Status'}: {language === 'ta' ? 'செலுத்தப்பட்டது' : 'Paid'}
                    </Badge>
                  ) : (
                    <Badge className="bg-red-600 text-white px-4 py-2">
                      <XCircle className="mr-2 h-4 w-4" />
                      {language === 'ta' ? 'கட்டண நிலை' : 'Payment Status'}: {language === 'ta' ? 'செலுத்தப்படவில்லை' : 'Not Paid'}
                    </Badge>
                  )}
                </div>

                {/* Vendor Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('vendorId')}</span>
                    <span className="font-semibold">{scannedVendor.vendorId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('name')}</span>
                    <span className="font-semibold">{scannedVendor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('stallType')}</span>
                    <span className="font-semibold">{scannedVendor.stallType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('marketName')}</span>
                    <span className="font-semibold">{scannedVendor.market}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {scannedVendor.paymentStatus === 'paid' ? (
                    <>
                      <Button 
                        onClick={handleVerify}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {t('verify')} & {language === 'ta' ? 'அனுமதி' : 'Allow Entry'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setScannedVendor(null)}
                        className="w-full"
                      >
                        {t('cancel')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={handleCollectFee}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        {language === 'ta' ? 'கட்டணம் வசூலிக்க' : 'Collect Fee'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setScannedVendor(null)}
                        className="w-full"
                      >
                        {t('cancel')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center py-12">
                <div className="text-center text-gray-400">
                  <QrCode className="h-24 w-24 mx-auto mb-4" />
                  <p>
                    {language === 'ta'
                      ? 'QR குறியீட்டை ஸ்கேன் செய்க'
                      : 'Scan a QR code to view details'
                    }
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'இன்று ஸ்கேன்' : 'Scanned Today'}
                </p>
                <p className="text-3xl font-bold text-gray-900">142</p>
              </div>
              <QrCode className="h-10 w-10 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'}
                </p>
                <p className="text-3xl font-bold text-green-700">142</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'நிராகரிக்கப்பட்டது' : 'Rejected'}
                </p>
                <p className="text-3xl font-bold text-red-700">0</p>
              </div>
              <XCircle className="h-10 w-10 text-red-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};