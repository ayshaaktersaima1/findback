import Link from "next/link";

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

interface ItemCardProps {
    item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#D8CFBC] bg-white shadow-md">
            {item.image && (
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full shrink-0 object-cover"
                />
            )}

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#E1DCC9] px-3 py-1 text-sm font-medium capitalize text-[#412D15]">
                        {item.type}
                    </span>

                    <span className="text-sm capitalize text-[#786D62]">
                        {item.status}
                    </span>
                </div>

                <h2 className="text-xl font-semibold text-[#1F150C]">
                    {item.title}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm text-[#675C50]">
                    {item.description}
                </p>

                <div className="mt-4 space-y-1 text-sm text-[#786D62]">
                    <p>
                        <span className="font-semibold">Category:</span>{" "}
                        {item.category}
                    </p>

                    <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {item.location}
                    </p>

                    <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {item.date}
                    </p>
                </div>

                <div className="mt-auto border-t border-[#E7DFD1] pt-5">
                    <Link
                        href={`/items/${item._id}`}
                        className="flex h-11 w-full items-center justify-center rounded-xl bg-[#412D15] text-sm font-semibold text-white transition hover:bg-[#1F150C]"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;