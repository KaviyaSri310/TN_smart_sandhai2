import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
// Import all required icons including AlertCircle
import { Download, CheckCircle, QrCode, ArrowLeft, Share2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

export const QRPass: React.FC = () => {
  const { t, language } = useLanguage();
  const { booking } = useBooking();
  const { session } = useAuth();

  // Use session instead of user (based on AuthContext read earlier)
  const user = session?.user;

  // Generate a mock booking ID if not in booking state (for preview)
  const mockBookingId = `BK-${Date.now().toString().slice(-6)}`;
  
  // Content for QR: vendorId, bookingId, marketId, date
  const qrContent = `V:${user?.userId || 'VND001'}|B:${mockBookingId}|M:${booking.market?.id || 'MKT001'}|D:${booking.market?.date || '2026-03-12'}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Success Message */}
      <Card className="bg-green-50 border-green-200 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">
                {language === 'ta' ? 'கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது!' : 'Payment Successful!'}
              </h3>
              <p className="text-sm text-green-700">
                {language === 'ta' 
                  ? 'உங்கள் QR அனுமதி பத்திரம் தயாராக உள்ளது'
                  : 'Your QR pass is ready for download'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Pass Card */}
      <Card className="max-w-md mx-auto shadow-xl border-2 border-green-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-800 to-green-700 text-white p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <QrCode className="h-6 w-6 text-yellow-400" />
              <CardTitle className="text-xl tracking-wide uppercase font-bold">{t('qrPass')}</CardTitle>
            </div>
            <p className="text-xs text-green-100 uppercase tracking-widest">{t('appTitle')}</p>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-6">
            {/* QR Code Section */}
            <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 relative">
              <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <QrCode className="h-56 w-56 mx-auto text-gray-900" />
                  <div className="mt-4 px-3 py-1 bg-gray-100 rounded-lg inline-block">
                    <p className="text-xs font-mono font-bold text-gray-800">
                      {qrContent}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pass Details */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{t('vendorId')}</span>
                <span className="font-bold text-gray-900">{user?.userId || 'VND2026001234'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{t('name')}</span>
                <span className="font-bold text-gray-900">
                  {user?.name || (language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{language === 'ta' ? 'கடை அளவு' : 'Stall Size'}</span>
                <span className="font-bold text-blue-700 uppercase">
                  {booking.stallType || 'Small'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{t('commodity')}</span>
                <span className="font-bold text-gray-900 uppercase">
                  {booking.commodity || 'Vegetables'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{t('marketName')}</span>
                <span className="font-bold text-gray-900">
                  {booking.market?.name || (language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai')}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-3 mt-1">
                <span className="text-gray-500 font-medium">{t('marketDate')}</span>
                <span className="font-bold text-green-700">
                  {booking.market?.date || '12 மார்ச் 2026'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{t('validUntil')}</span>
                <span className="font-bold text-red-600">
                  {booking.market?.date || '12 மார்ச் 2026'}, 6:00 PM
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md h-11">
                <Download className="mr-2 h-4 w-4" />
                {language === 'ta' ? 'பதிவிறக்கு' : 'Download'}
              </Button>
              <Button variant="outline" className="border-gray-300 h-11">
                <Share2 className="mr-2 h-4 w-4" />
                {language === 'ta' ? 'பகிர்' : 'Share'}
              </Button>
            </div>
            
            <Link to="/vendor/dashboard" className="block">
              <Button variant="ghost" className="w-full text-gray-600 hover:bg-gray-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'ta' ? 'முகப்புக்கு செல்' : 'Return to Dashboard'}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="max-w-md mx-auto bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {language === 'ta' ? 'முக்கிய குறிப்புகள்' : 'Important Instructions'}
          </h4>
          <ul className="text-amber-800 space-y-1.5 text-xs list-disc pl-4">
            <li>
              {language === 'ta' 
                ? 'சந்தையில் நுழையும் போது இந்த QR குறியீட்டை காட்ட வேண்டும்'
                : 'Present this QR code at the market entrance for verification.'
              }
            </li>
            <li>
              {language === 'ta'
                ? 'ஒவ்வொரு சந்தைக்கும் தனித்தனியாக முன்பதிவு செய்யப்பட வேண்டும்'
                : 'Separate booking is required for each market visit.'
              }
            </li>
            <li>
              {language === 'ta'
                ? 'இந்த பாஸ் ஒரு நாள் மட்டுமே செல்லுபடியாகும்'
                : 'This pass is valid for the specified date only.'
              }
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};