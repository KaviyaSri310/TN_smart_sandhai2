import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DollarSign, User, Phone, Store, CheckCircle, Printer, Receipt } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

interface VendorData {
  vendorId?: string;
  name: string;
  phone: string;
  stallType: string;
  market: string;
}

// Stall type fee mapping
const STALL_FEES: { [key: string]: number } = {
  'Vegetables': 30,
  'Fruits': 40,
  'Greens': 20,
  'Fish': 80,
  'Meat': 100,
  'Poultry': 70,
  'Groceries': 50,
  'Grains': 50,
  'Flowers': 25,
  'Pots': 40,
  'Iron Tools': 60,
  'Clothes': 60,
  'Toys': 40,
  'Livestock': 100,
  'Others': 30,
};

export const FeeCollection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Get vendor data from navigation state (from QR scanner)
  const vendorFromQR = location.state?.vendor as VendorData | undefined;

  const [isManualEntry, setIsManualEntry] = useState(!vendorFromQR);
  const [vendorData, setVendorData] = useState<VendorData>(
    vendorFromQR || {
      name: '',
      phone: '',
      stallType: '',
      market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
    }
  );

  const [paymentCollected, setPaymentCollected] = useState(false);
  const [generatedVendorId, setGeneratedVendorId] = useState('');

  const stallFee = vendorData.stallType ? STALL_FEES[vendorData.stallType] || 30 : 0;

  const handleStallTypeChange = (value: string) => {
    setVendorData({ ...vendorData, stallType: value });
  };

  const handleCollectPayment = () => {
    // Generate vendor ID if manual entry
    if (isManualEntry) {
      const newVendorId = `VND${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedVendorId(newVendorId);
      setVendorData({ ...vendorData, vendorId: newVendorId });
    }
    setPaymentCollected(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleGenerateDigitalReceipt = () => {
    alert(
      language === 'ta'
        ? 'டிஜிட்டல் ரசீது உருவாக்கப்பட்டது!'
        : 'Digital receipt generated!'
    );
  };

  const handleReset = () => {
    setPaymentCollected(false);
    setGeneratedVendorId('');
    setVendorData({
      name: '',
      phone: '',
      stallType: '',
      market: language === 'ta' ? 'ஓலகடம் சந்தை' : 'Olagadam Sandhai',
    });
    setIsManualEntry(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ta' ? 'கட்டண வசூல்' : 'Fee Collection'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ta'
            ? 'சந்தை ஸ்டால் கட்டணங்களை வசூலிக்கவும்'
            : 'Collect market stall fees from vendors'}
        </p>
      </div>

      {!paymentCollected ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendor Information Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {language === 'ta' ? 'வியாபாரி விவரங்கள்' : 'Vendor Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorFromQR && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-900 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {language === 'ta'
                        ? 'QR ஸ்கேன் மூலம் தானாக நிரப்பப்பட்டது'
                        : 'Auto-filled from QR scan'}
                    </p>
                  </div>
                )}

                {/* Vendor ID (if from QR) */}
                {vendorFromQR?.vendorId && (
                  <div>
                    <Label>{language === 'ta' ? 'வியாபாரி ஐடி' : 'Vendor ID'}</Label>
                    <Input value={vendorFromQR.vendorId} disabled className="bg-gray-50" />
                  </div>
                )}

                {/* Vendor Name */}
                <div>
                  <Label htmlFor="vendorName">
                    {language === 'ta' ? 'வியாபாரி பெயர்' : 'Vendor Name'}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="vendorName"
                    value={vendorData.name}
                    onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
                    disabled={!!vendorFromQR}
                    placeholder={language === 'ta' ? 'பெயரை உள்ளிடவும்' : 'Enter vendor name'}
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <Label htmlFor="mobile">
                    {language === 'ta' ? 'மொபைல் எண்' : 'Mobile Number'}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={vendorData.phone}
                    onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })}
                    disabled={!!vendorFromQR}
                    placeholder={language === 'ta' ? 'மொபைல் எண்ணை உள்ளிடவும்' : 'Enter mobile number'}
                  />
                </div>

                {/* Stall Type */}
                <div>
                  <Label htmlFor="stallType">
                    {language === 'ta' ? 'ஸ்டால் வகை' : 'Stall Type'}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={vendorData.stallType}
                    onValueChange={handleStallTypeChange}
                    disabled={!!vendorFromQR}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          language === 'ta' ? 'ஸ்டால் வகையை தேர்ந்தெடுக்கவும்' : 'Select stall type'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetables">
                        {language === 'ta' ? 'காய்கறிகள்' : 'Vegetables'}
                      </SelectItem>
                      <SelectItem value="Fruits">
                        {language === 'ta' ? 'பழங்கள்' : 'Fruits'}
                      </SelectItem>
                      <SelectItem value="Greens">
                        {language === 'ta' ? 'கீரைகள்' : 'Greens'}
                      </SelectItem>
                      <SelectItem value="Fish">
                        {language === 'ta' ? 'மீன்' : 'Fish'}
                      </SelectItem>
                      <SelectItem value="Meat">
                        {language === 'ta' ? 'இறைச்சி' : 'Meat'}
                      </SelectItem>
                      <SelectItem value="Poultry">
                        {language === 'ta' ? 'கோழி' : 'Poultry'}
                      </SelectItem>
                      <SelectItem value="Groceries">
                        {language === 'ta' ? 'மளிகை' : 'Groceries'}
                      </SelectItem>
                      <SelectItem value="Grains">
                        {language === 'ta' ? 'தானியங்கள்' : 'Grains'}
                      </SelectItem>
                      <SelectItem value="Flowers">
                        {language === 'ta' ? 'பூக்கள்' : 'Flowers'}
                      </SelectItem>
                      <SelectItem value="Pots">
                        {language === 'ta' ? 'பானைகள்' : 'Pots'}
                      </SelectItem>
                      <SelectItem value="Iron Tools">
                        {language === 'ta' ? 'இரும்பு கருவிகள்' : 'Iron Tools'}
                      </SelectItem>
                      <SelectItem value="Clothes">
                        {language === 'ta' ? 'ஆடைகள்' : 'Clothes'}
                      </SelectItem>
                      <SelectItem value="Toys">
                        {language === 'ta' ? 'பொம்மைகள்' : 'Toys'}
                      </SelectItem>
                      <SelectItem value="Livestock">
                        {language === 'ta' ? 'கால்நடைகள்' : 'Livestock'}
                      </SelectItem>
                      <SelectItem value="Others">
                        {language === 'ta' ? 'மற்றவை' : 'Others'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Market Name */}
                <div>
                  <Label>{language === 'ta' ? 'சந்தை பெயர்' : 'Market Name'}</Label>
                  <Input value={vendorData.market} disabled className="bg-gray-50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {language === 'ta' ? 'கட்டண சுருக்கம்' : 'Fee Summary'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'ta' ? 'ஸ்டால் வகை' : 'Stall Type'}
                    </span>
                    <span className="font-semibold">
                      {vendorData.stallType || '-'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      {language === 'ta' ? 'மொத்த கட்டணம்' : 'Total Fee'}
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      ₹{stallFee}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-sm">
                    {language === 'ta' ? 'கட்டண விவரம்' : 'Fee Details'}
                  </h4>
                  <p className="text-xs text-gray-700">
                    {language === 'ta'
                      ? 'கட்டணம் ஸ்டால் வகையின் அடிப்படையில் தானாக கணக்கிடப்படுகிறது'
                      : 'Fee is automatically calculated based on stall type'}
                  </p>
                </div>

                <Button
                  onClick={handleCollectPayment}
                  disabled={!vendorData.name || !vendorData.phone || !vendorData.stallType}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  {language === 'ta' ? 'கட்டணம் வசூலிக்கவும்' : 'Collect Payment'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate('/inspector/qr-scanner')}
                  className="w-full"
                >
                  {language === 'ta' ? 'ரத்து செய்' : 'Cancel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Payment Success View
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'ta' ? 'கட்டணம் வசூலிக்கப்பட்டது!' : 'Payment Collected!'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {language === 'ta'
                    ? 'கட்டணம் வெற்றிகரமாக வசூலிக்கப்பட்டது'
                    : 'Fee has been successfully collected'}
                </p>
              </div>

              {/* Receipt Details */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-3 max-w-md mx-auto">
                {generatedVendorId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'ta' ? 'வியாபாரி ஐடி' : 'Vendor ID'}
                    </span>
                    <span className="font-semibold font-mono">{generatedVendorId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ta' ? 'வியாபாரி பெயர்' : 'Vendor Name'}
                  </span>
                  <span className="font-semibold">{vendorData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ta' ? 'ஸ்டால் வகை' : 'Stall Type'}
                  </span>
                  <span className="font-semibold">{vendorData.stallType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ta' ? 'சந்தை' : 'Market'}
                  </span>
                  <span className="font-semibold">{vendorData.market}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-semibold">
                    {language === 'ta' ? 'செலுத்தப்பட்ட தொகை' : 'Amount Paid'}
                  </span>
                  <span className="text-xl font-bold text-green-700">₹{stallFee}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center max-w-md mx-auto">
                <Button
                  onClick={handleGenerateDigitalReceipt}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  {language === 'ta' ? 'டிஜிட்டல் ரசீது' : 'Digital Receipt'}
                </Button>
                <Button onClick={handlePrintReceipt} variant="outline" className="flex-1">
                  <Printer className="mr-2 h-4 w-4" />
                  {language === 'ta' ? 'அச்சிடு' : 'Print Receipt'}
                </Button>
              </div>

              <Button onClick={handleReset} variant="outline" className="mt-4">
                {language === 'ta' ? 'புதிய வசூல்' : 'New Collection'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
