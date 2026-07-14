import Image from "next/image";
import Link from "next/link";

const userImages = [
    "https://i.pravatar.cc/100?img=12",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=47",
    "https://i.pravatar.cc/100?img=56",
];

const Banner = () => {
    return (
        <section className="mx-auto grid min-h-[72vh] w-[92%] max-w-7xl items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
            {/* Left content */}
            <div className="max-w-2xl">
                <h1 className="font-serif text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-[#1F150C] md:text-4xl lg:text-6xl">
                    Find what matters.
                    <br />
                    <span className="text-[#412D15]">Return with care.</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-[#685B4E] md:text-lg">
                    FindBack helps you report lost items or discover items others have
                    found. Together, we bring things — and people — back together.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/items/add"
                        className="rounded-xl bg-[#412D15] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#1F150C]"
                    >
                        Report a Lost Item
                    </Link>

                    <Link
                        href="/items"
                        className="rounded-xl border border-[#CBBFA8] bg-white/60 px-7 py-4 text-center font-semibold text-[#1F150C] transition hover:bg-[#E1DCC9]"
                    >
                        Browse Found Items
                    </Link>
                </div>

                {/* Trusted users */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <div className="flex -space-x-3">
                        {userImages.map((image, index) => (
                            <Image
                                key={image}
                                src={image}
                                alt={`FindBack community member ${index + 1}`}
                                width={44}
                                height={44}
                                className="h-11 w-11 rounded-full border-2 border-[#F7F3EA] object-cover"
                            />
                        ))}

                        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#F7F3EA] bg-[#1F150C] text-xs font-semibold text-white">
                            1K+
                        </div>
                    </div>

                    <p className="text-sm leading-5 text-[#685B4E]">
                        Trusted by 1,000+ people
                        <br />
                        to reunite lost items
                    </p>
                </div>
            </div>

            {/* Right visual */}
            <div className="relative mx-auto flex min-h-[460px] w-full max-w-2xl items-center justify-center lg:min-h-[560px]">
                {/* Taller rounded background */}
                <div className="absolute inset-x-4 top-0 bottom-0 rounded-[48%] bg-[#E1DCC9] sm:inset-x-8" />

                {/* Bigger main image */}
                <Image
                    src="/images/banner.png"
                    alt="Backpack, camera, wallet, keys and phone"
                    width={900}
                    height={760}
                    priority
                    className="relative z-10 h-auto w-[110%] max-w-none object-contain sm:w-full lg:w-[115%]"
                />

                {/* Floating card */}
                <div className="absolute right-0 bottom-4 z-20 w-56 rounded-2xl border border-[#DDD6C3] bg-white/90 p-5 shadow-[0_14px_40px_rgba(31,21,12,0.14)] backdrop-blur-md md:w-64">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-serif text-2xl font-semibold text-[#1F150C]">
                                Wallet found!
                            </h3>

                            <p className="mt-3 text-sm text-[#685B4E]">
                                📍 Dhanmondi, Dhaka
                            </p>

                            <p className="mt-2 text-sm text-[#685B4E]">
                                ◷ 2 hours ago
                            </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#412D15] text-lg text-white">
                            ✓
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;