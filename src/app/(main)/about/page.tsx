import Link from "next/link";
import {
    FiArrowRight,
    FiCheckCircle,
    FiHeart,
    FiSearch,
    FiShield,
    FiUsers,
} from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";

const VALUES = [
    {
        icon: FiHeart,
        title: "Community",
        description:
            "FindBack brings people together to help lost belongings return to the right owner.",
    },
    {
        icon: FiShield,
        title: "Trust",
        description:
            "Clear reports, responsible sharing and safe communication create a more reliable experience.",
    },
    {
        icon: FiSearch,
        title: "Simplicity",
        description:
            "Reporting and browsing items should be quick, clear and easy for everyone.",
    },
];

const AboutPage = () => {
    return (
        <main className="bg-[#F7F3EA]">
            {/* Hero */}
            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                                About FindBack
                            </p>

                            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#1F150C] md:text-6xl">
                                Helping people reconnect with what matters
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-[#786D62]">
                                FindBack is a community-based lost and found platform
                                where people can report missing belongings, share
                                found items and help return them to their owners.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/items"
                                    className="btn h-12 min-h-0 rounded-xl border-none bg-[#412D15] px-6 font-semibold text-white hover:bg-[#1F150C]"
                                >
                                    Browse Items
                                    <FiArrowRight />
                                </Link>

                                <Link
                                    href="/items/add"
                                    className="btn h-12 min-h-0 rounded-xl border border-[#CBBFA8] bg-white px-6 font-semibold text-[#412D15] hover:bg-[#EDE8DC]"
                                >
                                    Report an Item
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-[#412D15] p-8 text-white md:p-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E1DCC9] text-[#1F150C]">
                                <HiOutlineMapPin className="text-3xl" />
                            </div>

                            <h2 className="mt-6 font-serif text-3xl font-semibold">
                                Find it. Report it. Reunite.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#E1DCC9]">
                                Our goal is to create one trusted place where lost
                                and found information can be shared clearly and
                                quickly.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Report lost and found belongings",
                                    "Search reports by title and location",
                                    "Manage personal reports",
                                    "Update recovered item status",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
                                    >
                                        <FiCheckCircle className="shrink-0 text-[#E1DCC9]" />
                                        <p className="text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="px-4 pb-20">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="rounded-3xl border border-[#D8CFBC] bg-white p-7 shadow-sm md:p-9">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE8DC]">
                            <FiUsers className="text-2xl text-[#412D15]" />
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                            Our mission
                        </p>

                        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C]">
                            Make recovery easier
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#786D62]">
                            Losing something important can be stressful. FindBack
                            reduces that stress by giving communities a structured
                            place to publish and discover lost and found reports.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-[#D8CFBC] bg-[#EDE8DC] p-7 md:p-9">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                            Why FindBack
                        </p>

                        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C]">
                            Built for clear and responsible reporting
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {[
                                "Simple lost and found report forms",
                                "Location-based item information",
                                "Personal report management",
                                "Clear open and recovered statuses",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-2xl bg-white p-4"
                                >
                                    <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-[#412D15]" />

                                    <p className="text-sm font-medium leading-6 text-[#1F150C]">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="px-4 pb-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                            Our values
                        </p>

                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                            What guides FindBack
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-[#786D62]">
                            The platform is designed around community support,
                            trust and an easy reporting experience.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {VALUES.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="rounded-3xl border border-[#D8CFBC] bg-white p-7 shadow-sm"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE8DC]">
                                        <Icon className="text-xl text-[#412D15]" />
                                    </div>

                                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#1F150C]">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#786D62]">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-20">
                <div className="mx-auto max-w-5xl rounded-3xl bg-[#412D15] p-8 text-center text-white md:p-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#D8CFBC]">
                        Join the community
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
                        Help an item find its way home
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#E1DCC9]">
                        Report what you lost, share what you found and help
                        someone reconnect with their belongings.
                    </p>

                    <Link
                        href="/items/add"
                        className="btn mt-7 h-12 min-h-0 rounded-xl border-none bg-white px-7 font-semibold text-[#412D15] hover:bg-[#F7F3EA]"
                    >
                        Report an Item
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;