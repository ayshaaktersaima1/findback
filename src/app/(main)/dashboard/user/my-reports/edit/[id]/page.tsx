import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface EditReportPageProps {
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
    userEmail: string;
}

const EditReportPage = async ({
    params,
}: EditReportPageProps) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const userEmail = session.user.email;
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${baseUrl}/api/items/${id}?email=${encodeURIComponent(
            userEmail,
        )}`,
        {
            cache: "no-store",
        },
    );

    if (!response.ok) {
        redirect("/dashboard/user/my-reports");
    }

    const item: ReportItem = await response.json();

    const updateReport = async (formData: FormData) => {
        "use server";

        const currentSession = await auth.api.getSession({
            headers: await headers(),
        });

        if (!currentSession) {
            redirect("/login");
        }

        const currentUserEmail =
            currentSession.user.email;

        const updatedItem = {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            description: formData.get(
                "description",
            ) as string,
            location: formData.get("location") as string,
            date: formData.get("date") as string,
            image: formData.get("image") as string,
            type: formData.get("type") as
                | "lost"
                | "found",
            status: formData.get("status") as
                | "open"
                | "recovered",
        };

        const updateResponse = await fetch(
            `${baseUrl}/api/items/${id}?email=${encodeURIComponent(
                currentUserEmail,
            )}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedItem),
            },
        );

        if (!updateResponse.ok) {
            throw new Error("Failed to update report");
        }

        redirect("/dashboard/user/my-reports");
    };

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A17C54]">
                    Manage report
                </p>

                <h1 className="mt-2 font-serif text-4xl font-semibold text-[#1F150C]">
                    Edit Report
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#786D62]">
                    Update your reported item information and status.
                </p>
            </div>

            <form
                action={updateReport}
                className="space-y-6 rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm md:p-8"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="type"
                            className="mb-2 block text-sm font-semibold text-[#1F150C]"
                        >
                            Report Type
                        </label>

                        <select
                            id="type"
                            name="type"
                            defaultValue={item.type}
                            required
                            className="select w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                        >
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="mb-2 block text-sm font-semibold text-[#1F150C]"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            name="status"
                            defaultValue={item.status}
                            required
                            className="select w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                        >
                            <option value="open">Open</option>
                            <option value="recovered">
                                Recovered
                            </option>
                        </select>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-semibold text-[#1F150C]"
                    >
                        Item Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        name="title"
                        defaultValue={item.title}
                        required
                        className="input w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                    />
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-semibold text-[#1F150C]"
                    >
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        defaultValue={item.category}
                        required
                        className="select w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                    >
                        <option value="Electronics">
                            Electronics
                        </option>
                        <option value="Wallet">
                            Wallet
                        </option>
                        <option value="Bag">Bag</option>
                        <option value="Documents">
                            Documents
                        </option>
                        <option value="Jewelry">
                            Jewelry
                        </option>
                        <option value="Keys">Keys</option>
                        <option value="Clothing">
                            Clothing
                        </option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-semibold text-[#1F150C]"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        defaultValue={item.description}
                        required
                        rows={5}
                        className="textarea w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="location"
                            className="mb-2 block text-sm font-semibold text-[#1F150C]"
                        >
                            Location
                        </label>

                        <input
                            id="location"
                            type="text"
                            name="location"
                            defaultValue={item.location}
                            required
                            className="input w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="date"
                            className="mb-2 block text-sm font-semibold text-[#1F150C]"
                        >
                            Date
                        </label>

                        <input
                            id="date"
                            type="date"
                            name="date"
                            defaultValue={item.date}
                            required
                            className="input w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="image"
                        className="mb-2 block text-sm font-semibold text-[#1F150C]"
                    >
                        Image URL
                    </label>

                    <input
                        id="image"
                        type="url"
                        name="image"
                        defaultValue={item.image || ""}
                        className="input w-full rounded-xl border-[#D8CFBC] bg-white text-[#1F150C]"
                    />
                </div>

                <div className="rounded-2xl bg-[#F7F3EA] p-4">
                    <p className="text-sm font-semibold text-[#1F150C]">
                        Status information
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#786D62]">
                        Keep the status as Open while the item is
                        unresolved. Change it to Recovered after the
                        item has been returned to its owner.
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[#E7DFD1] pt-6 sm:flex-row sm:justify-end">
                    <a
                        href="/dashboard/user/my-reports"
                        className="btn h-11 min-h-0 rounded-xl border border-[#CBBFA8] bg-white px-6 text-[#412D15] hover:bg-[#F7F3EA]"
                    >
                        Cancel
                    </a>

                    <button
                        type="submit"
                        className="btn h-11 min-h-0 rounded-xl border-none bg-[#412D15] px-6 font-semibold text-white hover:bg-[#1F150C]"
                    >
                        Update Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditReportPage;