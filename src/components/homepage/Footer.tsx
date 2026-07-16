"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiFacebook,
    FiGithub,
    FiInstagram,
    FiMail,
} from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";

const Footer = () => {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <footer className="mt-16 bg-[#1F150C] text-[#F7F3EA]">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                {/* Brand */}
                <div>
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E1DCC9] text-[#1F150C]">
                            <HiOutlineMapPin className="text-2xl" />
                        </div>

                        <span className="font-serif text-3xl font-semibold">
                            FindBack
                        </span>
                    </Link>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-[#D8CFBC]">
                        A trusted lost and found platform that helps people
                        report missing items, share found belongings and
                        reconnect them with their owners.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#1F150C]"
                        >
                            <FiFacebook />
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#1F150C]"
                        >
                            <FiInstagram />
                        </a>

                        <a
                            href="#"
                            aria-label="GitHub"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#1F150C]"
                        >
                            <FiGithub />
                        </a>

                        <a
                            href="mailto:support@findback.com"
                            aria-label="Email"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#1F150C]"
                        >
                            <FiMail />
                        </a>
                    </div>
                </div>

                {/* Explore */}
                <nav>
                    <h6 className="font-serif text-xl font-semibold">
                        Explore
                    </h6>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-[#D8CFBC]">
                        <Link
                            href="/items"
                            className="w-fit transition hover:text-white"
                        >
                            Browse Items
                        </Link>

                        <Link
                            href="/items/add"
                            className="w-fit transition hover:text-white"
                        >
                            Report an Item
                        </Link>

                        <Link
                            href="/howItWorks"
                            className="w-fit transition hover:text-white"
                        >
                            How It Works
                        </Link>

                        <Link
                            href="/about"
                            className="w-fit transition hover:text-white"
                        >
                            About FindBack
                        </Link>
                    </div>
                </nav>

                {/* Account */}
                <nav>
                    <h6 className="font-serif text-xl font-semibold">
                        Account
                    </h6>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-[#D8CFBC]">
                        <Link
                            href="/login"
                            className="w-fit transition hover:text-white"
                        >
                            Log In
                        </Link>

                        <Link
                            href="/signup"
                            className="w-fit transition hover:text-white"
                        >
                            Create Account
                        </Link>

                        <Link
                            href="/dashboard"
                            className="w-fit transition hover:text-white"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/dashboard/user/my-reports"
                            className="w-fit transition hover:text-white"
                        >
                            My Reports
                        </Link>
                    </div>
                </nav>

                {/* Help */}
                <nav>
                    <h6 className="font-serif text-xl font-semibold">
                        Help & Safety
                    </h6>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-[#D8CFBC]">
                        <Link
                            href="/contact"
                            className="w-fit transition hover:text-white"
                        >
                            Contact Us
                        </Link>

                        <Link
                            href="/safety"
                            className="w-fit transition hover:text-white"
                        >
                            Safety Guidelines
                        </Link>

                        <Link
                            href="/privacy"
                            className="w-fit transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="w-fit transition hover:text-white"
                        >
                            Terms of Use
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Bottom section */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-[#BDB3A6] sm:flex-row sm:items-center sm:justify-between lg:px-8">
                    <p>
                        © {new Date().getFullYear()} FindBack. All rights
                        reserved.
                    </p>

                    <p>Find it. Report it. Reunite.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;