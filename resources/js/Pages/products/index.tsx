import FluxLayout from "@/Layouts/FluxLayout";
import { usePage } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import {
    CheckCircle2Icon,
    AlertCircleIcon,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    created_at: string;
}
export default function ManageProduct({ ...props }: { products: Product[] }) {
    const { products } = props;
    const { flash } = usePage().props as any;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        if (flashMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

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
                {showAlert && flash.success && (
                    <Alert className="max-w-md ml-auto border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2Icon className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {showAlert && flash.error && (
                    <Alert
                        variant="destructive"
                        className="max-w-md ml-auto mb-4"
                    >
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}
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
                                <th className="p-4 border">Price (Rs)</th>
                                <th className="p-4 border">Featured Image</th>
                                <th className="p-4 border">Created Date</th>
                                <th className="p-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-center border">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-2 text-center border">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-2 text-center border">
                                        {product.description}
                                    </td>
                                    <td className="px-4 py-2 text-center border">
                                        {product.price}
                                    </td>
                                    <td className="px-4 py-2 text-center border">
                                        {product.featured_image ? (
                                            <img
                                                src={`/storage/${product.featured_image}`}
                                                alt={product.name}
                                                className="h-16 w-16 object-cover mx-auto rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">
                                                No Image
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center border">
                                        {product.created_at}
                                    </td>
                                    <td className="px-4 py-2 text-center border">
                                        <Link
                                            as="button"
                                            className="bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90"
                                            href={route(
                                                "manageproduct.show",
                                                product.id,
                                            )}
                                        >
                                            <Eye size={20} />
                                        </Link>
                                        <Link
                                            as="button"
                                            className="ms-2 bg-blue-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90"
                                            href={route(
                                                "manageproduct.edit",
                                                product.id,
                                            )}
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <Link
                                            as="button"
                                            className="ms-2 bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90"
                                            href={route(
                                                "manageproduct.destroy",
                                                product.id,
                                            )}
                                        >
                                            <Trash2 size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </FluxLayout>
    );
}
