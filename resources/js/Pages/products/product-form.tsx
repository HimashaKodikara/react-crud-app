import FluxLayout from "@/Layouts/FluxLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import { CustomTextarea } from "@/Components/ui/custom-textarea";

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

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 ">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="flex flex-col gap-4"
                            autoCapitalize="off"
                        >
                            <div className="grid gap-6">
                                <Field className="grid gap-2">
                                    {/*Product Name*/}
                                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        {" "}
                                        Product name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        autoFocus
                                        className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                                    ></Input>
                                </Field>
                                <Field className="grid gap-2">
                                    {/*Product Description*/}
                                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Product Description
                                    </Label>
                                    <CustomTextarea />
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                                    ></Input>
                                </Field>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </FluxLayout>
    );
}
