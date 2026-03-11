import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { Badge } from "../../components/ui/badge";

export const PaymentHistory: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock payment data
  const payments = [
    {
      id: 'PAY-1001',
      vendor: 'Ramu Kumar',
      vendorId: 'VND2026001234',
      market: 'Olagadam Sandhai',
      date: '2026-03-10',
      amount: 50,
      status: 'Paid',
      method: 'UPI'
    },
    {
      id: 'PAY-1002',
      vendor: 'Selvi Mari',
      vendorId: 'VND2026001235',
      market: 'Perundurai Sandhai',
      date: '2026-03-09',
      amount: 100,
      status: 'Unpaid',
      method: '-'
    },
    {
      id: 'PAY-1003',
      vendor: 'Anbu Raja',
      vendorId: 'VND2026001236',
      market: 'Olagadam Sandhai',
      date: '2026-03-08',
      amount: 30,
      status: 'Paid',
      method: 'Cash'
    },
    {
      id: 'PAY-1004',
      vendor: 'Kathiravan',
      vendorId: 'VND2026001237',
      market: 'Sulur Sandhai',
      date: '2026-03-07',
      amount: 150,
      status: 'Paid',
      method: 'UPI'
    },
    {
      id: 'PAY-1005',
      vendor: 'Mani K.',
      vendorId: 'VND2026001238',
      market: 'Olagadam Sandhai',
      date: '2026-03-06',
      amount: 50,
      status: 'Paid',
      method: 'UPI'
    }
  ];

  const filteredPayments = payments.filter(p => 
    p.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ta' ? 'கட்டண வரலாறு' : 'Payment History'}
          </h1>
          <p className="text-gray-500 text-sm">
            {language === 'ta' 
              ? 'அனைத்து வியாபாரிகளின் கட்டண விவரங்களை கண்காணிக்கவும்'
              : 'Track and monitor all vendor payment records'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Collections</p>
                <p className="text-2xl font-bold text-gray-900">₹3.8L</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% from last month
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Today</p>
                <p className="text-2xl font-bold text-gray-900">₹28,450</p>
                <div className="flex items-center text-xs text-blue-600 mt-1">
                  <span className="font-semibold">545</span> payments received
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹4,200</p>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  from 42 vendors
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by vendor name, ID, or market..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4 text-gray-400" />
              Filter by Date
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Vendor</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Market</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Method</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{p.vendor}</span>
                        <span className="text-xs text-gray-500 font-mono">{p.vendorId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{p.market}</td>
                    <td className="py-4 px-4 text-gray-700">{p.date}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900">₹{p.amount}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{p.method}</td>
                    <td className="py-4 px-4">
                      <Badge className={p.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-400">{p.id}</td>
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