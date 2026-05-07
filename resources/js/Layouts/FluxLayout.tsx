import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState, ReactNode } from "react";
import {
    Home,
    Inbox,
    Settings,
    Info,
    Menu,
    X,
    LogOut,
    Search,
    ChevronDown,
} from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function FluxLayout({
    header,
    children,
}: Readonly<PropsWithChildren<{ header?: ReactNode }>>) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-800 dark:text-zinc-100 flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-700 dark:bg-zinc-900 lg:hidden">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex-1"></div>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2 rounded-full overflow-hidden focus:outline-none">
                            <img
                                src="https://fluxui.dev/img/demo/user.png"
                                alt={user.name}
                                className="h-8 w-8 rounded-full"
                            />
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="right">
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </header>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex h-16 items-center justify-between px-4">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-8 w-auto fill-current text-indigo-600 dark:text-indigo-400" />
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {import.meta.env.VITE_APP_NAME || "Laravel"}
                            </span>
                        </Link>
                        <button
                            onClick={toggleSidebar}
                            className="p-1 text-zinc-500 lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                        {/* Search Placeholder */}
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-md border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                            />
                        </div>

                        {/* Main Nav */}
                        <nav className="space-y-1">
                            <Link
                                href={route("dashboard")}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${route().current("dashboard") ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"}`}
                            >
                                <Home
                                    className={`h-5 w-5 ${route().current("dashboard") ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-400"}`}
                                />
                                Home
                            </Link>
                            <Link
                                href={route("manageproduct.index")}
                                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${route().current("manageproduct.*") ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Inbox
                                        className={`h-5 w-5 ${route().current("manageproduct.*") ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-400"}`}
                                    />
                                    Manage Product
                                </div>
                            </Link>
                        </nav>

                        {/* Favorites Group */}
                        <div>
                            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Favorites
                            </h3>
                            <nav className="space-y-1">
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                                >
                                    Marketing site
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                                >
                                    Android app
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                                >
                                    Brand guidelines
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="border-t border-zinc-200 p-4 dark:border-zinc-700">
                        <nav className="space-y-1 mb-4">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                            >
                                <Settings className="h-5 w-5 text-zinc-400" />
                                Settings
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                            >
                                <Info className="h-5 w-5 text-zinc-400" />
                                Help
                            </Link>
                        </nav>

                        {/* Desktop User Profile Dropdown */}
                        <div className="hidden lg:block relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex w-full items-center gap-3 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
                                        <img
                                            src="https://fluxui.dev/img/demo/user.png"
                                            alt={user.name}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <div className="flex-1 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {user.name}
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-zinc-400" />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content
                                    align="left"
                                    contentClasses="py-1 bg-white dark:bg-zinc-800 mb-2 bottom-full border border-zinc-200 dark:border-zinc-700 w-full min-w-[200px]"
                                >
                                    <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-700">
                                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                            {user.email}
                                        </div>
                                    </div>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-red-600 dark:text-red-400 flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-zinc-900/80 backdrop-blur-sm lg:hidden"
                    onClick={toggleSidebar}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleSidebar();
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close sidebar"
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-zinc-800">
                {header && (
                    <header className="border-b border-zinc-200 px-6 py-4 lg:px-8 dark:border-zinc-700">
                        {header}
                    </header>
                )}
                <div className="p-6 lg:p-8 flex-1">{children}</div>
            </main>
        </div>
    );
}
