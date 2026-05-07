import FluxLayout from "@/Layouts/FluxLayout";
import { usePage } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManageProduct() {
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
