'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FormEvent } from "react";


const LoginPage = () => {
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        interface RegisterData {

            email: string,
            password: string,

        }
        const userData: RegisterData = {

            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }


        const { data, error } = await authClient.signIn.email({

            email: userData?.email as string,
            password: userData?.password as string,
            callbackURL: "/dashboard",
        })

        console.log(data)
    };


    return (
        <main className="-mt-28 min-h-screen bg-[url('/images/logInbg.png')] bg-cover bg-center bg-no-repeat pt-28">
            <div className="mx-auto grid min-h-screen w-[90%] max-w-7xl items-center gap-10 py-10 lg:grid-cols-2">
                {/* Left content */}
                <div className="hidden lg:flex lg:justify-center">
                    <div className="max-w-xs rounded-3xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl">
                        <h1 className="font-serif text-5xl leading-tight font-semibold text-[#1F150C]">
                            Lost
                            <br />
                            something?
                        </h1>

                        <p className="mt-4 text-lg leading-7 font-medium text-[#2F2117]">
                            Find it. Report it.
                            <br />
                            Reunite.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EEDC] text-[#412D15] shadow-sm">
                                ✓
                            </div>

                            <p className="text-sm leading-6 font-medium text-[#3A2A1D]">
                                Helping 1,000+ people
                                <br />
                                recover lost items
                            </p>
                        </div>
                    </div>
                </div>

                {/* Login card */}
                <div className="mx-auto w-full max-w-md rounded-3xl border border-white/70 bg-white/20 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
                    {/* Brand */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#412D15] text-xl text-white shadow-md">
                            ⌕
                        </div>

                        <div>
                            <h2 className="font-serif text-3xl font-semibold text-[#1F150C]">
                                FindBack
                            </h2>

                            <p className="text-[10px] tracking-[0.22em] text-[#A17C54] uppercase">
                                Reuniting what matters
                            </p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <h1 className="font-serif text-4xl font-semibold text-[#1F150C]">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-[#786D62]">
                            Glad to see you again! Please log in to continue.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-[#332419]"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="h-12 w-full rounded-xl border border-white/70 bg-white/60 px-4 text-[#1F150C] outline-none placeholder:text-[#9A8F83] focus:border-[#412D15]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-[#412D15] font-semibold text-white transition hover:bg-[#1F150C]"
                        >
                            Log in
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
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-[#412D15] hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;