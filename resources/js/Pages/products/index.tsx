import FluxLayout from "@/Layouts/FluxLayout";
import { Head, Link } from "@inertiajs/react";

export default function ManageProduct() {
    return (
        <FluxLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                    Manage Product
                </h2>
            }
        >
            <Head title="Manage Product" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 ">
                <div className="ml-auto">
                    <Link
                        className="bg-indigo-800 px-4 py-2 rounded-lg text-white text-mdS cursor-pointer hover:opacity-90"
                        as="button"
                        href={route("manageproduct.create")}
                    >
                        Add Product
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="p-4 border">#</th>
                                <th className="p-4 border">Name</th>
                                <th className="p-4 border">Description</th>
                                <th className="p-4 border">Price</th>
                                <th className="p-4 border">Featured Image</th>
                                <th className="p-4 border">Created Date</th>
                                <th className="p-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-center border">
                                    1
                                </td>
                                <td className="px-4 py-2 text-center border">
                                    Moblie Phone
                                </td>
                                <td className="px-4 py-2 text-center border">
                                    1200
                                </td>
                                <td className="px-4 py-2 text-center border"></td>
                                <td className="px-4 py-2 text-center border">
                                    2026-04-01
                                </td>
                                <td className="px-4 py-2 text-center border"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </FluxLayout>
    );
}
