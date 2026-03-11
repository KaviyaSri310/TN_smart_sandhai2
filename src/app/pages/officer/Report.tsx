import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { FileText, Printer, Search, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

interface VendorReport {
  vendorId: string;
  name: string;
  stallType: string;
  feeAmount: number;
  paymentStatus: 'Paid' | 'Not Paid';
}

export const Report: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for market report
  const mockVendors: VendorReport[] = [
    {
      vendorId: 'VND2026001234',
      name: language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar',
      stallType: language === 'ta' ? 'காய்கறிகள்' : 'Vegetables',
      feeAmount: 30,
      paymentStatus: 'Paid',
    },
    {
      vendorId: 'VND2026001189',
      name: language === 'ta' ? 'லட்சுமி பாலாஜி' : 'Lakshmi Balaji',
      stallType: language === 'ta' ? 'பழங்கள்' : 'Fruits',
      feeAmount: 40,
      paymentStatus: 'Paid',
    },
    {
      vendorId: 'VND2026001145',
      name: language === 'ta' ? 'முருகன் செல்வம்' : 'Murugan Selvam',
      stallType: language === 'ta' ? 'மீன்' : 'Fish',
      feeAmount: 80,
      paymentStatus: 'Paid',
    },
    {
      vendorId: 'VND2026001298',
      name: language === 'ta' ? 'செல்வி மாரி' : 'Selvi Mari',
      stallType: language === 'ta' ? 'கீரைகள்' : 'Greens',
      feeAmount: 20,
      paymentStatus: 'Paid',
    },
    {
      vendorId: 'VND2026001356',
      name: language === 'ta' ? 'கதிரவன்' : 'Kathiravan',
      stallType: language === 'ta' ? 'மளிகை' : 'Groceries',
      feeAmount: 50,
      paymentStatus: 'Paid',
    },
    {
      vendorId: 'VND2026001412',
      name: language === 'ta' ? 'அன்பு ராஜா' : 'Anbu Raja',
      stallType: language === 'ta' ? 'பூக்கள்' : 'Flowers',
      feeAmount: 25,
      paymentStatus: 'Paid',
    },
    {
      vendorId: 'VND2026001478',
      name: language === 'ta' ? 'மணி கே.' : 'Mani K.',
      stallType: language === 'ta' ? 'ஆடைகள்' : 'Clothes',
      feeAmount: 60,
      paymentStatus: 'Not Paid',
    },
  ];

  // Calculate statistics
  const totalVendors = 120;
  const vendorsPaid = 95;
  const totalFeesCollected = 3240;

  const filteredVendors = mockVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.stallType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ta' ? 'சந்தை அறிக்கை' : 'Market Report'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ta'
              ? 'இன்றைய சந்தை பங்கேற்பு மற்றும் கட்டண விவரங்கள்'
              : 'Today\'s market participation and fee collection details'}
          </p>
        </div>
        <Button onClick={handlePrintReport} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="mr-2 h-4 w-4" />
          {language === 'ta' ? 'அறிக்கையை அச்சிடு' : 'Print Market Report'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'மொத்த வியாபாரிகள்' : 'Total Vendors in Market'}
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalVendors}</p>
              </div>
              <Users className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ta' ? 'செலுத்தியவர்கள்' : 'Total Vendors Paid'}
                </p>
                <p className="text-3xl font-bold text-green-700">{vendorsPaid}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {((vendorsPaid / totalVendors) * 100).toFixed(1)}% {language === 'ta' ? 'செலுத்தியது' : 'paid'}
                </p>
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
                  {language === 'ta' ? 'மொத்த கட்டணம்' : 'Total Fees Collected'}
                </p>
                <p className="text-3xl font-bold text-blue-700">₹{totalFeesCollected.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Information for Print */}
      <div className="hidden print:block bg-white p-8 mb-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold">
            {language === 'ta' ? 'ஓலகடம் சந்தை அறிக்கை' : 'Olagadam Market Report'}
          </h2>
          <p className="text-gray-600">
            {language === 'ta' ? 'தேதி: 11 மார்ச் 2026' : 'Date: March 11, 2026'}
          </p>
          <p className="text-gray-600">
            {language === 'ta' ? 'அலுவலர்: ராஜேஷ் குமார்' : 'Officer: Rajesh Kumar'}
          </p>
        </div>
      </div>

      {/* Vendor Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {language === 'ta' ? 'வியாபாரி பங்கேற்பு' : 'Vendor Participation'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={
                  language === 'ta'
                    ? 'வியாபாரி பெயர், ஐடி அல்லது ஸ்டால் வகையை தேடுங்கள்...'
                    : 'Search by vendor name, ID, or stall type...'
                }
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">
                    {language === 'ta' ? 'வியாபாரி ஐடி' : 'Vendor ID'}
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">
                    {language === 'ta' ? 'வியாபாரி பெயர்' : 'Vendor Name'}
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">
                    {language === 'ta' ? 'ஸ்டால் வகை' : 'Stall Type'}
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">
                    {language === 'ta' ? 'கட்டண தொகை' : 'Fee Amount'}
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">
                    {language === 'ta' ? 'கட்டண நிலை' : 'Payment Status'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.vendorId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-gray-700">{vendor.vendorId}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{vendor.name}</td>
                    <td className="py-4 px-4 text-gray-700">{vendor.stallType}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">₹{vendor.feeAmount}</td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          vendor.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {vendor.paymentStatus === 'Paid'
                          ? language === 'ta'
                            ? 'செலுத்தப்பட்டது'
                            : 'Paid'
                          : language === 'ta'
                          ? 'செலுத்தப்படவில்லை'
                          : 'Not Paid'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <p>{language === 'ta' ? 'பதிவுகள் இல்லை' : 'No records found'}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Print Footer */}
      <div className="hidden print:block mt-8 pt-4 border-t">
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <p>
              {language === 'ta' ? 'அறிக்கை உருவாக்கப்பட்ட நேரம்' : 'Report Generated'}:{' '}
              {new Date().toLocaleString()}
            </p>
          </div>
          <div>
            <p>{language === 'ta' ? 'ஸ்மார்ட் சந்தை TN' : 'Smart Sandhai TN'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
