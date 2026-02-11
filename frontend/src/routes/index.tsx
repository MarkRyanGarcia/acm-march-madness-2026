import type React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import { StrokedText } from "@/components/StrokedText";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { Footer } from "@/components/Footer";
import FAQ from "@/components/FAQ";

export const Route = createFileRoute("/")({
    component: LandingPage,
});

const Hero: React.FC = () => {
    const sizeClasses = "text-5xl md:text-8xl tracking-wider";

    return (
        <div className="max-w-max mx-auto px-4 mt-12 md:mt-50 font-[Fredoka]">
            <h1 className="font-extrabold text-center">
                <StrokedText text="MARCH MADNESS" className={sizeClasses} />
                <span className="block mt-2">
                    <StrokedText text="2026" className="text-5xl md:text-8xl" />
                </span>
            </h1>
        </div>
    );
};

function LandingPage() {
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { isSignedIn, isLoaded: userLoaded } = useUser();

    const handleSignIn = () => {
        if (!signInLoaded) return;

        signIn?.authenticateWithRedirect({
            strategy: "oauth_github",
            redirectUrl: "/signin/sso-callback",
            redirectUrlComplete: "/team",
        });
    };

    return (
        <div>
            <main className="max-w-5xl mx-auto grid items-center justify-center gap-8 md:gap-16">
                <Hero />

                <p className="px-8 text-center text-grass-400 font-[Fredoka] font-bold md:text-2xl">
                    A 5-day coding challenge event hosted by ACM at California State
                    University, Fullerton! Collaborate in teams and put your
                    problem-solving skills to the test to see if you shall become the
                    best!
                </p>

                <div className="flex items-center justify-center">
                    {userLoaded && !isSignedIn && (
                        <button
                            onClick={handleSignIn}
                            className="flex items-center gap-2 py-2 px-6 rounded-xl bg-white max-w-max font-semibold text-xl"
                        >
                            Sign In With GitHub <FaGithub />
                        </button>
                    )}
                </div>

                <div className="-z-10 pointer-events-none">
                    <img
                        src="/cloud1.svg"
                        className="absolute right-0 sm:right-40 top-10 md:top-10 w-55 md:w-120 lg:w-150"
                    />
                    <img
                        src="/cloud2.svg"
                        className="absolute left-5 md:left-10 top-30 md:top-35 w-35 md:w-60 lg:w-80"
                    />
                    <img
                        src="/hibiscus1.svg"
                        className="absolute right-0 top-0 md:top-10 w-24 sm:w-32 md:w-40 lg:w-48"
                    />
                    <img
                        src="/orchid1.svg"
                        className="absolute left-0 top-35 md:top-85 w-24 sm:w-32 md:w-40 lg:w-48"
                    />
                </div>
            </main>

            <div className="relative z-10 mb-25 sm:mb-60 pointer-events-none">
                <img src="/grass2.svg" className="w-full absolute md:-top-24" />
                <img src="/grass1.svg" className="w-full absolute md:-top-24" />
                <img
                    src="/capybara.svg"
                    className="absolute right-10 lg:right-40 top-15 sm:top-20 md:top-10 lg:top-15 w-32 sm:w-50 md:w-80 lg:w-100"
                />
                <img
                    src="/orange_flower.svg"
                    className="absolute left-5 -top-20 md:-top-25 w-28 sm:w-50 md:w-67 lg:w-90"
                />
                <img
                    src="/particle1.svg"
                    className="absolute left-20 top-30 w-4 sm:left-45 sm:top-58 sm:w-8 md:left-60 md:top-60 md:w-12 lg:left-80 lg:top-100 lg:w-15"
                />
                <img
                    src="/particle2.svg"
                    className="absolute left-24 top-34 w-1 sm:left-52 sm:top-67 sm:w-2 md:left-75 md:top-70 md:w-3 lg:left-95 lg:top-115 lg:w-4"
                />
            </div>
            <div className="relative h-[240vh] bg-grass-100 -mb-10 pt-120 w-full">
                    <FAQ />
                <img
                    src="/fence.svg"
                    className="absolute mt-80 w-120 pointer-events-none"
                />
                <img
                    src="/fence.svg"
                    className="absolute right-0 mt-80 w-120 scale-x-[-1] pointer-events-none"
                />
            </div>
            <Footer />
            
        </div>
    );
}
