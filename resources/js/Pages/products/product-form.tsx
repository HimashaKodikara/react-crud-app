import FluxLayout from "@/Layouts/FluxLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button, Field, Input, Label } from "@headlessui/react";
import { CustomTextarea } from "@/Components/ui/custom-textarea";
import { FormEvent } from "react";

interface Product {
    id?: number;
    name: string;
    description: string;
    price: string | number;
    featured_image?: string | null;
}

interface Props {
    product?: Product;
    isView?: boolean;
    isEdit?: boolean;
}

export default function ProductForm({ product, isView, isEdit }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name ?? "",
        description: product?.description ?? "",
        price: product?.price != null ? String(product.price) : "",
        featured_image: null as File | null,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            put(route("manageproduct.update", product?.id), {
                forceFormData: true,
            });
        } else {
            post(route("manageproduct.store"), { forceFormData: true });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("featured_image", e.target.files[0]);
        }
    };

    const pageTitle = isView
        ? "View Product"
        : product
          ? "Edit Product"
          : "Create Product";

    const inputClass =
        "block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-zinc-100";
    return (
        <FluxLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                    {pageTitle}
                </h2>
            }
        >
            <Head title={pageTitle} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Back button */}
                <div className="ml-auto">
                    <Link
                        as="button"
                        href={route("manageproduct.index")}
                        className="mt-4 w-fit cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Back to Products
                    </Link>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{pageTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-4"
                            autoCapitalize="off"
                        >
                            <div className="grid gap-6">
                                {/* Product Name */}
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
                                        className={inputClass}
                                    />
                                    {errors.name && (
                                        <div className="text-sm text-red-600">
                                            {errors.name}
                                        </div>
                                    )}
                                </Field>

                                {/* Description */}
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
                                        disabled={isView}
                                        className={inputClass}
                                    />
                                    {errors.description && (
                                        <div className="text-sm text-red-600">
                                            {errors.description}
                                        </div>
                                    )}
                                </Field>

                                {/* Price */}
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
                                        disabled={isView}
                                        className={inputClass}
                                    />
                                    {errors.price && (
                                        <div className="text-sm text-red-600">
                                            {errors.price}
                                        </div>
                                    )}
                                </Field>

                                {/*Display Featured Image */}
                                <Field className="grid gap-2">
                                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Featured Image
                                    </Label>

                                    {isView || isEdit ? (
                                        product?.featured_image ? (
                                            <img
                                                src={`/storage/${product.featured_image}`}
                                                alt={product.name}
                                                className="h-40 w-40 object-cover rounded-md border border-zinc-200 dark:border-zinc-700"
                                            />
                                        ) : (
                                            <span className="text-sm text-zinc-400 italic">
                                                No image uploaded
                                            </span>
                                        )
                                    ) : (
                                        <Input
                                            id="featured_image"
                                            name="featured_image"
                                            type="file"
                                            onChange={handleFileUpload}
                                            className={inputClass}
                                        />
                                    )}

                                    {errors.featured_image && (
                                        <div className="text-sm text-red-600">
                                            {errors.featured_image}
                                        </div>
                                    )}
                                </Field>

                                {/* Submit — only in create/edit mode */}
                                {!isView && (
                                    <Button
                                        type="submit"
                                        className="mt-4 w-fit cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? isEdit
                                                ? "Updating..."
                                                : "Creating..."
                                            : isEdit
                                              ? "Update Product"
                                              : "Create Product"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </FluxLayout>
    );
}
