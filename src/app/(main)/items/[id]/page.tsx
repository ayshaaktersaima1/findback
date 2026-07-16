import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    FiArrowLeft,
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiMail,
    FiMapPin,
    FiTag,
} from "react-icons/fi";

interface ItemDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

interface ReportItem {
    _id: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
    image?: string;
    type: "lost" | "found";
    status: "open" | "recovered";
    userName?: string;
    userEmail: string;
    createdAt: string;
}

const ItemDetailsPage = async ({
    params,
}: ItemDetailsPageProps) => {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${baseUrl}/api/items/${id}`,
        {
            cache: "no-store",
        },
    );

    if (!response.ok) {
        notFound();
    }

    const item: ReportItem = await response.json();

    const reportedDate = new Date(
        item.createdAt,
    ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <main className="bg-[#F7F3EA] px-4 py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/items"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#412D15] transition hover:underline"
                >
                    <FiArrowLeft />
                    Back to Browse Items
                </Link>

                <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:items-start">
                    {/* Item image */}
                    <div className="overflow-hidden rounded-3xl border border-[#D8CFBC] bg-white shadow-sm">
                        <div className="relative min-h-80 w-full bg-[#EDE8DC] md:min-h-[560px]">
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    unoptimized
                                    priority
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex min-h-80 items-center justify-center text-sm text-[#786D62] md:min-h-[560px]">
                                    No image available
                                </div>
                            )}

                            <span
                                className={`absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-semibold capitalize ${item.type === "lost"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {item.type} item
                            </span>

                            <span
                                className={`absolute right-5 top-5 rounded-full px-4 py-2 text-sm font-semibold capitalize ${item.status === "recovered"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-white text-[#412D15]"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>

                    {/* Item details */}
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                            Item details
                        </p>

                        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#1F150C] md:text-5xl">
                            {item.title}
                        </h1>

                        <p className="mt-5 text-base leading-8 text-[#786D62]">
                            {item.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiTag className="text-lg text-[#412D15]" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Category
                                        </p>

                                        <p className="mt-1 font-semibold text-[#1F150C]">
                                            {item.category}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiMapPin className="text-lg text-[#412D15]" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Location
                                        </p>

                                        <p className="mt-1 font-semibold text-[#1F150C]">
                                            {item.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiCalendar className="text-lg text-[#412D15]" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Item Date
                                        </p>

                                        <p className="mt-1 font-semibold text-[#1F150C]">
                                            {item.date}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiClock className="text-lg text-[#412D15]" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Reported On
                                        </p>

                                        <p className="mt-1 font-semibold text-[#1F150C]">
                                            {reportedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reporter information */}
                        <div className="mt-6 rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                                Reported by
                            </p>

                            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#1F150C]">
                                {item.userName || "FindBack User"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#786D62]">
                                Contact the person who submitted this report if
                                you recognize the item or have helpful information.
                            </p>

                            <a
                                href={`mailto:${item.userEmail}?subject=${encodeURIComponent(
                                    `Regarding your FindBack report: ${item.title}`,
                                )}`}
                                className="btn mt-6 h-12 min-h-0 w-full rounded-xl border-none bg-[#412D15] px-6 font-semibold text-white hover:bg-[#1F150C] sm:w-auto"
                            >
                                <FiMail className="text-lg" />
                                Contact Reporter
                            </a>
                        </div>

                        {/* Status information */}
                        <div
                            className={`mt-6 rounded-3xl p-6 ${item.status === "recovered"
                                    ? "bg-green-100"
                                    : "bg-[#EDE8DC]"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.status === "recovered"
                                            ? "bg-green-200 text-green-800"
                                            : "bg-white text-[#412D15]"
                                        }`}
                                >
                                    <FiCheckCircle className="text-xl" />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#1F150C]">
                                        {item.status === "recovered"
                                            ? "This item has been recovered"
                                            : "This report is still open"}
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[#675C50]">
                                        {item.status === "recovered"
                                            ? "The item has already been returned or successfully recovered."
                                            : "The item has not yet been marked as recovered."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ItemDetailsPage;