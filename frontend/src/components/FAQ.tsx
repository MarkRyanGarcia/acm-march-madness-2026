import { StrokedText } from "./StrokedText";

export default function FAQ() {
    return (
        <section className="flex flex-col gap-12 md:gap-20 w-full items-center px-4">
            <StrokedText
                text="FAQ"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center"
                color="#FFD1A6"
                outlineColor="#F49D75"
            />

            <div className="w-full max-w-5xl flex flex-col gap-12">

                <div className="flex items-center justify-between w-full min-h-20 md:min-h-24 outline-white outline-10 md:outline-15 rounded-4xl bg-transparent">
                    <p className="w-full p-4 text-sm sm:text-base md:text-lg">
                        chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking?
                    </p>
                    <img
                        src="/flower_small_pink.svg"
                        className="w-14 sm:w-18 md:w-22 p-3 shrink-0"
                    />
                </div>

                <div className="flex items-center justify-between w-full min-h-20 md:min-h-24 outline-white outline-10 md:outline-15 rounded-4xl bg-transparent">
                    <p className="w-full p-4 text-sm sm:text-base md:text-lg">
                        chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking?
                    </p>
                    <img
                        src="/flower_small_pink.svg"
                        className="w-14 sm:w-18 md:w-22 p-3 shrink-0"
                    />
                </div>
                
                <div className="flex items-center justify-between w-full min-h-20 md:min-h-24 outline-white outline-10 md:outline-15 rounded-4xl bg-transparent">
                    <p className="w-full p-4 text-sm sm:text-base md:text-lg">
                        chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking?
                    </p>
                    <img
                        src="/flower_small_pink.svg"
                        className="w-14 sm:w-18 md:w-22 p-3 shrink-0"
                    />
                </div>

                <div className="flex items-center justify-between w-full min-h-20 md:min-h-24 outline-white outline-10 md:outline-15 rounded-4xl bg-transparent">
                    <p className="w-full p-4 text-sm sm:text-base md:text-lg">
                        chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking? chat are we cooking?
                    </p>
                    <img
                        src="/flower_small_pink.svg"
                        className="w-14 sm:w-18 md:w-22 p-3 shrink-0"
                    />
                </div>

            </div>
        </section>
    );
}