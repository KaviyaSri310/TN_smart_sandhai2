import { supabase } from '../../../supabase';
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { MessageSquare, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

export const VendorComplaints: React.FC = () => {
  const { t, language } = useLanguage();
  const [complaintText, setComplaintText] = useState('');


  const complaints = [
    {
      id: 'CMP001234',
      type: language === 'ta' ? 'கட்டண சிக்கல்' : 'Fee Issue',
      description: language === 'ta' 
        ? 'இரட்டை கட்டணம் வசூலிக்கப்பட்டது'
        : 'Double fee charged',
      date: language === 'ta' ? '05 மார்ச் 2026' : 'March 05, 2026',
      status: 'pending'
    },
   
    {
      id: 'CMP001098',
      type: language === 'ta' ? 'வடிகால் பிரச்சனை' : 'Drainage problem',
      description: language === 'ta'
        ? 'வடிகால் அடைப்பு உள்ளது'
        : 'Drainage blockage in the area',
      date: language === 'ta' ? '20 பிப்ரவரி 2026' : 'Feb 20, 2026',
      status: 'resolved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  
    const handleSubmit = async () => {

  if (!complaintText.trim()) {
    alert(language === 'ta' ? 'புகாரை எழுதுங்கள்' : 'Please write your complaint');
    return;
  }

  const { error } = await supabase.from('complaints').insert([
    {
      vendor_id: "demo_vendor",
      market_name: "Olagadam Sandhai",
      complaint_text: complaintText,
      status: "pending"
    }
  ]);

  if (error) {
    console.error(error);
    alert(language === 'ta' ? 'புகார் சேமிக்க முடியவில்லை' : 'Failed to submit complaint');
    return;
  }

  alert(language === 'ta' ? 'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது' : 'Complaint submitted successfully');

  setComplaintText('');
};
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('complaints')}</h1>
        <p className="text-gray-600 mt-1">
          {language === 'ta'
            ? 'உங்கள் புகார்களை சமர்ப்பிக்கவும் மற்றும் கண்காணிக்கவும்'
            : 'Submit and track your complaints'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Complaint Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {t('submitComplaint')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>{t('complaintType')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ta' ? 'வகை தேர்வு செய்க' : 'Select type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fee">
                      {language === 'ta' ? 'கட்டண சிக்கல்' : 'Fee Issue'}
                    </SelectItem>
                    <SelectItem value="garbage">
                      {language === 'ta' ? 'குப்பை சேகரிக்கப்படவில்லை' : 'Garbage not collected'}
                    </SelectItem>
                    <SelectItem value="drainage">
                      {language === 'ta' ? 'வடிகால் பிரச்சனை' : 'Drainage problem'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('description')}</Label>
                <Textarea
  rows={4}
  value={complaintText}
  onChange={(e) => setComplaintText(e.target.value)}
  placeholder={language === 'ta' 
    ? 'உங்கள் புகாரை விரிவாக எழுதுங்கள்'
    : 'Describe your complaint in detail'
  }
/>

              </div>

              <div className="space-y-2">
                <Label>
                  {language === 'ta' ? 'புகைப்படம் (விருப்பமானது)' : 'Photo (Optional)'}
                </Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {language === 'ta' 
                      ? 'புகைப்படத்தை பதிவேற்ற கிளிக் செய்க'
                      : 'Click to upload photo'
                    }
                  </p>
                </div>
              </div>

              <Button type="button" onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">


                {t('submit')}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Complaints */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ta' ? 'எனது புகார்கள்' : 'My Complaints'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{complaint.type}</h4>
                      <Badge className={getStatusColor(complaint.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(complaint.status)}
                          {t(complaint.status)}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{complaint.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>{language === 'ta' ? 'புகார் எண்' : 'Complaint ID'}: {complaint.id}</span>
                  <span>{complaint.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-6 w-6 text-blue-700 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {language === 'ta' ? 'உதவி தேவையா?' : 'Need Help?'}
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                {language === 'ta'
                  ? 'அவசர உதவிக்கு எங்களை தொடர்பு கொள்ளுங்கள்'
                  : 'Contact us for immediate assistance'
                }
              </p>
              <div className="flex gap-3 text-sm">
                <span className="text-blue-900">📞 1800 425 7171</span>
                <span className="text-blue-900">✉️ support@smartsandhai.tn.gov.in</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};