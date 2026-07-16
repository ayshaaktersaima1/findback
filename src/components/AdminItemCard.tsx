"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    FiCalendar,
    FiMail,
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
    status: "open" | "recovered";
    userEmail: string;
    createdAt: string;
}

interface AdminItemCardProps {
    item: ReportItem;
}

const AdminItemCard = ({ item }: AdminItemCardProps) => {
    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const modalId = `delete-modal-${item._id}`;

    const openModal = () => {
        const modal = document.getElementById(
            modalId,
        ) as HTMLDialogElement | null;

        modal?.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById(
            modalId,
        ) as HTMLDialogElement | null;

        modal?.close();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/api/items/${item._id}`,
                {
                    method: "DELETE",
                },
            );

            const data = await response.json();

            if (!response.ok) {
                toast.info(
                    data.message || "Failed to delete item",
                );
                return;
            }

            closeModal();
            toast.success("Item deleted successfully");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.info("Something went wrong");
        }
    };

    return (
        <>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#D8CFBC] bg-white shadow-sm">
                <div className="relative h-52 w-full shrink-0 bg-[#EDE8DC]">
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

                    <span
                        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold capitalize ${item.status === "recovered"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-white text-[#412D15]"
                            }`}
                    >
                        {item.status}
                    </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#A17C54]">
                            {item.category}
                        </p>

                        <h2 className="mt-2 line-clamp-1 text-xl font-semibold text-[#1F150C]">
                            {item.title}
                        </h2>

                        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#786D62]">
                            {item.description}
                        </p>

                        <div className="mt-5 space-y-3 text-sm text-[#675C50]">
                            <div className="flex items-center gap-2">
                                <FiMapPin className="shrink-0 text-[#412D15]" />

                                <span className="line-clamp-1">
                                    {item.location}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiCalendar className="shrink-0 text-[#412D15]" />
                                <span>{item.date}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiMail className="shrink-0 text-[#412D15]" />

                                <span className="truncate">
                                    {item.userEmail}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-5">
                        <div className="border-t border-[#E7DFD1] pt-4">
                            <button
                                type="button"
                                onClick={openModal}
                                className="btn h-11 min-h-0 w-full rounded-xl border-none bg-red-600 font-semibold text-white hover:bg-red-700"
                            >
                                <FiTrash2 />
                                Delete Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog
                id={modalId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box rounded-3xl border border-[#D8CFBC] bg-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <FiTrash2 className="text-xl text-red-600" />
                    </div>

                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#1F150C]">
                        Delete item?
                    </h3>

                    <p className="py-4 text-sm leading-6 text-[#786D62]">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-[#1F150C]">
                            {item.title}
                        </span>
                        ? This action cannot be undone.
                    </p>

                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                type="submit"
                                className="btn h-11 min-h-0 rounded-xl border border-[#CBBFA8] bg-white px-6 text-[#412D15] hover:bg-[#F7F3EA]"
                            >
                                Close
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn h-11 min-h-0 rounded-xl border-none bg-red-600 px-6 text-white hover:bg-red-700"
                        >
                            <FiTrash2 />
                            Delete
                        </button>
                    </div>
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button type="submit">Close</button>
                </form>
            </dialog>
        </>
    );
};

export default AdminItemCard;