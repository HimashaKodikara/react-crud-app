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
    Package,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

DataTable.use(DT);

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
    const tableRef = useRef<any>(null);

    useEffect(() => {
        if (flashMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const tableData = products.map((product) => [
        product.name,
        product.description,
        product.price,
        product.featured_image,
        product.created_at,
        null,
        product.id,
    ]);

    const columns = [
        { title: "Name" },
        { title: "Description" },
        {
            title: "Price (Rs)",
            render: (data: number) =>
                `<span class="price-badge">Rs ${Number(data).toLocaleString()}</span>`,
        },
        {
            title: "Featured Image",
            orderable: false,
            searchable: false,
            render: (data: string, type: string, row: any[]) => {
                if (type !== "display") return data;
                return data
                    ? `<img src="/storage/${data}" alt="${row[0]}" class="dt-product-img" />`
                    : `<span class="no-image-badge">No Image</span>`;
            },
        },
        {
            title: "Created",
            render: (data: string, type: string) => {
                if (type !== "display") return data;
                return new Date(data).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                });
            },
        },
        {
            title: "Actions",
            orderable: false,
            searchable: false,
        },
        {
            title: "id",
            visible: false,
        },
    ];

    const options = {
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50],
        order: [[0, "asc"]] as [number, string][],
        // Move length to top-left, search to top-right; info and pagination stay bottom
        dom: '<"dt-top-bar"lf>t<"dt-bottom-bar"ip>',
        language: {
            search: "",
            searchPlaceholder: "Search products…",
            lengthMenu: "Show _MENU_",
            info: "Showing _START_–_END_ of _TOTAL_ products",
            paginate: {
                first: "«",
                last: "»",
                next: "›",
                previous: "‹",
            },
            emptyTable: "No products found.",
        },
    };

    return (
        <FluxLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                    Manage Products
                </h2>
            }
        >
            <Head title="Manage Product" />

            {/* Scoped styles */}
            <style>{`
                /* ── Top bar: length left, search right ── */
                .dt-top-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0 16px 0;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                /* Length dropdown */
                .dt-top-bar .dt-length select {
                    appearance: none;
                    background: #f4f6fb url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center;
                    border: 1.5px solid #e0e3ef;
                    border-radius: 8px;
                    padding: 7px 32px 7px 12px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #374151;
                    cursor: pointer;
                    transition: border-color .2s;
                }
                .dt-top-bar .dt-length select:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
                }
                .dt-top-bar .dt-length label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #6b7280;
                    font-weight: 500;
                }

                /* Search input */
                .dt-top-bar .dt-search {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .dt-top-bar .dt-search input {
                    border: 1.5px solid #e0e3ef;
                    border-radius: 8px;
                    padding: 7px 14px 7px 36px;
                    font-size: 13px;
                    color: #374151;
                    background: #f4f6fb url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") no-repeat 11px center;
                    width: 220px;
                    transition: border-color .2s, box-shadow .2s;
                }
                .dt-top-bar .dt-search input:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
                    background-color: #fff;
                }

                /* ── Table ── */
                table.dataTable {
                    border-collapse: separate !important;
                    border-spacing: 0;
                    width: 100% !important;
                }
                table.dataTable thead tr th {
                    background: #f8f9fd;
                    color: #4b5563;
                    font-size: 15px;
                    font-weight: 700;
                    letter-spacing: .06em;
                    text-transform: uppercase;
                    padding: 12px 16px;
                    border-bottom: 1.5px solid #e9ebf5;
                    white-space: nowrap;
                }
                table.dataTable thead tr th:first-child { border-radius: 10px 0 0 0; }
                table.dataTable thead tr th:last-child  { border-radius: 0 10px 0 0; }

                table.dataTable tbody tr td {
                    padding: 14px 16px;
                    font-size: 14px;
                    color: #282e39ff;
                    vertical-align: middle;
                    border-bottom: 1px solid #f0f1f8;
                    background: #fff;
                    transition: background .15s;
                }
                table.dataTable tbody tr:hover td { background: #f7f8ff; }
                table.dataTable tbody tr:last-child td { border-bottom: none; }

                /* Sorting arrows */
                table.dataTable thead .sorting:after,
                table.dataTable thead .sorting_asc:after,
                table.dataTable thead .sorting_desc:after {
                    font-size: 10px;
                    opacity: .5;
                }

                /* ── Custom cell styles ── */
                .dt-product-img {
                    height: 100px;
                    width: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1.5px solid #e5e7eb;
                    margin: auto;
                    display: block;
                    box-shadow: 0 1px 4px rgba(0,0,0,.07);
                }
                .no-image-badge {
                    font-size: 11px;
                    color: #9ca3af;
                    display: block;
                    text-align: center;
                }
                .price-badge {
                    display: inline-block;
                    background: #eef2ff;
                    color: #4f46e5;
                    font-weight: 600;
                    font-size: 12.5px;
                    padding: 3px 10px;
                    border-radius: 20px;
                    letter-spacing: .01em;
                }

                /* ── Bottom bar ── */
                .dt-bottom-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 14px 0 0 0;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .dt-bottom-bar .dt-info {
                    font-size: 12.5px;
                    color: #9ca3af;
                }

                /* Pagination */
                .dt-bottom-bar .dt-paging .dt-paging-button {
                    border: none !important;
                    background: transparent;
                    color: #6b7280 !important;
                    border-radius: 6px;
                    padding: 5px 9px !important;
                    font-size: 13px;
                    cursor: pointer;
                    transition: background .15s, color .15s;
                    margin: 0 1px;
                }
                .dt-bottom-bar .dt-paging .dt-paging-button:hover:not(.disabled) {
                    background: #eef2ff !important;
                    color: #4f46e5 !important;
                }
                .dt-bottom-bar .dt-paging .dt-paging-button.current {
                    background: #6366f1 !important;
                    color: #fff !important;
                    font-weight: 600;
                }
                .dt-bottom-bar .dt-paging .dt-paging-button.disabled {
                    opacity: .35;
                    cursor: default;
                }
            `}</style>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Flash Alerts */}
                {showAlert && flash.success && (
                    <Alert className="max-w-md ml-auto border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2Icon className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                {showAlert && flash.error && (
                    <Alert variant="destructive" className="max-w-md ml-auto">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}

                {/* Header row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600">
                            <Package size={16} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                Products
                            </p>
                            <p className="text-xs text-gray-400">
                                {products.length} total
                            </p>
                        </div>
                    </div>
                    <Link
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer transition-colors shadow-sm shadow-indigo-200"
                        as="button"
                        href={route("manageproduct.create")}
                    >
                        <span className="text-lg leading-none">+</span> Add
                        Product
                    </Link>
                </div>

                {/* DataTable card */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                    <DataTable
                        ref={tableRef}
                        data={tableData}
                        columns={columns}
                        className="display w-full"
                        options={options}
                        slots={{
                            5: (_data: any, row: any[]) => {
                                const id = row[6];
                                return (
                                    <div className="flex items-center justify-center gap-1.5">
                                        <Link
                                            as="button"
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors border border-sky-100"
                                            href={route("manageproduct.show", {
                                                manageproduct: id,
                                            })}
                                            title="View"
                                        >
                                            <Eye size={14} />
                                        </Link>
                                        <Link
                                            as="button"
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-100"
                                            href={route("manageproduct.edit", {
                                                manageproduct: id,
                                            })}
                                            title="Edit"
                                        >
                                            <Pencil size={14} />
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100"
                                            href={route(
                                                "manageproduct.destroy",
                                                { manageproduct: id },
                                            )}
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </Link>
                                    </div>
                                );
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price (Rs)</th>
                                <th>Featured Image</th>
                                <th>Created</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>
        </FluxLayout>
    );
}
