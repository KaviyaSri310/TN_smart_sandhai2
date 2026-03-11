import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { ArrowRight, User, Smartphone, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { authService } from '../../services/authService';

export const VendorRegistration: React.FC = () => {
  const { t, language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [mobileNumber, setMobileNumber] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (mobileNumber.length === 10 && vendorName.trim() !== '') {
      setLoading(true);
      setError('');
      
      const result = await authService.sendOTP({
        phone: mobileNumber,
        purpose: 'registration'
      });

      setLoading(false);

      if (result.success) {
        setStep('otp');
        // Show OTP in alert for demo purposes
        alert(`Demo OTP sent! Check console for OTP code.`);
      } else {
        setError(result.error || 'Failed to send OTP');
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    const result = await authService.verifyOTPAndRegister({
      phone: mobileNumber,
      otp: otp,
      vendorName: vendorName
    });

    setLoading(false);

    if (result.success && result.data) {
      // Login user
      login(result.data.session);
      
      // Show vendor ID
      alert(`✅ Registration Successful!\nYour Vendor ID: ${result.data.vendor.vendorId}`);
      
      // Navigate to dashboard
      navigate('/vendor/dashboard');
    } else {
      setError(result.error || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8" />
              <CardTitle className="text-2xl">{t('vendorRegistration')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {step === 'details' ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <Smartphone className="h-16 w-16 mx-auto text-green-600 mb-3" />
                  <p className="text-gray-600">
                    {language === 'ta' 
                      ? 'பதிவு செய்ய உங்கள் விவரங்களை உள்ளிடவும்'
                      : 'Enter your details to register'
                    }
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    id="name"
                    placeholder={language === 'ta' ? 'வியாபாரி பெயர்' : 'Vendor Name'}
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">{t('mobileNumber')}</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder={language === 'ta' ? '10 இலக்க மொபைல் எண்' : '10 digit mobile number'}
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleSendOTP}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={mobileNumber.length !== 10 || vendorName.trim() === '' || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'ta' ? 'அனுப்புகிறது...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {language === 'ta' ? 'OTP அனுப்புக' : 'Send OTP'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  {language === 'ta' ? 'ஏற்கனவே பதிவு செய்துள்ளீர்களா?' : 'Already registered?'}
                  {' '}
                  <Link to="/vendor/login" className="text-green-700 font-semibold hover:underline">
                    {t('login')}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {language === 'ta' 
                      ? 'OTP அனுப்பப்பட்டது'
                      : 'OTP sent to'
                    }
                  </p>
                  <p className="font-semibold text-lg">+91 {mobileNumber}</p>
                  <p className="text-sm text-gray-600 mt-1">{vendorName}</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp">
                    {language === 'ta' ? 'OTP குறியீடு' : 'OTP Code'}
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder={language === 'ta' ? '6 இலக்க OTP' : '6 digit OTP'}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleVerifyOTP}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'ta' ? 'சரிபார்க்கிறது...' : 'Verifying...'}
                    </>
                  ) : (
                    <>
                      {language === 'ta' ? 'OTP சரிபார்க்கவும்' : 'Verify OTP'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button 
                    onClick={() => {
                      setStep('details');
                      setOtp('');
                      setError('');
                    }}
                    className="text-gray-600 hover:underline"
                    disabled={loading}
                  >
                    {language === 'ta' ? 'விவரங்கள் மாற்று' : 'Change Details'}
                  </button>
                  <button 
                    onClick={handleSendOTP}
                    className="text-green-700 hover:underline"
                    disabled={loading}
                  >
                    {language === 'ta' ? 'OTP மீண்டும் அனுப்பு' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};