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
        {/* ... existing logo SVG ... */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-[#161C23] border-[#2A3139] shadow-xl"> {/* Darker card */}
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              {/* ... existing icon and heading ... */}

              <p className="text-sm mb-4 text-[#848E9C]"> {/* Softer text color */}
                {demoEmail}
              </p>

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
                  {/* ... existing list items ... */}
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