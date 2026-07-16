import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    FiCalendar,
    FiEdit,
    FiFileText,
    FiMail,
    FiShield,
    FiUser,
} from "react-icons/fi";

interface SessionUserRole {
    role?: string;
}

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user as typeof session.user &
        SessionUserRole;

    const userRole =
        user.role?.toLowerCase() === "admin"
            ? "Admin"
            : "User";

    const joinedDate = new Date(
        user.createdAt,
    ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="mx-auto max-w-5xl">
            {/* Page heading */}
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    Account
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#1F150C] md:text-4xl">
                    My Profile
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#786D62]">
                    View your personal information and FindBack account
                    details.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                {/* Profile card */}
                <div className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={120}
                                height={120}
                                unoptimized
                                className="h-28 w-28 rounded-full border-4 border-[#EDE8DC] object-cover"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#EDE8DC] bg-[#412D15] text-4xl font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <h2 className="mt-5 font-serif text-2xl font-semibold text-[#1F150C]">
                            {user.name}
                        </h2>

                        <p className="mt-1 text-sm text-[#786D62]">
                            {user.email}
                        </p>

                        <span className="mt-4 rounded-full bg-[#EDE8DC] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#412D15]">
                            {userRole}
                        </span>
                    </div>

                    <div className="mt-6 border-t border-[#E7DFD1] pt-6">
                        <Link
                            href="/dashboard/user/my-reports"
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#412D15] text-sm font-semibold text-white transition hover:bg-[#1F150C]"
                        >
                            <FiFileText />
                            View My Reports
                        </Link>
                    </div>
                </div>

                {/* Profile information */}
                <div className="space-y-6">
                    <div className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm md:p-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="font-serif text-2xl font-semibold text-[#1F150C]">
                                    Personal Information
                                </h2>

                                <p className="mt-1 text-sm text-[#786D62]">
                                    Your basic account information.
                                </p>
                            </div>

                            <Link
                                href="/dashboard/user/profile/edit"
                                className="btn h-10 min-h-0 rounded-xl border border-[#CBBFA8] bg-white px-4 text-sm font-semibold text-[#412D15] hover:border-[#412D15] hover:bg-[#F7F3EA]"
                            >
                                <FiEdit />
                                Edit
                            </Link>
                        </div>

                        <div className="mt-7 grid gap-5 md:grid-cols-2">
                            <div className="rounded-2xl border border-[#E7DFD1] bg-[#F7F3EA] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiUser className="text-lg text-[#412D15]" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Full Name
                                        </p>

                                        <p className="mt-1 truncate font-semibold text-[#1F150C]">
                                            {user.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#E7DFD1] bg-[#F7F3EA] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiMail className="text-lg text-[#412D15]" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Email Address
                                        </p>

                                        <p className="mt-1 truncate font-semibold text-[#1F150C]">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#E7DFD1] bg-[#F7F3EA] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiShield className="text-lg text-[#412D15]" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Account Role
                                        </p>

                                        <p className="mt-1 font-semibold text-[#1F150C]">
                                            {userRole}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#E7DFD1] bg-[#F7F3EA] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8DC]">
                                        <FiCalendar className="text-lg text-[#412D15]" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                                            Member Since
                                        </p>

                                        <p className="mt-1 font-semibold text-[#1F150C]">
                                            {joinedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account status */}
                    <div className="rounded-3xl bg-[#412D15] p-6 text-white md:p-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#D8CFBC]">
                            Account status
                        </p>

                        <div className="mt-4 flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <FiShield className="text-xl" />
                            </div>

                            <div>
                                <h2 className="font-serif text-2xl font-semibold">
                                    Your account is active
                                </h2>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-[#E1DCC9]">
                                    You can report lost or found items, manage your
                                    reports and update their recovery status.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;