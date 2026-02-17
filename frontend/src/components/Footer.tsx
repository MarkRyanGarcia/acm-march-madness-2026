import type React from "react";

export const Footer: React.FC = () => {
    return (
        <div className="relative z-10 pt-32 md:pt-40 lg:pt-48 pb-6">
            <img src="/dirt.svg" className="w-full absolute bottom-0" />

            <img
                src="/plant.svg"
                className="absolute left-0 bottom-16 md:bottom-20 lg:bottom-24 w-15 sm:w-25 md:w-30 lg:w-40"
            />

            <img
                src="/worm.svg"
                className="absolute right-5 sm:right-15 bottom-20 sm:bottom-40 md:bottom-60 lg:bottom-80 w-25 sm:w-35 md:w-40 lg:w-55"
            />

            <p className="relative z-10 text-center text-white font-[Fredoka] font-bold text-xs md:text-lg">
                © 2026 ACM at California State University, Fullerton. All rights reserved.
            </p>
        </div>
    );
};