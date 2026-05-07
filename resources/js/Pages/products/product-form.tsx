import FluxLayout from "@/Layouts/FluxLayout";
import { Head, Link } from "@inertiajs/react";

export default function CreateProduct() {
    return (
        <FluxLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                    Create Product
                </h2>
            }
        >
            <Head title="Create Product" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 "></div>
        </FluxLayout>
    );
}
