"use client";

import { authClient } from "@/lib/auth-client";
import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const ReportItemPage = () => {
    const [loading, setLoading] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { data: session } = authClient.useSession();

    const userId = session?.user?.id;
    const userName = session?.user?.name;
    const userEmail = session?.user?.email;
    const userImage = session?.user?.image;

    const handleReportItem = async (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const itemData = {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            date: formData.get("date") as string,
            image: formData.get("image") as string,
            type: formData.get("type") as "lost" | "found",
            status: "open",
            createdAt: new Date().toISOString(),
            userId,
            userName,
            userEmail,
            userImage,
        };

        try {
            const res = await fetch(`${baseUrl}/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });

            if (!res.ok) {
                toast.info("Failed to report item");
                return;
            }

            toast.success("Item reported successfully");
            form.reset();
        } catch (error) {
            console.log(error);
            toast.info("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F7F3EA] px-4 py-12">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="font-serif text-4xl font-semibold text-[#1F150C]">
                        Report an Item
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#786D62]">
                        Provide clear information about the lost or found item to help
                        reunite it with its owner.
                    </p>
                </div>

                <form
                    onSubmit={handleReportItem}
                    className="rounded-3xl border border-[#D8CFBC] bg-white p-6 shadow-sm md:p-8"
                >
                    <div className="space-y-5">
                        {/* Report type */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-[#1F150C]">
                                Report Type
                            </label>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D8CFBC] p-4 transition hover:border-[#412D15] hover:bg-[#F7F3EA]">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="lost"
                                        defaultChecked
                                        className="radio border-[#412D15] checked:bg-[#412D15]"
                                    />

                                    <div>
                                        <p className="font-semibold text-[#1F150C]">
                                            Lost Item
                                        </p>

                                        <p className="text-sm text-[#786D62]">
                                            Report something you have lost
                                        </p>
                                    </div>
                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D8CFBC] p-4 transition hover:border-[#412D15] hover:bg-[#F7F3EA]">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="found"
                                        className="radio border-[#412D15] checked:bg-[#412D15]"
                                    />

                                    <div>
                                        <p className="font-semibold text-[#1F150C]">
                                            Found Item
                                        </p>

                                        <p className="text-sm text-[#786D62]">
                                            Report something you have found
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#1F150C]">
                                Item Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Example: Black leather wallet"
                                required
                                className="h-12 w-full rounded-xl border border-[#D8CFBC] bg-white px-4 text-sm font-medium text-[#1F150C] outline-none transition placeholder:text-[#9A8F83] focus:border-[#412D15] focus:ring-4 focus:ring-[#412D15]/10"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#1F150C]">
                                Category
                            </label>

                            <select
                                name="category"
                                required
                                defaultValue=""
                                className="h-12 w-full rounded-xl border border-[#D8CFBC] bg-white px-4 text-sm font-medium text-[#1F150C] outline-none transition focus:border-[#412D15] focus:ring-4 focus:ring-[#412D15]/10"
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>

                                <option value="Phone">Phone</option>
                                <option value="Wallet">Wallet</option>
                                <option value="Bag">Bag</option>
                                <option value="Keys">Keys</option>
                                <option value="Documents">Documents</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Watch">Watch</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#1F150C]">
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Describe the item, its color, condition and identifying marks..."
                                required
                                rows={6}
                                className="w-full resize-none rounded-xl border border-[#D8CFBC] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#1F150C] outline-none transition placeholder:text-[#9A8F83] focus:border-[#412D15] focus:ring-4 focus:ring-[#412D15]/10"
                            />
                        </div>

                        {/* Location and date */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#1F150C]">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Where was it lost or found?"
                                    required
                                    className="h-12 w-full rounded-xl border border-[#D8CFBC] bg-white px-4 text-sm font-medium text-[#1F150C] outline-none transition placeholder:text-[#9A8F83] focus:border-[#412D15] focus:ring-4 focus:ring-[#412D15]/10"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#1F150C]">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="h-12 w-full rounded-xl border border-[#D8CFBC] bg-white px-4 text-sm font-medium text-[#1F150C] outline-none transition focus:border-[#412D15] focus:ring-4 focus:ring-[#412D15]/10"
                                />
                            </div>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#1F150C]">
                                Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                placeholder="Paste the item image URL"
                                className="h-12 w-full rounded-xl border border-[#D8CFBC] bg-white px-4 text-sm font-medium text-[#1F150C] outline-none transition placeholder:text-[#9A8F83] focus:border-[#412D15] focus:ring-4 focus:ring-[#412D15]/10"
                            />
                        </div>

                        {/* Status information */}
                        <div className="rounded-2xl border border-[#D8CFBC] bg-[#F7F3EA] p-4">
                            <p className="text-sm font-semibold text-[#1F150C]">
                                Default Status:{" "}
                                <span className="text-[#412D15]">Open</span>
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#786D62]">
                                After submitting, other users will be able to view this item.
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-12 rounded-xl bg-[#412D15] px-6 text-sm font-semibold text-white transition hover:bg-[#1F150C] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Submitting..." : "Submit Report"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ReportItemPage;