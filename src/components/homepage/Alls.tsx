import ItemCard from "@/components/ItemCard";
import Link from "next/link";
import {
    FiArrowRight,
    FiCheckCircle,
    FiFileText,
    FiMapPin,
    FiSearch,
} from "react-icons/fi";

interface ReportItem {
    _id: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
    image?: string;
    type: "lost" | "found";
    status: "open" | "returned";
    userEmail: string;
    createdAt: string;
}

const HomeOverview = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}/api/items`, {
        cache: "no-store",
    });

    const items: ReportItem[] = response.ok
        ? await response.json()
        : [];

    const totalItems = items.length;

    const lostItems = items.filter(
        (item) => item.type === "lost",
    ).length;

    const foundItems = items.filter(
        (item) => item.type === "found",
    ).length;

    const recoveredItems = items.filter(
        (item) => item.status === "returned",
    ).length;

    const recentItems = items.slice(0, 3);

    return (
        <section className="bg-[#F7F3EA] px-4 py-16 md:py-20">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                        FindBack community
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1F150C] md:text-5xl">
                        Helping lost items find their way home
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-[#786D62] md:text-base">
                        Explore recently reported items and see how the
                        FindBack community is helping people reconnect with
                        their belongings.
                    </p>
                </div>

                {/* Statistics */}
                <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8DC]">
                            <FiFileText className="text-xl text-[#412D15]" />
                        </div>

                        <p className="mt-4 text-3xl font-semibold text-[#1F150C]">
                            {totalItems}
                        </p>

                        <p className="mt-1 text-sm text-[#786D62]">
                            Total Reports
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                            <FiSearch className="text-xl text-red-600" />
                        </div>

                        <p className="mt-4 text-3xl font-semibold text-[#1F150C]">
                            {lostItems}
                        </p>

                        <p className="mt-1 text-sm text-[#786D62]">
                            Lost Items
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                            <FiMapPin className="text-xl text-green-700" />
                        </div>

                        <p className="mt-4 text-3xl font-semibold text-[#1F150C]">
                            {foundItems}
                        </p>

                        <p className="mt-1 text-sm text-[#786D62]">
                            Found Items
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                            <FiCheckCircle className="text-xl text-blue-700" />
                        </div>

                        <p className="mt-4 text-3xl font-semibold text-[#1F150C]">
                            {recoveredItems}
                        </p>

                        <p className="mt-1 text-sm text-[#786D62]">
                            Recovered Items
                        </p>
                    </div>
                </div>

                {/* Information banner */}
                <div className="mt-10 flex flex-col gap-6 rounded-3xl bg-[#412D15] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#D8CFBC]">
                            Lost or found something?
                        </p>

                        <h3 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                            Create a report and reach the community
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#E1DCC9]">
                            Add the item details, location and a clear image
                            to increase the chance of a successful recovery.
                        </p>
                    </div>

                    <Link
                        href="/items/add"
                        className="btn h-12 min-h-0 shrink-0 rounded-xl border-none bg-white px-6 font-semibold text-[#412D15] hover:bg-[#F7F3EA]"
                    >
                        Report an Item
                        <FiArrowRight />
                    </Link>
                </div>

                {/* Recent items heading */}
                <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                            Latest reports
                        </p>

                        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                            Recently Reported Items
                        </h2>

                        <p className="mt-2 text-sm text-[#786D62]">
                            Browse the latest lost and found reports from the
                            community.
                        </p>
                    </div>

                    <Link
                        href="/items"
                        className="hidden items-center gap-2 text-sm font-semibold text-[#412D15] hover:underline sm:flex"
                    >
                        View All Items
                        <FiArrowRight />
                    </Link>
                </div>

                {/* Same ItemCard component */}
                {recentItems.length === 0 ? (
                    <div className="mt-8 rounded-3xl border border-dashed border-[#CBBFA8] bg-white p-12 text-center">
                        <FiFileText className="mx-auto text-4xl text-[#A17C54]" />

                        <h3 className="mt-4 text-xl font-semibold text-[#1F150C]">
                            No items available
                        </h3>

                        <p className="mt-2 text-sm text-[#786D62]">
                            Recently submitted items will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {recentItems.map((item) => (
                            <ItemCard
                                key={item._id}
                                item={item}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-8 sm:hidden">
                    <Link
                        href="/items"
                        className="btn h-12 min-h-0 w-full rounded-xl border-none bg-[#412D15] font-semibold text-white hover:bg-[#1F150C]"
                    >
                        View All Items
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeOverview;