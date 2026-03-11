import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { LogIn, User } from 'lucide-react';
import { Link } from 'react-router';

export const VendorLogin: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8" />
              <CardTitle className="text-2xl">
                {t('vendor')} {t('login')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">{t('mobileNumber')}</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder={language === 'ta' ? 'பதிவு செய்த மொபைல் எண்' : 'Registered mobile number'}
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">
                  {language === 'ta' ? 'OTP' : 'OTP'}
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder={language === 'ta' ? '6 இலக்க OTP' : '6 digit OTP'}
                  maxLength={6}
                />
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  {language === 'ta' ? 'OTP அனுப்புக' : 'Send OTP'}
                </button>
              </div>

              <Link to="/vendor/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('login')}
                </Button>
              </Link>

              <div className="text-center text-sm text-gray-600">
                {language === 'ta' ? 'புதிய பயனரா?' : 'New user?'}
                {' '}
                <Link to="/vendor/register" className="text-green-700 font-semibold hover:underline">
                  {t('register')}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
