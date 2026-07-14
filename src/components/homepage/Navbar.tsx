import Link from "next/link";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
            <div className="navbar mx-auto min-h-16 w-full md:w-[95%] rounded-2xl border border-[#D8CFBC]/70 bg-[#F7F3EA]/75 px-4 py-3 shadow-[0_10px_35px_rgba(31,21,12,0.08)] backdrop-blur-xl md:px-6 lg:py-4">
                {/* Left side */}
                <div className="navbar-start">
                    {/* Mobile dropdown */}
                    <div className="dropdown">
                        <button
                            tabIndex={0}
                            type="button"
                            aria-label="Open navigation menu"
                            className="btn btn-ghost mr-2 px-2 lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#1F150C]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <ul
                            tabIndex={-1}
                            className="menu dropdown-content z-50 mt-3 w-64 rounded-2xl border border-[#D8CFBC] bg-[#F7F3EA]/95 p-3 text-[#1F150C] shadow-xl backdrop-blur-xl"
                        >
                            <li>
                                <Link href="/">Home</Link>
                            </li>

                            <li>
                                <Link href="/items">Browse Items</Link>
                            </li>

                            <li>
                                <Link href="/items/add">Report Item</Link>
                            </li>

                            <li>
                                <Link href="/how-it-works">How It Works</Link>
                            </li>

                            <li>
                                <Link href="/about">About</Link>
                            </li>

                            <div className="my-2 border-t border-[#D8CFBC]" />

                            <li>
                                <Link href="/login">Log in</Link>
                            </li>

                            <li>
                                <Link
                                    href="/register"
                                    className="mt-1 justify-center bg-[#412D15] text-white hover:bg-[#1F150C]"
                                >
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                        aria-label="FindBack home"
                    >
                        <svg
                            viewBox="0 0 48 48"
                            className="h-9 w-9 lg:h-10 lg:w-10"
                            aria-hidden="true"
                        >
                            <path
                                fill="#1F150C"
                                d="M24 2C13.5 2 5 10.5 5 21c0 13.5 19 25 19 25s19-11.5 19-25C43 10.5 34.5 2 24 2Z"
                            />

                            <circle cx="24" cy="21" r="8" fill="#E1DCC9" />

                            <circle cx="24" cy="21" r="3.5" fill="#412D15" />
                        </svg>

                        <span className="font-serif text-2xl font-semibold tracking-[-0.03em] text-[#1F150C] lg:text-3xl">
                            FindBack
                        </span>
                    </Link>
                </div>

                {/* Center links */}
                <nav className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-1 p-0 text-sm font-medium text-[#1F150C] lg:text-lg">
                        <li>
                            <Link
                                href="/"
                                className="rounded-lg px-4 py-3 hover:bg-[#E1DCC9]/60 lg:px-5"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/items"
                                className="rounded-lg px-4 py-3 hover:bg-[#E1DCC9]/60 lg:px-5"
                            >
                                Browse Items
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/items/add"
                                className="rounded-lg px-4 py-3 hover:bg-[#E1DCC9]/60 lg:px-5"
                            >
                                Report Item
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/how-it-works"
                                className="rounded-lg px-4 py-3 hover:bg-[#E1DCC9]/60 lg:px-5"
                            >
                                How It Works
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/about"
                                className="rounded-lg px-4 py-3 hover:bg-[#E1DCC9]/60 lg:px-5"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Right side */}
                <div className="navbar-end gap-2">
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="btn btn-ghost hidden h-10 min-h-0 w-10 rounded-xl p-0 text-[#1F150C] sm:flex lg:h-12 lg:w-12"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 lg:h-6 lg:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.311 6.022 23.848 23.848 0 0 0 5.454 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                    </button>

                    <Link
                        href="/login"
                        className="btn hidden h-10 min-h-0 rounded-xl border border-[#CBBFA8] bg-transparent px-5 text-sm font-semibold text-[#1F150C] shadow-none hover:border-[#412D15] hover:bg-[#E1DCC9]/50 sm:inline-flex lg:h-12 lg:px-6 lg:text-base"
                    >
                        Log in
                    </Link>

                    <Link
                        href="/register"
                        className="btn hidden h-10 min-h-0 rounded-xl border-none bg-[#412D15] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#1F150C] sm:inline-flex lg:h-12 lg:px-7 lg:text-base"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;