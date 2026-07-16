import AdminItemCard from "@/components/AdminItemCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    FiCheckCircle,
    FiFileText,
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

interface SessionUserRole {
    role?: string;
}

const ManageItemsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const sessionUser = session.user as
        typeof session.user & SessionUserRole;

    if (sessionUser.role !== "admin") {
        redirect("/dashboard/user");
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}/api/items`, {
        cache: "no-store",
    });

    const items: ReportItem[] = response.ok
        ? await response.json()
        : [];

    const openItems = items.filter(
        (item) => item.status === "open",
    ).length;

    const recoveredItems = items.filter(
        (item) => item.status === "recovered",
    ).length;

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    Item control
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                    Manage Items
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#786D62]">
                    View all submitted lost and found items and remove
                    invalid reports.
                </p>
            </div>

            <div className="mb-8 grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8DC]">
                        <FiFileText className="text-xl text-[#412D15]" />
                    </div>

                    <p className="mt-4 text-sm text-[#786D62]">
                        Total Items
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {items.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                        <FiSearch className="text-xl text-orange-700" />
                    </div>

                    <p className="mt-4 text-sm text-[#786D62]">
                        Open Items
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {openItems}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                        <FiCheckCircle className="text-xl text-green-700" />
                    </div>

                    <p className="mt-4 text-sm text-[#786D62]">
                        Recovered Items
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {recoveredItems}
                    </p>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#CBBFA8] bg-white p-12 text-center">
                    <FiFileText className="mx-auto text-4xl text-[#A17C54]" />

                    <h2 className="mt-4 text-xl font-semibold text-[#1F150C]">
                        No items found
                    </h2>

                    <p className="mt-2 text-sm text-[#786D62]">
                        Submitted items will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <AdminItemCard
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageItemsPage;