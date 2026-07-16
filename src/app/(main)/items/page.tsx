import SearchItems from "@/components/SearchItems";

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

const AllItems = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`,
        {
            cache: "no-store",
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }

    const items: Item[] = await response.json();

    return (
        <section className="mx-auto w-[90%] max-w-7xl py-12">
            <div className="mb-8 text-center">
                <h1 className="font-serif text-4xl font-semibold text-[#1F150C]">
                    All Items
                </h1>

                <p className="mt-2 text-[#786D62]">
                    Browse recently reported lost and found items.
                </p>
            </div>

            <SearchItems initialItems={items} />
        </section>
    );
};

export default AllItems;