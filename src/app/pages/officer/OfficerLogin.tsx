import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { LogIn, Briefcase } from 'lucide-react';
import { Link } from 'react-router';

export const OfficerLogin: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8" />
              <CardTitle className="text-2xl">
                {t('fieldOfficer')} {t('login')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="empid">
                  {language === 'ta' ? 'பணியாளர் அடையாள எண்' : 'Employee ID'}
                </Label>
                <Input
                  id="empid"
                  placeholder={language === 'ta' ? 'EMP12345' : 'EMP12345'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {language === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={language === 'ta' ? 'கடவுச்சொல்லை உள்ளிடவும்' : 'Enter password'}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">
                    {language === 'ta' ? 'என்னை நினைவில் வைத்திரு' : 'Remember me'}
                  </span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  {language === 'ta' ? 'கடவுச்சொல் மறந்துவிட்டதா?' : 'Forgot password?'}
                </a>
              </div>

              <Link to="/inspector/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('login')}
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
