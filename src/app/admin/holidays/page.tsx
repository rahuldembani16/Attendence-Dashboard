"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Holiday } from "@/types";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function HolidaysPage() {
    const { holidays, addHoliday, deleteHoliday } = useApp();
    const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
        isRecurring: false,
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newHoliday.date && newHoliday.description) {
            addHoliday(newHoliday);
            setNewHoliday({
                date: "",
                description: "",
                isRecurring: false,
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Holiday Management</h1>
                    <p className="text-gray-500">Block specific dates as holidays.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Holiday</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            required
                            value={newHoliday.date || ""}
                            onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            type="text"
                            required
                            value={newHoliday.description || ""}
                            onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="e.g. Christmas Day"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Holiday
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Description</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {holidays.map((holiday) => (
                            <tr key={holiday.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium">
                                    {format(new Date(holiday.date), "PPP")}
                                </td>
                                <td className="p-4">{holiday.description}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => deleteHoliday(holiday.id)}
                                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {holidays.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">
                                    No holidays defined.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
