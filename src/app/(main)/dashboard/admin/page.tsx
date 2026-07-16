import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    FiAlertCircle,
    FiCheckCircle,
    FiFileText,
    FiMapPin,
    FiUsers,
} from "react-icons/fi";

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    createdAt: string;
}

interface ReportItem {
    _id: string;
    title: string;
    category: string;
    location: string;
    date: string;
    type: "lost" | "found";
    status: "open" | "recovered";
    userEmail: string;
    createdAt: string;
}

interface DashboardData {
    totalUsers: number;
    totalItems: number;
    lostItems: number;
    foundItems: number;
    openItems: number;
    recoveredItems: number;
    recentItems: ReportItem[];
    recentUsers: AdminUser[];
}

interface SessionUserRole {
    role?: string;
}

const AdminDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user as
        typeof session.user & SessionUserRole;

    if (user.role !== "admin") {
        redirect("/dashboard/user");
    }

    const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${baseUrl}/api/admin/dashboard`,
        {
            cache: "no-store",
        },
    );

    const data: DashboardData = response.ok
        ? await response.json()
        : {
            totalUsers: 0,
            totalItems: 0,
            lostItems: 0,
            foundItems: 0,
            openItems: 0,
            recoveredItems: 0,
            recentItems: [],
            recentUsers: [],
        };

    const {
        totalUsers,
        totalItems,
        lostItems,
        foundItems,
        openItems,
        recoveredItems,
        recentItems,
        recentUsers,
    } = data;

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    Administration
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-sm text-[#786D62]">
                    View users, monitor submitted items and manage
                    platform activity.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8DC]">
                        <FiUsers className="text-xl text-[#412D15]" />
                    </div>

                    <p className="mt-5 text-sm text-[#786D62]">
                        Total Users
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {totalUsers}
                    </h2>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8DC]">
                        <FiFileText className="text-xl text-[#412D15]" />
                    </div>

                    <p className="mt-5 text-sm text-[#786D62]">
                        Total Items
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {totalItems}
                    </h2>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                        <FiAlertCircle className="text-xl text-orange-700" />
                    </div>

                    <p className="mt-5 text-sm text-[#786D62]">
                        Open Reports
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {openItems}
                    </h2>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiCheckCircle className="text-xl text-green-700" />
                    </div>

                    <p className="mt-5 text-sm text-[#786D62]">
                        Recovered Items
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {recoveredItems}
                    </h2>
                </div>
            </div>

            {/* Users and manage items */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                                Accounts
                            </p>

                            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#1F150C]">
                                Users
                            </h2>
                        </div>

                        <FiUsers className="text-2xl text-[#412D15]" />
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#786D62]">
                        View all registered FindBack users and their
                        account information.
                    </p>

                    <Link
                        href="/dashboard/admin/users"
                        className="btn mt-6 h-11 min-h-0 w-full rounded-xl border border-[#CBBFA8] bg-white text-[#412D15] hover:bg-[#F7F3EA]"
                    >
                        View All Users
                    </Link>
                </div>

                <div className="rounded-3xl bg-[#412D15] p-6 text-white shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#D8CFBC]">
                        Admin control
                    </p>

                    <h2 className="mt-2 font-serif text-2xl font-semibold">
                        Manage Items
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#E1DCC9]">
                        View all lost and found reports, check their
                        status and remove invalid items.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/10 p-4">
                            <p className="text-sm text-[#E1DCC9]">
                                Lost
                            </p>

                            <p className="mt-1 text-2xl font-semibold">
                                {lostItems}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-4">
                            <p className="text-sm text-[#E1DCC9]">
                                Found
                            </p>

                            <p className="mt-1 text-2xl font-semibold">
                                {foundItems}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/dashboard/admin/items"
                        className="btn mt-6 h-11 min-h-0 w-full rounded-xl border-none bg-white text-[#412D15] hover:bg-[#F7F3EA]"
                    >
                        Manage Items
                    </Link>
                </div>
            </div>

            {/* Recent items and users */}
            <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-serif text-2xl font-semibold text-[#1F150C]">
                                Recent Items
                            </h2>

                            <p className="mt-1 text-sm text-[#786D62]">
                                Recently submitted lost and found items.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/admin/items"
                            className="text-sm font-semibold text-[#412D15] hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="mt-6 divide-y divide-[#E7DFD1]">
                        {recentItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <h3 className="font-semibold text-[#1F150C]">
                                        {item.title}
                                    </h3>

                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#786D62]">
                                        <span>{item.category}</span>

                                        <span className="flex items-center gap-1">
                                            <FiMapPin />
                                            {item.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${item.type === "lost"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {item.type}
                                    </span>

                                    <span className="rounded-full bg-[#EDE8DC] px-3 py-1 text-xs font-semibold capitalize text-[#412D15]">
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-serif text-2xl font-semibold text-[#1F150C]">
                                Recent Users
                            </h2>

                            <p className="mt-1 text-sm text-[#786D62]">
                                Newly registered accounts.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/admin/users"
                            className="text-sm font-semibold text-[#412D15] hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="mt-6 space-y-4">
                        {recentUsers.map((currentUser) => (
                            <div
                                key={currentUser._id}
                                className="flex items-center gap-3 rounded-2xl border border-[#E7DFD1] bg-[#F7F3EA] p-4"
                            >
                                {currentUser.image ? (
                                    <Image
                                        src={currentUser.image}
                                        alt={currentUser.name}
                                        width={44}
                                        height={44}
                                        unoptimized
                                        className="h-11 w-11 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#412D15] font-semibold text-white">
                                        {currentUser.name
                                            ?.charAt(0)
                                            .toUpperCase() || "U"}
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-[#1F150C]">
                                        {currentUser.name}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-[#786D62]">
                                        {currentUser.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;