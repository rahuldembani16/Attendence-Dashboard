"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Category } from "@/types";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
    const { categories, addCategory, deleteCategory } = useApp();
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [newCategory, setNewCategory] = useState<Partial<Category>>({
        color: "bg-gray-100 text-gray-800 border-gray-200",
        isWorkDay: true,
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.code && newCategory.label) {
            addCategory(newCategory);
            setNewCategory({
                code: "",
                label: "",
                color: "bg-gray-100 text-gray-800 border-gray-200",
                isWorkDay: true,
            });
        }
    };

    const colorOptions = [
        { label: "Gray", value: "bg-gray-100 text-gray-800 border-gray-200" },
        { label: "Red", value: "bg-red-100 text-red-800 border-red-200" },
        { label: "Orange", value: "bg-orange-100 text-orange-800 border-orange-200" },
        { label: "Amber", value: "bg-amber-100 text-amber-800 border-amber-200" },
        { label: "Yellow", value: "bg-yellow-100 text-yellow-800 border-yellow-200" },
        { label: "Lime", value: "bg-lime-100 text-lime-800 border-lime-200" },
        { label: "Green", value: "bg-green-100 text-green-800 border-green-200" },
        { label: "Emerald", value: "bg-emerald-100 text-emerald-800 border-emerald-200" },
        { label: "Teal", value: "bg-teal-100 text-teal-800 border-teal-200" },
        { label: "Cyan", value: "bg-cyan-100 text-cyan-800 border-cyan-200" },
        { label: "Sky", value: "bg-sky-100 text-sky-800 border-sky-200" },
        { label: "Blue", value: "bg-blue-100 text-blue-800 border-blue-200" },
        { label: "Indigo", value: "bg-indigo-100 text-indigo-800 border-indigo-200" },
        { label: "Violet", value: "bg-violet-100 text-violet-800 border-violet-200" },
        { label: "Purple", value: "bg-purple-100 text-purple-800 border-purple-200" },
        { label: "Fuchsia", value: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200" },
        { label: "Pink", value: "bg-pink-100 text-pink-800 border-pink-200" },
        { label: "Rose", value: "bg-rose-100 text-rose-800 border-rose-200" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
                    <p className="text-gray-500">Manage attendance status codes and colors.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Category</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                        <input
                            type="text"
                            required
                            value={newCategory.code || ""}
                            onChange={(e) => setNewCategory({ ...newCategory, code: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="e.g. WFH"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                        <input
                            type="text"
                            required
                            value={newCategory.label || ""}
                            onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="e.g. Work From Home"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <div className="grid grid-cols-6 gap-2">
                            {colorOptions.map((opt) => (
                                <button
                                    key={opt.label}
                                    type="button"
                                    onClick={() => setNewCategory({ ...newCategory, color: opt.value })}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-all",
                                        opt.value.split(" ")[0], // Use bg class for preview
                                        newCategory.color === opt.value
                                            ? "border-gray-900 scale-110 ring-2 ring-offset-1 ring-gray-400"
                                            : "border-transparent hover:scale-105"
                                    )}
                                    title={opt.label}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Select a color for the category badge.</p>
                    </div>
                    <div className="flex items-center pb-3">
                        <input
                            type="checkbox"
                            id="isWorkDay"
                            checked={newCategory.isWorkDay}
                            onChange={(e) => setNewCategory({ ...newCategory, isWorkDay: e.target.checked })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isWorkDay" className="ml-2 block text-sm text-gray-900">
                            Is Work Day?
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                        <tr>
                            <th className="p-4">Preview</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Label</th>
                            <th className="p-4">Type</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div
                                        className={cn(
                                            "w-8 h-8 flex items-center justify-center rounded text-xs font-bold border",
                                            cat.color
                                        )}
                                    >
                                        {cat.code}
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{cat.code}</td>
                                <td className="p-4">{cat.label}</td>
                                <td className="p-4">
                                    {cat.isWorkDay ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Work Day
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Absence
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end">
                                        {deleteConfirm === cat.id ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await deleteCategory(cat.id);
                                                            setDeleteConfirm(null);
                                                        } catch (error: any) {
                                                            alert(error.message);
                                                            setDeleteConfirm(null);
                                                        }
                                                    }}
                                                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition-colors"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="text-gray-600 hover:text-gray-800 px-2 py-1 rounded text-xs transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(cat.id)}
                                                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
