import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CreditCard, Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { marketService } from '../../services/marketService';
import { paymentService } from '../../services/paymentService';
import { toast } from 'sonner';

export const Payment: React.FC = () => {
  const { t, language } = useLanguage();
  const { booking } = useBooking();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    // Ensure all required data is present to prevent crashes
    if (!booking.market || !booking.stallType || !session) { 
      toast.error(language === 'ta' ? 'முன்பதிவு விவரங்கள் குறைவாக உள்ளன' : 'Missing booking information');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Create the booking in the backend (mock)
      const bookingResult = await marketService.createBooking({
        vendorId: "demo_vendor",
        marketId: booking.market.id,
        marketName: booking.market.name,
        marketDate: booking.market.date,
        stallType: booking.stallType
      });

      if (bookingResult.success && bookingResult.data) {
        const bookingData = bookingResult.data;
        
        // 2. Process payment (mock)
        const paymentResult = await paymentService.processPayment({
  vendorId: "demo_vendor",
  marketId: booking.market.id,
  marketName: booking.market.name,
  amount: booking.amount,
  paymentMethod: 'upi',
  bookingId: bookingData.bookingId
});

        if (paymentResult.success && paymentResult.data) {
          // 3. Confirm the booking
          await marketService.confirmBooking(
  bookingData.bookingId,
  paymentResult.data.payment.paymentId
);
          
          toast.success(language === 'ta' ? 'கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது!' : 'Payment successful!');
          navigate('/vendor/qr-pass');
        } else {
          toast.error(language === 'ta' ? 'கட்டணம் தோல்வியுற்றது' : 'Payment failed');
        }
      } else {
        toast.error(bookingResult.error || (language === 'ta' ? 'முன்பதிவு தோல்வியுற்றது' : 'Booking failed'));
      }
    } catch (err) {
      console.error(err);
      toast.error(language === 'ta' ? 'ஏதோ தவறு நடந்துவிட்டது' : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      description: language === 'ta' ? 'Google Pay, PhonePe, Paytm' : 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'gpay',
      name: 'Google Pay',
      icon: '🟢',
      description: language === 'ta' ? 'Google Pay மூலம் செலுத்துங்கள்' : 'Pay using Google Pay'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: '🟣',
      description: language === 'ta' ? 'PhonePe மூலம் செலுத்துங்கள்' : 'Pay using PhonePe'
    }
  ];

  if (!booking.market || !booking.stallType) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200 bg-red-50">
          <CardContent className="p-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto" />
            <h2 className="text-xl font-bold text-red-900">
              {language === 'ta' ? 'தவறான அமர்வு' : 'Invalid Session'}
            </h2>
            <p className="text-red-700">
              {language === 'ta' 
                ? 'முன்பதிவு விவரங்கள் கண்டறியப்படவில்லை. தயவுசெய்து மீண்டும் தொடங்கவும்.'
                : 'Booking details not found. Please start the process again.'
              }
            </p>
            <Button onClick={() => navigate('/vendor/market-selection')} className="w-full bg-red-600 hover:bg-red-700">
              {language === 'ta' ? 'மீண்டும் தொடங்கவும்' : 'Start Again'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md space-y-4">
        {/* Fee Details Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">{t('marketFee')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('marketName')}</span>
                <span className="font-semibold">{booking.market.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('marketDate')}</span>
                <span className="font-semibold">{booking.market.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('stallType')}</span>
                <span className="font-semibold capitalize">{booking.stallType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{language === 'ta' ? 'பொருள்' : 'Commodity'}</span>
                <span className="font-semibold capitalize">{booking.commodity || '-'}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{language === 'ta' ? 'மொத்தம்' : 'Total'}</span>
                  <span className="text-2xl font-bold text-green-700">₹{booking.amount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t('selectPaymentMethod')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className="w-full border-2 rounded-lg p-4 hover:border-green-600 hover:bg-green-50 transition-all text-left group"
                onClick={handlePayment}
                disabled={loading}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{method.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold group-hover:text-green-700">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </div>
              </button>
            ))}

            <Button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 mt-4 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {language === 'ta' ? 'செயலாக்கப்படுகிறது...' : 'Processing...'}
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  {t('payNow')} ₹{booking.amount}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-center text-xs text-gray-500 px-4">
          {language === 'ta'
            ? '🔒 உங்கள் கட்டணம் பாதுகாப்பாக செயலாக்கப்படுகிறது'
            : '🔒 Your payment is processed securely'
          }
        </div>
      </div>
    </div>
  );
};
