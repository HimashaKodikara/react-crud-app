import FluxLayout from '@/Layouts/FluxLayout';
import { Head } from '@inertiajs/react';

export default function Documents() {
    return (
        <FluxLayout>
            <Head title="Documents" />

            <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Documents
                </h1>
                
                <p className="mb-6 mt-2 text-base text-zinc-600 dark:text-zinc-400">
                    View and manage your files
                </p>
                
                <div className="h-px w-full bg-zinc-200 dark:bg-zinc-700 mb-8" aria-hidden="true" />
                
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <p className="text-zinc-500 dark:text-zinc-400">Your documents will appear here.</p>
                </div>
            </div>
        </FluxLayout>
    );
}
