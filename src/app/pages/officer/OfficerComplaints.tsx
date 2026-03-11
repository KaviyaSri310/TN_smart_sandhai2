import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MessageSquare, Eye, CheckCircle, Image as ImageIcon, MapPin, Clock } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

export const OfficerComplaints: React.FC = () => {
  const { t, language } = useLanguage();

  const complaints = [
    {
      id: 'CMP001234',
      vendorName: language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar',
      vendorId: 'VND2026001234',
      type: language === 'ta' ? 'கட்டண சிக்கல்' : 'Fee Issue',
      description: language === 'ta' 
        ? 'இரட்டை கட்டணம் வசூலிக்கப்பட்டது. கட்டண ரசீது இணைக்கப்பட்டுள்ளது.'
        : 'Double fee charged. Payment receipt attached.',
      market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
      date: language === 'ta' ? '05 மார்ச் 2026' : 'March 05, 2026',
      time: language === 'ta' ? 'காலை 10:30' : '10:30 AM',
      status: 'pending',
      hasPhoto: true
    },
    {
      id: 'CMP001189',
      vendorName: language === 'ta' ? 'லட்சுமி பாலாஜி' : 'Lakshmi Balaji',
      vendorId: 'VND2026001189',
      type: language === 'ta' ? 'குப்பை சேகரிக்கப்படவில்லை' : 'Garbage not collected',
      description: language === 'ta'
        ? 'நேற்று குப்பை சேகரிக்கப்படவில்லை. சுகாதார சிக்கல் ஏற்பட்டுள்ளது.'
        : 'Garbage not collected yesterday. Creating hygiene issues.',
      market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
      date: language === 'ta' ? '05 மார்ச் 2026' : 'March 05, 2026',
      time: language === 'ta' ? 'காலை 9:15' : '9:15 AM',
      status: 'viewed',
      hasPhoto: true
    },
    {
      id: 'CMP001098',
      vendorName: language === 'ta' ? 'முருகன் செல்வம்' : 'Murugan Selvam',
      vendorId: 'VND2026001098',
      type: language === 'ta' ? 'வடிகால் பிரச்சனை' : 'Drainage problem',
      description: language === 'ta'
        ? 'வடிகால் அடைப்பு. தண்ணீர் தேங்கி நிற்கிறது.'
        : 'Drainage blockage. Water accumulating in the area.',
      market: language === 'ta' ? 'பெருந்துறை சந்தை' : 'Perundurai Sandhai',
      date: language === 'ta' ? '28 பிப்ரவரி 2026' : 'Feb 28, 2026',
      time: language === 'ta' ? 'மதியம் 2:45' : '2:45 PM',
      status: 'resolved',
      hasPhoto: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'viewed':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return language === 'ta' ? 'நிலுவையில்' : 'Pending';
      case 'viewed':
        return language === 'ta' ? 'பார்க்கப்பட்டது' : 'Viewed';
      case 'resolved':
        return language === 'ta' ? 'தீர்க்கப்பட்டது' : 'Resolved';
      default:
        return status;
    }
  };

  const handleMarkViewed = (id: string) => {
    alert(language === 'ta' 
      ? `புகார் ${id} பார்க்கப்பட்டதாக குறிக்கப்பட்டது`
      : `Complaint ${id} marked as viewed`
    );
  };

  const handleMarkResolved = (id: string) => {
    alert(language === 'ta' 
      ? `புகார் ${id} தீர்க்கப்பட்டதாக குறிக்கப்பட்டது`
      : `Complaint ${id} marked as resolved`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('complaints')}</h1>
        <p className="text-gray-600 mt-1">
          {language === 'ta'
            ? 'வியாபாரி புகார்களை பார்க்கவும் மற்றும் நிர்வகிக்கவும்'
            : 'View and manage vendor complaints'
          }
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                {language === 'ta' ? 'மொத்த புகார்கள்' : 'Total Complaints'}
              </p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                {language === 'ta' ? 'நிலுவையில்' : 'Pending'}
              </p>
              <p className="text-3xl font-bold text-yellow-700">1</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                {language === 'ta' ? 'தீர்க்கப்பட்டது' : 'Resolved'}
              </p>
              <p className="text-3xl font-bold text-green-700">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{complaint.type}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'ta' ? 'புகார் எண்' : 'Complaint ID'}: {complaint.id}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(complaint.status)}>
                  {getStatusText(complaint.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vendor Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {language === 'ta' ? 'வியாபாரி பெயர்' : 'Vendor Name'}
                  </span>
                  <span className="font-semibold">{complaint.vendorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('vendorId')}</span>
                  <span className="font-semibold">{complaint.vendorId}</span>
                </div>
              </div>

              {/* Complaint Details */}
              <div>
                <p className="text-gray-700">{complaint.description}</p>
              </div>

              {/* Market and Time Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{complaint.market}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{complaint.date} • {complaint.time}</span>
                </div>
              </div>

              {/* Photo Indicator */}
              {complaint.hasPhoto && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-900">
                    {language === 'ta' ? 'புகைப்படம் இணைக்கப்பட்டுள்ளது' : 'Photo attached'}
                  </span>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Eye className="mr-2 h-4 w-4" />
                    {language === 'ta' ? 'பார்க்க' : 'View'}
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t">
                {complaint.status === 'pending' && (
                  <Button 
                    onClick={() => handleMarkViewed(complaint.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {language === 'ta' ? 'பார்க்கப்பட்டதாக குறி' : 'Mark as Viewed'}
                  </Button>
                )}
                {complaint.status !== 'resolved' && (
                  <Button 
                    onClick={() => handleMarkResolved(complaint.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {language === 'ta' ? 'தீர்க்கப்பட்டதாக குறி' : 'Mark as Resolved'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};