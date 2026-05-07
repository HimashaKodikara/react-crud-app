import FluxLayout from "@/Layouts/FluxLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button, Field, Input, Label } from "@headlessui/react";
import { CustomTextarea } from "@/Components/ui/custom-textarea";
import { FormEvent, FormEventHandler } from "react";

export default function CreateProduct() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        price: "",
        featured_image: null as File | null,
    });

    //Form submit handle
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("manageproduct.store"), {
            forceFormData: true,
            onSuccess: () => console.log("Form submitted"),
        });
        console.log("data", data);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("featured_image", e.target.files[0]);
        }
    };
    return (
        <FluxLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                    Create Product
                </h2>
            }
        >
            <Head title="Create Product" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 ">
                {/* Back to Products */}
                <div className="ml-auto">
                    <Link
                        as="button"
                        href={route("manageproduct.index")}
                        className="mt-4 w-fit cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        Back to Products
                    </Link>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-4"
                            autoCapitalize="off"
                        >
                            <div className="grid gap-6">
                                <Field className="grid gap-2">
                                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Product name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Product Name"
                                        autoFocus
                                        className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                                    ></Input>
                                    {errors.name && (
                                        <div className="text-sm text-red-600">
                                            {errors.name}
                                        </div>
                                    )}
                                </Field>
                                <Field className="grid gap-2">
                                    <Label
                                        htmlFor="description"
                                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                    >
                                        Product Description
                                    </Label>
                                    <CustomTextarea
                                        id="description"
                                        rows={3}
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                                    />
                                    {errors.description && (
                                        <div className="text-sm text-red-600">
                                            {errors.description}
                                        </div>
                                    )}
                                </Field>
                                <Field className="grid gap-2">
                                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Product Price
                                    </Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="text"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        placeholder="Product Price"
                                        className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                                    ></Input>
                                    {errors.price && (
                                        <div className="text-sm text-red-600">
                                            {errors.price}
                                        </div>
                                    )}
                                </Field>
                                <Field className="grid gap-2">
                                    <Label
                                        htmlFor="featured_image"
                                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                    >
                                        Featured Image
                                    </Label>
                                    <Input
                                        id="featured_image"
                                        name="featured_image"
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                                    ></Input>
                                    {errors.featured_image && (
                                        <div className="text-sm text-red-600">
                                            {errors.featured_image}
                                        </div>
                                    )}
                                </Field>
                                <Button
                                    type="submit"
                                    className="mt-4 w-fit cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Save Product"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </FluxLayout>
    );
}
