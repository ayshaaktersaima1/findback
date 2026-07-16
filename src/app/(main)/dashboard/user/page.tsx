import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    FiCheckCircle,
    FiFileText,
    FiMapPin,
    FiPlusCircle,
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
    status: "open" | "recovered";
    userEmail: string;
    createdAt: string;
}

const UserDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const userEmail = session.user.email;
    const userName = session.user.name;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${baseUrl}/api/my-items/${encodeURIComponent(userEmail)}`,
        {
            cache: "no-store",
        },
    );

    const items: ReportItem[] = response.ok
        ? await response.json()
        : [];

    const totalReports = items.length;

    const lostReports = items.filter(
        (item) => item.type === "lost",
    ).length;

    const foundReports = items.filter(
        (item) => item.type === "found",
    ).length;

    const recoveredItems = items.filter(
        (item) => item.status === "recovered",
    ).length;

    const recentReports = items.slice(0, 3);

    return (
        <div>
            {/* Welcome section */}
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    User Dashboard
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                    Welcome back, {userName}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#786D62]">
                    Here is a quick overview of your lost and found
                    activity.
                </p>
            </div>

            {/* Statistics cards */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8DC]">
                        <FiFileText className="text-xl text-[#412D15]" />
                    </div>

                    <p className="mt-5 text-sm font-medium text-[#786D62]">
                        Total Reports
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {totalReports}
                    </h2>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                        <FiSearch className="text-xl text-red-600" />
                    </div>

                    <p className="mt-5 text-sm font-medium text-[#786D62]">
                        Lost Reports
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {lostReports}
                    </h2>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiMapPin className="text-xl text-green-700" />
                    </div>

                    <p className="mt-5 text-sm font-medium text-[#786D62]">
                        Found Reports
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {foundReports}
                    </h2>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                        <FiCheckCircle className="text-xl text-blue-700" />
                    </div>

                    <p className="mt-5 text-sm font-medium text-[#786D62]">
                        Recovered Items
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {recoveredItems}
                    </h2>
                </div>
            </div>

            {/* Quick actions */}
            <div className="mt-8 rounded-3xl bg-[#412D15] p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#D8CFBC]">
                            Quick action
                        </p>

                        <h2 className="mt-2 font-serif text-2xl font-semibold text-white md:text-3xl">
                            Report a lost or found item
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#E1DCC9]">
                            Submit an item report and help reconnect lost
                            belongings with their owners.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/items/add"
                            className="btn h-11 min-h-0 rounded-xl border-none bg-white px-5 font-semibold text-[#412D15] hover:bg-[#F7F3EA]"
                        >
                            <FiPlusCircle className="text-lg" />
                            Report Item
                        </Link>

                        <Link
                            href="/dashboard/user/my-reports"
                            className="btn h-11 min-h-0 rounded-xl border border-[#E1DCC9] bg-transparent px-5 font-semibold text-white hover:bg-white/10"
                        >
                            View My Reports
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent reports */}
            <div className="mt-8 rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm md:p-7">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="font-serif text-2xl font-semibold text-[#1F150C]">
                            Recent Reports
                        </h2>

                        <p className="mt-1 text-sm text-[#786D62]">
                            Your latest submitted item reports.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/user/my-reports"
                        className="text-sm font-semibold text-[#412D15] hover:underline"
                    >
                        View all
                    </Link>
                </div>

                {recentReports.length === 0 ? (
                    <div className="mt-6 rounded-2xl border border-dashed border-[#CBBFA8] bg-[#F7F3EA] p-10 text-center">
                        <h3 className="font-semibold text-[#1F150C]">
                            No reports yet
                        </h3>

                        <p className="mt-2 text-sm text-[#786D62]">
                            Your latest reports will appear here.
                        </p>

                        <Link
                            href="/items/add"
                            className="btn mt-5 h-11 min-h-0 rounded-xl border-none bg-[#412D15] px-5 text-white hover:bg-[#1F150C]"
                        >
                            <FiPlusCircle />
                            Create Report
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 divide-y divide-[#E7DFD1]">
                        {recentReports.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="truncate font-semibold text-[#1F150C]">
                                            {item.title}
                                        </h3>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${item.type === "lost"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {item.type}
                                        </span>
                                    </div>

                                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#786D62]">
                                        <span>{item.category}</span>

                                        <span className="flex items-center gap-1">
                                            <FiMapPin />
                                            {item.location}
                                        </span>

                                        <span>{item.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${item.status === "recovered"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-[#EDE8DC] text-[#412D15]"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                    <Link
                                        href={`/dashboard/user/my-reports/edit/${item._id}`}
                                        className="btn h-10 min-h-0 rounded-xl border border-[#CBBFA8] bg-white px-4 text-[#412D15] hover:bg-[#F7F3EA]"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboardPage;