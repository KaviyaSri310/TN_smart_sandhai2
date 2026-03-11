import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  Phone,
  Tag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";

export const VendorManagement: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock vendors data
  const vendors = [
    {
      id: 'VND2026001234',
      name: language === 'ta' ? 'ராமு குமார்' : 'Ramu Kumar',
      mobile: '9876543210',
      commodity: 'Vegetables',
      vendorType: 'Permanent Stall',
      market: 'Olagadam Sandhai',
      status: 'Approved',
      licenseExpiry: '2026-12-31',
      paymentStatus: 'Paid'
    },
    {
      id: 'VND2026001235',
      name: language === 'ta' ? 'செல்வி மாரி' : 'Selvi Mari',
      mobile: '9876543211',
      commodity: 'Fruits',
      vendorType: 'Temporary Stall',
      market: 'Perundurai Sandhai',
      status: 'Pending',
      licenseExpiry: '2026-06-15',
      paymentStatus: 'Unpaid'
    },
    {
      id: 'VND2026001236',
      name: language === 'ta' ? 'அன்பு ராஜா' : 'Anbu Raja',
      mobile: '9876543212',
      commodity: 'Fish',
      vendorType: 'Roadside Vendor',
      market: 'Olagadam Sandhai',
      status: 'Blocked',
      licenseExpiry: '2025-12-31',
      paymentStatus: 'Paid'
    },
    {
      id: 'VND2026001237',
      name: language === 'ta' ? 'கதிரவன்' : 'Kathiravan',
      mobile: '9876543213',
      commodity: 'Flowers',
      vendorType: 'Contract Vendor',
      market: 'Sulur Sandhai',
      status: 'Approved',
      licenseExpiry: '2027-03-10',
      paymentStatus: 'Paid'
    }
  ];

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.mobile.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Approved</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">Pending</Badge>;
      case 'Blocked':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Blocked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isLicenseExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ta' ? 'வியாபாரிகள் மேலாண்மை' : 'Vendor Management'}
          </h1>
          <p className="text-gray-500 text-sm">
            {language === 'ta' 
              ? 'பதிவுசெய்யப்பட்ட அனைத்து வியாபாரிகளையும் நிர்வகிக்கவும்'
              : 'Manage and monitor all registered vendors'
            }
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Users className="mr-2 h-4 w-4" />
          {language === 'ta' ? 'புதிய வியாபாரி' : 'Add New Vendor'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={language === 'ta' ? 'வியாபாரி பெயர் அல்லது ID கொண்டு தேடுங்கள்' : 'Search by name, ID or mobile...'}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Vendor Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="roadside">Roadside</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendor Info</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Commodity</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Market</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">License Valid Till</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{vendor.name}</span>
                        <span className="text-xs text-gray-500 font-mono">{vendor.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {vendor.mobile}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Tag className="h-3 w-3 text-gray-400" />
                        {vendor.commodity}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{vendor.vendorType}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{vendor.market}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className={`text-sm ${isLicenseExpired(vendor.licenseExpiry) ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                          {vendor.licenseExpiry}
                        </span>
                        {isLicenseExpired(vendor.licenseExpiry) && (
                          <span className="text-[10px] text-red-500 font-semibold uppercase">Expired!</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(vendor.status)}
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Block
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Extend License
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
