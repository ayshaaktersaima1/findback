import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
    FiCalendar,
    FiMail,
    FiShield,
    FiUsers,
} from "react-icons/fi";

interface UserData {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    isBlocked?: boolean;
    createdAt: string;
}

interface SessionUserRole {
    role?: string;
}

const UsersPage = async () => {
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

    const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${baseUrl}/api/admin/users`,
        {
            cache: "no-store",
        },
    );

    const users: UserData[] = response.ok
        ? await response.json()
        : [];

    return (
        <div>
            {/* Heading */}
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    Accounts
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                    Users
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#786D62]">
                    View all registered FindBack users and their account
                    information.
                </p>
            </div>

            {/* Total users */}
            <div className="mb-7 flex items-center justify-between rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                <div>
                    <p className="text-sm font-medium text-[#786D62]">
                        Total Users
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-[#1F150C]">
                        {users.length}
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE8DC]">
                    <FiUsers className="text-2xl text-[#412D15]" />
                </div>
            </div>

            {users.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#CBBFA8] bg-white p-12 text-center">
                    <FiUsers className="mx-auto text-4xl text-[#A17C54]" />

                    <h2 className="mt-4 text-xl font-semibold text-[#1F150C]">
                        No users found
                    </h2>

                    <p className="mt-2 text-sm text-[#786D62]">
                        Registered users will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {users.map((user) => {
                        const joinedDate = new Date(
                            user.createdAt,
                        ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        });

                        return (
                            <div
                                key={user._id}
                                className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name}
                                            width={56}
                                            height={56}
                                            unoptimized
                                            className="h-14 w-14 shrink-0 rounded-full border border-[#D8CFBC] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#412D15] text-xl font-semibold text-white">
                                            {user.name
                                                ?.charAt(0)
                                                .toUpperCase() || "U"}
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <h2 className="truncate text-lg font-semibold text-[#1F150C]">
                                            {user.name}
                                        </h2>

                                        <p className="mt-1 truncate text-sm text-[#786D62]">
                                            {user.email}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isBlocked
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {user.isBlocked
                                            ? "Blocked"
                                            : "Active"}
                                    </span>
                                </div>

                                <div className="mt-6 space-y-3 border-t border-[#E7DFD1] pt-5">
                                    <div className="flex items-center gap-3 text-sm">
                                        <FiMail className="shrink-0 text-[#412D15]" />

                                        <div className="min-w-0">
                                            <p className="text-xs text-[#A17C54]">
                                                Email
                                            </p>

                                            <p className="truncate font-medium text-[#1F150C]">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <FiShield className="shrink-0 text-[#412D15]" />

                                        <div>
                                            <p className="text-xs text-[#A17C54]">
                                                Role
                                            </p>

                                            <p className="font-medium capitalize text-[#1F150C]">
                                                {user.role || "user"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <FiCalendar className="shrink-0 text-[#412D15]" />

                                        <div>
                                            <p className="text-xs text-[#A17C54]">
                                                Joined
                                            </p>

                                            <p className="font-medium text-[#1F150C]">
                                                {joinedDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UsersPage;