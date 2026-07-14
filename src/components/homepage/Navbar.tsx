"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
    FiLayout,
    FiLogIn,
    FiLogOut,
    FiMenu,
    FiUserPlus,
} from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Browse Items" },
    { href: "/items/add", label: "Report Item" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
];

const Navbar = () => {
    const { data: session } = authClient.useSession();

    const userData = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <header className="sticky top-0 z-50 px-4 pt-4">
            <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between rounded-2xl border border-[#D8CFBC] bg-[#F7F3EA]/90 px-5 shadow-lg backdrop-blur-xl md:px-7">
                {/* Left: mobile menu and logo */}
                <div className="flex items-center gap-2">
                    <div className="dropdown lg:hidden">
                        <button
                            tabIndex={0}
                            type="button"
                            aria-label="Open navigation menu"
                            className="btn btn-ghost h-10 min-h-0 w-10 rounded-xl p-0"
                        >
                            <FiMenu className="text-2xl text-[#1F150C]" />
                        </button>

                        <ul
                            tabIndex={-1}
                            className="menu dropdown-content z-50 mt-4 w-64 rounded-2xl border border-[#D8CFBC] bg-[#F7F3EA] p-3 text-[#1F150C] shadow-xl"
                        >
                            {NAV_LINKS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href}>{label}</Link>
                                </li>
                            ))}

                            <li className="my-2 border-t border-[#D8CFBC]" />

                            {userData ? (
                                <>
                                    <li>
                                        <div className="flex items-center gap-3">
                                            {userData.image ? (
                                                <Image
                                                    src={userData.image}
                                                    alt={userData.name}
                                                    width={36}
                                                    height={36}
                                                    unoptimized
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#412D15] font-semibold text-white">
                                                    {userData.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}

                                            <span className="font-medium">{userData.name}</span>
                                        </div>
                                    </li>

                                    <li>
                                        <Link href="/dashboard">
                                            <FiLayout />
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            type="button"
                                            className="flex w-full items-center gap-2 rounded-xl bg-[#412D15] px-3 py-3 font-semibold text-white hover:bg-[#1F150C]"
                                        >
                                            <FiLogOut className="text-lg" />
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/login">
                                            <FiLogIn />
                                            Log in
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/signup">
                                            <FiUserPlus />
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        aria-label="FindBack home"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F150C] text-[#E1DCC9]">
                            <HiOutlineMapPin className="text-2xl" />
                        </div>

                        <span className="font-serif text-2xl font-semibold text-[#1F150C] md:text-3xl">
                            FindBack
                        </span>
                    </Link>
                </div>

                {/* Center navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-2 font-medium text-[#1F150C]">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="block rounded-xl px-4 py-3 transition hover:bg-[#E1DCC9]/60"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {userData ? (
                        <>
                            <div className="hidden items-center gap-2 xl:flex">
                                {userData.image ? (
                                    <Image
                                        src={userData.image}
                                        alt={userData.name}
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="h-10 w-10 rounded-full border border-[#D8CFBC] object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#412D15] font-semibold text-white">
                                        {userData.name.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <span className="max-w-24 truncate font-semibold text-[#1F150C]">
                                    {userData.name}
                                </span>
                            </div>

                            <Link
                                href="/dashboard"
                                className="btn hidden h-11 min-h-0 rounded-xl border border-[#CBBFA8] bg-transparent px-4 font-semibold text-[#1F150C] hover:border-[#412D15] hover:bg-[#E1DCC9]/50 lg:inline-flex"
                            >
                                <FiLayout className="text-lg" />
                                Dashboard
                            </Link>

                            <button
                                onClick={handleSignOut}
                                type="button"
                                className="btn hidden h-12 min-h-0 rounded-xl border-none bg-[#412D15] px-6 font-semibold text-white hover:bg-[#1F150C] lg:inline-flex"
                            >
                                <FiLogOut className="text-lg" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="btn hidden h-11 min-h-0 rounded-xl border border-[#CBBFA8] bg-transparent px-5 font-semibold text-[#1F150C] hover:bg-[#E1DCC9]/50 sm:inline-flex"
                            >
                                <FiLogIn />
                                Log in
                            </Link>

                            <Link
                                href="/signup"
                                className="btn hidden h-11 min-h-0 rounded-xl border-none bg-[#412D15] px-5 font-semibold text-white hover:bg-[#1F150C] sm:inline-flex"
                            >
                                <FiUserPlus />
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;