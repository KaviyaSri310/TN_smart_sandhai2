import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('contactUs')}</h1>
        <p className="text-gray-600 mt-1">
          {language === 'ta'
            ? 'எங்களை தொடர்பு கொள்ள அல்லது உங்கள் கேள்விகளை அனுப்புங்கள்'
            : 'Get in touch with us or send your queries'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('departmentContact')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-700 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'ta' ? 'தொலைபேசி' : 'Phone'}
                </h4>
                <p className="text-sm text-gray-600">1800 425 7171</p>
                <p className="text-sm text-gray-600">0422 2345 6789</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-700 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                </h4>
                <p className="text-sm text-gray-600">smartsandhai@tn.gov.in</p>
                <p className="text-sm text-gray-600">support@smartsandhai.tn.gov.in</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <MapPin className="h-5 w-5 text-yellow-700 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'ta' ? 'முகவரி' : 'Address'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ta'
                    ? 'கிராமப்புற வளர்ச்சி மற்றும் பஞ்சாயத்து ராஜ் துறை'
                    : 'Dept. of Rural Development & Panchayat Raj'
                  }
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'ta'
                    ? 'செயின்ட் ஜார்ஜ் கோட்டை, சென்னை - 600 009'
                    : 'Fort St. George, Chennai - 600 009'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-700 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'ta' ? 'அலுவலக நேரம்' : 'Office Hours'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ta'
                    ? 'திங்கள் - வெள்ளி: காலை 9:30 - மாலை 5:30'
                    : 'Monday - Friday: 9:30 AM - 5:30 PM'
                  }
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'ta'
                    ? 'சனி, ஞாயிறு: விடுமுறை'
                    : 'Saturday, Sunday: Closed'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'உங்கள் செய்தியை அனுப்புங்கள்' : 'Send Your Message'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  placeholder={language === 'ta' ? 'உங்கள் பெயரை உள்ளிடவும்' : 'Enter your name'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={language === 'ta' ? 'தொலைபேசி எண்' : 'Phone number'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'ta' ? 'உங்கள் மின்னஞ்சல்' : 'Your email'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={language === 'ta' ? 'உங்கள் செய்தியை இங்கே எழுதுங்கள்' : 'Write your message here'}
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                {t('submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900">
                {language === 'ta' ? 'அவசர உதவி எண்' : 'Emergency Helpline'}
              </h3>
              <p className="text-2xl font-bold text-red-700">1800 425 7171</p>
              <p className="text-sm text-red-700">
                {language === 'ta' ? '24/7 கிடைக்கும்' : 'Available 24/7'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
