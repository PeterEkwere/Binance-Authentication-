import BinanceLoader from "./BinanceLoader"
import TestLoader from "./TestLoader"

export default function BackgroundLoader() {
    return (
        <div className="fixed w-full h-screen inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-md flex justify-center items-center">
                <div className=" flex-col gap-3 w-[40px] flex justify-center items-center h-[40px]">
                    <TestLoader />
                    {/* <p className="text-sm">
                        Loading
                    </p> */}
                </div>
            </div>
        </div>
    )
}