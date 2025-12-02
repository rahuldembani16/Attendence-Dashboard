"use client";

import { useState } from "react";
import { Calendar, Download, FileText } from "lucide-react";

export default function ReportsPage() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateReport = async () => {
        if (!fromDate || !toDate) {
            alert("Please select both From and To dates.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/reports/attendance?from=${fromDate}&to=${toDate}`
            );

            if (!response.ok) {
                throw new Error("Failed to generate report");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Attendance_Report_${fromDate}_to_${toDate}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading report:", error);
            alert("Failed to download report. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-500 mt-2">
                    Generate and download system reports.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Department Attendance Report Card */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Department Attendance
                        </h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">
                        Export attendance records for all departments within a specific date
                        range.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateReport}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="h-4 w-4" />
                            {isLoading ? "Generating..." : "Generate Excel Report"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
