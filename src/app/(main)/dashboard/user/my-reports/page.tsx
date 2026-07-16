import MyReportCard from "@/components/MyReportCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ReportItem {
    _id: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
    image?: string;
    type: "lost" | "found";
    status: string;
    userEmail: string;
    createdAt: string;
}

const MyReportsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const userEmail = session.user.email;

    const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${baseUrl}/api/my-items/${encodeURIComponent(
            userEmail,
        )}`,
        {
            cache: "no-store",
        },
    );

    const items: ReportItem[] = response.ok
        ? await response.json()
        : [];

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    My activity
                </p>

                <h1 className="mt-2 font-serif text-4xl font-semibold text-[#1F150C]">
                    My Reports
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#786D62]">
                    View, edit and delete the lost and found
                    items you have reported.
                </p>
            </div>

            <div className="mb-7 rounded-2xl border border-[#D8CFBC] bg-white p-5 shadow-sm">
                <p className="text-sm text-[#786D62]">
                    Total reports
                </p>

                <p className="mt-1 text-3xl font-semibold text-[#1F150C]">
                    {items.length}
                </p>
            </div>

            {items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#CBBFA8] bg-white p-12 text-center">
                    <h2 className="text-xl font-semibold text-[#1F150C]">
                        No reports found
                    </h2>

                    <p className="mt-2 text-sm text-[#786D62]">
                        Your submitted reports will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <MyReportCard
                            key={item._id}
                            item={item}
                            userEmail={userEmail}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReportsPage;