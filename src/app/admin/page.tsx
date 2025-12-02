"use client";

import Link from "next/link";
import { Users, Calendar, Settings, ArrowRight, FileText } from "lucide-react";

export default function AdminPage() {
    const cards = [
        {
            title: "User Management",
            description: "Add, remove, and manage employees.",
            icon: Users,
            href: "/admin/users",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Categories",
            description: "Manage attendance status codes and colors.",
            icon: Settings,
            href: "/admin/categories",
            color: "bg-purple-50 text-purple-600",
        },
        {
            title: "Holidays",
            description: "Manage holidays and date restrictions.",
            icon: Calendar,
            href: "/admin/holidays",
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Reports",
            description: "Generate and download system reports.",
            icon: FileText,
            href: "/admin/reports",
            color: "bg-orange-50 text-orange-600",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 mt-2">Manage system settings and data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="block p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${card.color}`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {card.title}
                        </h3>
                        <p className="text-gray-500 text-sm">{card.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
