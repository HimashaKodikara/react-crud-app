import FluxLayout from '@/Layouts/FluxLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <FluxLayout>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Good afternoon, {user.name.split(' ')[0]}
                </h1>
                
                <p className="mb-6 mt-2 text-base text-zinc-600 dark:text-zinc-400">
                    Here's what's new today
                </p>
                
                <div className="h-px w-full bg-zinc-200 dark:bg-zinc-700 mb-8" aria-hidden="true" />
                
                {/* Placeholder for actual dashboard widgets */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Example Card */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Users</h3>
                        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">1,234</p>
                    </div>
                </div>
            </div>
        </FluxLayout>
    );
}
