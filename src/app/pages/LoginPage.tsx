import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { User, Briefcase, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export const LoginPage: React.FC = () => {
  const { t, language } = useLanguage();

  const roles = [
    {
      title: t('vendor'),
      description: language === 'ta' ? 'சந்தையில் பொருட்களை விற்பவர்கள்' : 'Market sellers and traders',
      icon: User,
      loginPath: '/vendor/login',
      registerPath: '/vendor/register',
      color: 'from-green-600 to-green-700',
      iconBg: 'bg-green-100 text-green-700'
    },
    {
      title: language === 'ta' ? 'கள ஆய்வாளர்' : 'Field Inspector',
      description: language === 'ta' ? 'கள சரிபார்ப்பு மற்றும் QR ஸ்கேனிங்' : 'Field verification and QR scanning',
      icon: Briefcase,
      loginPath: '/inspector/login',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100 text-blue-700'
    },
    {
      title: language === 'ta' ? 'நிர்வாகி (பஞ்சாயத்து)' : 'Admin (Panchayat)',
      description: language === 'ta' ? 'பஞ்சாயத்து நிர்வாகம் மற்றும் அறிக்கை' : 'Panchayat management and reporting',
      icon: Building,
      loginPath: '/admin/login',
      color: 'from-purple-600 to-purple-700',
      iconBg: 'bg-purple-100 text-purple-700'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white py-12 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
              <span className="text-green-900 font-bold text-2xl">TN</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('appTitle')}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto font-light">
            {language === 'ta' 
              ? 'தமிழ்நாடு அரசு வாராந்திர சந்தை மேலாண்மை தளம்'
              : 'Government of Tamil Nadu Weekly Market Management Platform'
            }
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex-1 -mt-8 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <ShieldAlert className="h-6 w-6 text-green-700" />
              {t('selectRole')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <div key={index} className="flex flex-col">
                    <div className={`
                      h-full rounded-2xl border-2 border-gray-100 p-6 
                      hover:border-green-600 hover:shadow-lg transition-all 
                      flex flex-col items-center text-center
                    `}>
                      <div className={`
                        w-16 h-16 rounded-2xl ${role.iconBg} 
                        flex items-center justify-center mb-6 
                        transition-transform
                      `}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                      <p className="text-sm text-gray-600 mb-6 flex-1">{role.description}</p>
                      
                      <div className="w-full space-y-3">
                        <Link to={role.loginPath} className="block w-full">
                          <div className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                            {t('login')}
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </Link>
                        {role.registerPath && (
                          <Link to={role.registerPath} className="block w-full">
                            <div className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                              {t('register')}
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <p>
                {language === 'ta'
                  ? 'பயன்பாட்டு வழிகாட்டி மற்றும் உதவி ஆவணங்களை இங்கே காணவும்'
                  : 'View user manuals and help documentation here.'
                }
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <p>
                {language === 'ta'
                  ? 'தொழில்நுட்ப உதவிக்கு 1800-XXX-XXXX என்ற எண்ணிற்கு அழைக்கவும்'
                  : 'For technical support, call 1800-XXX-XXXX.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="font-semibold text-gray-900">
            {language === 'ta'
              ? 'தமிழ்நாடு அரசு | கிராமப்புற வளர்ச்சி மற்றும் பஞ்சாயத்து ராஜ் துறை'
              : 'Government of Tamil Nadu | Dept. of Rural Development & Panchayat Raj'
            }
          </p>
          <div className="flex justify-center gap-8 text-xs text-gray-400">
            <a href="#" className="hover:text-green-700">Privacy Policy</a>
            <a href="#" className="hover:text-green-700">Terms of Service</a>
            <a href="#" className="hover:text-green-700">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Internal missing icons
function ShieldAlert(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}

function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function MessageSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}