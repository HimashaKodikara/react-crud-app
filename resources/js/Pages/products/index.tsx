import FluxLayout from "@/Layouts/FluxLayout";
import { Head } from "@inertiajs/react";

export default function ManageProduct() {
    return (
        <FluxLayout>
            <Head title="Manage Product" />

            <div className="max-w-7xl mx-auto w-full">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Featured Image</th>
                            <th>Created Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </FluxLayout>
    );
}
