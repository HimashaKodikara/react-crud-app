import FluxLayout from "@/Layouts/FluxLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

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
                <Card size="sm" className="mx-auto w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Small Card</CardTitle>
                        <CardDescription>
                            This card uses the small size variant.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            The card component supports a size prop that can be
                            set to &quot;sm&quot; for a more compact appearance.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                            Action
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </FluxLayout>
    );
}
