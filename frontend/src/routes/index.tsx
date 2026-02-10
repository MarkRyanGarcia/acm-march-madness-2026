import type React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import { StrokedText } from "@/components/StrokedText";
import { useSignIn } from "@clerk/clerk-react";

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
    const { signIn, isLoaded } = useSignIn();

    const handleSignIn = () => {
        if (!isLoaded) return;

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
                    <button
                        onClick={handleSignIn}
                        className="flex items-center gap-2 py-2 px-6 rounded-xl bg-white max-w-max font-semibold text-xl"
                    >
                        Sign In With GitHub <FaGithub />
                    </button>
                </div>

                <div className="-z-10">
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
                        className="absolute left-0 top-50 md:top-85 w-24 sm:w-32 md:w-40 lg:w-48"
                    />
                </div>
            </main>

            <div className="relative -z-10">
                <img src="/grass2.svg" className="w-full absolute md:-top-24" />
                <img src="/grass1.svg" className="w-full absolute md:-top-24" />
                <img
                    src="/capybara.svg"
                    className="absolute right-12 md:right-24 md:-top-24 xl:-top-32 w-16 md:w-24"
                />
            </div>
        </div>
    );
}