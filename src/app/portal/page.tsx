"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { UserCircle } from "lucide-react";

export default function PortalPage() {
    const { users } = useApp();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Employee Portal</h1>
                <p className="text-gray-500">Select your name to manage your attendance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map((user) => (
                    <Link
                        key={user.id}
                        href={`/portal/${user.id}`}
                        className="group block p-6 bg-white rounded-lg border shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-100 transition-colors">
                                <UserCircle className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {user.surname} {user.name}
                                </h3>
                                <p className="text-sm text-gray-500">{user.department?.name} • {user.am}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                {users.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
                        <p className="text-gray-500">No employees found. Please ask an administrator to add you.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
