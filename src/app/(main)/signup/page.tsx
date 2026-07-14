'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FormEvent } from "react";

const RegisterPage = () => {

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        interface RegisterData {
            name: string,
            email: string,
            password: string,
            image: string | undefined,
        }
        const userData: RegisterData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            image: formData.get("image") as string,
            password: formData.get("password") as string,
        }
        // console.log(userData)

        const { data, error } = await authClient.signUp.email({
            email: userData?.email,
            name: userData?.name,  // user email address
            password: userData?.password, // user password -> min 8 characters by default
            // user display name
            image: userData?.image, // User image URL (optional)
            callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        })

        console.log(data?.user)
    };
    return (
        <main className="-mt-28 min-h-screen bg-[url('/images/logInbg.png')] bg-cover bg-center bg-no-repeat pt-28">
            <div className="mx-auto grid min-h-screen w-[90%] max-w-7xl items-center gap-10 py-10 lg:grid-cols-2">
                {/* Left content */}
                <div className="hidden lg:flex lg:justify-center">
                    <div className="max-w-xs rounded-3xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl">
                        <h1 className="font-serif text-5xl leading-tight font-semibold text-[#1F150C]">
                            Join the
                            <br />
                            community.
                        </h1>

                        <p className="mt-4 text-lg leading-7 font-medium text-[#2F2117]">
                            Report lost items.
                            <br />
                            Help others find theirs.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EEDC] text-[#412D15] shadow-sm">
                                ✓
                            </div>

                            <p className="text-sm leading-6 font-medium text-[#3A2A1D]">
                                Create an account and start
                                <br />
                                reconnecting people with items
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registration card */}
                <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/70 bg-white/20 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
                    {/* Brand */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#412D15] text-xl text-white shadow-md">
                            ⌕
                        </div>

                        <div>
                            <h2 className="font-serif text-3xl font-semibold text-[#1F150C]">
                                FindBack
                            </h2>

                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A17C54]">
                                Reuniting what matters
                            </p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <h1 className="font-serif text-4xl font-semibold text-[#1F150C]">
                            Create an account
                        </h1>

                        <p className="mt-2 text-sm text-[#786D62]">
                            Join FindBack and help items return to their owners.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-[#332419]"
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Enter your full name"
                                className="h-12 w-full rounded-xl border border-white/70 bg-white/60 px-4 text-[#1F150C] outline-none placeholder:text-[#9A8F83] focus:border-[#412D15]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-[#332419]"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="h-12 w-full rounded-xl border border-white/70 bg-white/60 px-4 text-[#1F150C] outline-none placeholder:text-[#9A8F83] focus:border-[#412D15]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="image"
                                className="mb-2 block text-sm font-medium text-[#332419]"
                            >
                                Profile image URL
                                <span className="ml-1 font-normal text-[#786D62]">
                                    (optional)
                                </span>
                            </label>

                            <input
                                id="image"
                                name="image"
                                type="url"
                                placeholder="https://example.com/profile.jpg"
                                className="h-12 w-full rounded-xl border border-white/70 bg-white/60 px-4 text-[#1F150C] outline-none placeholder:text-[#9A8F83] focus:border-[#412D15]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-[#332419]"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Create a password"
                                className="h-12 w-full rounded-xl border border-white/70 bg-white/60 px-4 text-[#1F150C] outline-none placeholder:text-[#9A8F83] focus:border-[#412D15]"
                            />
                        </div>

                        <p className="text-xs leading-5 text-[#675C50]">
                            Password should contain at least 6 characters, including an
                            uppercase and lowercase letter.
                        </p>

                        <button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-[#412D15] font-semibold text-white transition hover:bg-[#1F150C]"
                        >
                            Create account
                        </button>

                        <div className="flex items-center gap-4">
                            <span className="h-px flex-1 bg-[#CFC4B6]" />
                            <span className="text-sm text-[#83776C]">or</span>
                            <span className="h-px flex-1 bg-[#CFC4B6]" />
                        </div>

                        <button
                            type="button"
                            className="h-12 w-full rounded-xl border border-white/70 bg-white/70 font-semibold text-[#1F150C] transition hover:bg-white"
                        >
                            Continue with Google
                        </button>
                    </form>

                    <p className="mt-5 text-center text-sm text-[#72675D]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#412D15] hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;