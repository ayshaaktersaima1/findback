"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import ItemCard from "./ItemCard";
import { toast } from "react-toastify";

interface Item {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    date: string;
    image?: string;
    type: "lost" | "found";
    status: "open" | "returned";
    userEmail: string;
    createdAt: string;
}

interface SearchItemsProps {
    initialItems: Item[];
}

const SearchItems = ({ initialItems }: SearchItemsProps) => {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [loading, setLoading] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const handleSearch = async (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const searchText =
            formData.get("search")?.toString().trim() || "";

        const location =
            formData.get("location")?.toString().trim() || "";

        try {
            const params = new URLSearchParams();

            if (searchText) {
                params.append("search", searchText);
            }

            if (location) {
                params.append("location", location);
            }

            const res = await fetch(
                `${baseUrl}/api/items?${params.toString()}`,
            );

            if (!res.ok) {
                toast.info("Failed to filter items");
                return;
            }

            const data: Item[] = await res.json();

            setItems(data);
        } catch (error) {
            console.log(error);
            toast.info("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setItems(initialItems);
    };

    return (
        <div>
            <form
                onSubmit={handleSearch}
                className="mb-8 rounded-2xl border border-[#D8CFBC] bg-white p-4"
            >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {/* Search */}
                    <label className="input h-12 w-full border-[#D8CFBC] bg-white focus-within:border-[#412D15]">
                        <FiSearch className="text-lg text-[#786D62]" />

                        <input
                            type="search"
                            name="search"
                            placeholder="Search by title..."
                            className="grow text-[#1F150C] placeholder:text-[#9A8F83]"
                        />
                    </label>

                    {/* Location filter */}
                    <label className="input h-12 w-full border-[#D8CFBC] bg-white focus-within:border-[#412D15]">
                        <FiMapPin className="text-lg text-[#786D62]" />

                        <select
                            name="location"
                            defaultValue=""
                            className="w-full bg-transparent text-[#1F150C] outline-none"
                        >
                            <option value="">All locations</option>
                            <option value="Dhanmondi">Dhanmondi</option>
                            <option value="Mirpur">Mirpur</option>
                            <option value="Uttara">Uttara</option>
                            <option value="Banani">Banani</option>
                            <option value="Gulshan">Gulshan</option>
                            <option value="Dhaka University">
                                Dhaka University
                            </option>
                        </select>
                    </label>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn h-12 flex-1 border-none bg-[#412D15] font-semibold text-white hover:bg-[#1F150C] disabled:opacity-60"
                        >
                            {loading ? "Filtering..." : "Search"}
                        </button>

                        <button
                            type="reset"
                            onClick={handleReset}
                            className="btn h-12 border border-[#D8CFBC] bg-white text-[#412D15] hover:bg-[#F7F3EA]"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {items.length === 0 ? (
                <div className="rounded-2xl border border-[#D8CFBC] bg-white p-8 text-center">
                    <h2 className="text-xl font-semibold text-[#1F150C]">
                        No items found
                    </h2>

                    <p className="mt-2 text-sm text-[#786D62]">
                        Try another title or location.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchItems;