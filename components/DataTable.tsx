'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, MoreVertical, Filter, Download } from 'lucide-react';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    width?: string;
    hideOnMobile?: boolean;
}

interface DataTableProps<T> {
    title: string;
    columns: Column<T>[];
    data: T[];
    searchPlaceholder?: string;
    actionButton?: {
        label: string;
        onClick: () => void;
    };
    showExport?: boolean;
    showFilters?: boolean;
}

export default function DataTable<T extends object>({
    title,
    columns,
    data,
    searchPlaceholder = 'Search...',
    actionButton,
    showExport = false,
    showFilters = false,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter data based on search
    const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-4 sm:space-y-6 opacity-0 animate-fadeInUp stagger-1">
            {/* Header - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div>
                    {title && <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h1>}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    {/* Search */}
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-48 lg:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                    </div>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2">
                        {showFilters && (
                            <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                        )}

                        {showExport && (
                            <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export</span>
                            </button>
                        )}

                        {actionButton && (
                            <button
                                onClick={actionButton.onClick}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors whitespace-nowrap"
                            >
                                {actionButton.label}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="bg-[#374151] text-white">
                                {columns.map((col, index) => (
                                    <th
                                        key={String(col.key)}
                                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-medium ${index === 0 ? 'rounded-tl-none' : ''
                                            } ${index === columns.length - 1 ? 'rounded-tr-none' : ''}`}
                                        style={{ width: col.width }}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-medium w-12">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                                >
                                    {columns.map((col) => (
                                        <td key={String(col.key)} className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700">
                                            {col.render
                                                ? col.render(item)
                                                : String(item[col.key as keyof T] ?? '')}
                                        </td>
                                    ))}
                                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - Responsive */}
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-500">
                        <span className="hidden sm:inline">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of </span>
                        <span className="sm:hidden">{Math.min(startIndex + itemsPerPage, filteredData.length)}/</span>
                        {filteredData.length}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-xs sm:text-sm text-gray-700 min-w-[60px] sm:min-w-[80px] text-center">
                            {currentPage}/{totalPages || 1}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
