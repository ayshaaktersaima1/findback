"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FiCalendar,
    FiEdit,
    FiMapPin,
    FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

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

interface MyReportCardProps {
    item: ReportItem;
    userEmail: string;
}

const MyReportCard = ({
    item,
    userEmail,
}: MyReportCardProps) => {
    const router = useRouter();

    const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this report?",
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${baseUrl}/api/items/${item._id}?email=${encodeURIComponent(
                    userEmail,
                )}`,
                {
                    method: "DELETE",
                },
            );

            const data = await response.json();

            if (!response.ok) {
                toast.info(
                    data.message || "Failed to delete report",
                );

                return;
            }

            toast.success("Report deleted successfully");

            router.refresh();
        } catch (error) {

            toast.info("Something went wrong");
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-[#D8CFBC] bg-white shadow-sm">
            <div className="relative h-52 w-full bg-[#EDE8DC]">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#786D62]">
                        No image available
                    </div>
                )}

                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold capitalize ${item.type === "lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {item.type}
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-[#412D15] shadow-sm">
                    {item.status}
                </span>
            </div>

            <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                    {item.category}
                </p>

                <h2 className="mt-2 text-xl font-semibold text-[#1F150C]">
                    {item.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#786D62]">
                    {item.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-[#675C50]">
                    <div className="flex items-center gap-2">
                        <FiMapPin className="shrink-0 text-[#412D15]" />

                        <span>{item.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FiCalendar className="shrink-0 text-[#412D15]" />

                        <span>{item.date}</span>
                    </div>
                </div>

                <div className="mt-5 flex gap-3 border-t border-[#E7DFD1] pt-4">
                    <Link
                        href={`/dashboard/user/my-reports/edit/${item._id}`}
                        className="btn h-11 min-h-0 flex-1 rounded-xl border border-[#CBBFA8] bg-white text-[#412D15] hover:border-[#412D15] hover:bg-[#F7F3EA]"
                    >
                        <FiEdit />
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        type="button"
                        className="btn h-11 min-h-0 flex-1 rounded-xl border-none bg-red-600 text-white hover:bg-red-700"
                    >
                        <FiTrash2 />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyReportCard;