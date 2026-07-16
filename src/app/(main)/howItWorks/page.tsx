import Link from "next/link";
import {
    FiArrowRight,
    FiCheckCircle,
    FiFileText,
    FiMapPin,
    FiSearch,
    FiShield,
} from "react-icons/fi";

const STEPS = [
    {
        number: "01",
        icon: FiFileText,
        title: "Create a report",
        description:
            "Choose whether the item is lost or found, then add its title, category, description and image.",
    },
    {
        number: "02",
        icon: FiMapPin,
        title: "Add location details",
        description:
            "Provide the location and date so other people can quickly identify where the item was lost or found.",
    },
    {
        number: "03",
        icon: FiSearch,
        title: "Browse matching items",
        description:
            "Search through community reports by item name, category or location to find a possible match.",
    },
    {
        number: "04",
        icon: FiCheckCircle,
        title: "Recover the item",
        description:
            "When the item is returned to its owner, update the report status to recovered.",
    },
];

const HowItWorksPage = () => {
    return (
        <main className="bg-[#F7F3EA]">
            {/* Hero */}
            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                        Simple and community driven
                    </p>

                    <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#1F150C] md:text-6xl">
                        How FindBack works
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#786D62]">
                        FindBack makes it easier to report lost belongings,
                        share found items and reconnect them with their owners.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/items/add"
                            className="btn h-12 min-h-0 rounded-xl border-none bg-[#412D15] px-6 font-semibold text-white hover:bg-[#1F150C]"
                        >
                            Report an Item
                            <FiArrowRight />
                        </Link>

                        <Link
                            href="/items"
                            className="btn h-12 min-h-0 rounded-xl border border-[#CBBFA8] bg-white px-6 font-semibold text-[#412D15] hover:bg-[#EDE8DC]"
                        >
                            Browse Items
                        </Link>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="px-4 pb-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 md:grid-cols-2">
                        {STEPS.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm md:p-8"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE8DC]">
                                            <Icon className="text-xl text-[#412D15]" />
                                        </div>

                                        <span className="font-serif text-4xl font-semibold text-[#E1DCC9]">
                                            {step.number}
                                        </span>
                                    </div>

                                    <h2 className="mt-6 font-serif text-2xl font-semibold text-[#1F150C]">
                                        {step.title}
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-[#786D62]">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Safety */}
            <section className="px-4 pb-20">
                <div className="mx-auto max-w-7xl rounded-3xl bg-[#412D15] p-7 text-white md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                                <FiShield className="text-2xl" />
                            </div>

                            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#D8CFBC]">
                                Stay safe
                            </p>

                            <h2 className="mt-2 font-serif text-3xl font-semibold">
                                Protect your privacy when reconnecting
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#E1DCC9]">
                                Avoid sharing sensitive personal information publicly.
                                Verify item details before returning anything and meet
                                in a safe public place when necessary.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {[
                                "Do not publish passwords, card numbers or private documents.",
                                "Ask for identifying details before returning an item.",
                                "Use a public location for in-person exchanges.",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"
                                >
                                    <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-[#E1DCC9]" />

                                    <p className="text-sm leading-6 text-[#F7F3EA]">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-20">
                <div className="mx-auto max-w-4xl rounded-3xl border border-[#D8CFBC] bg-white p-8 text-center shadow-sm md:p-12">
                    <h2 className="font-serif text-3xl font-semibold text-[#1F150C]">
                        Ready to report an item?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#786D62]">
                        Add clear information and an image to improve the chance
                        of reconnecting the item with its owner.
                    </p>

                    <Link
                        href="/items/add"
                        className="btn mt-7 h-12 min-h-0 rounded-xl border-none bg-[#412D15] px-7 font-semibold text-white hover:bg-[#1F150C]"
                    >
                        Create Report
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default HowItWorksPage;