"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Calendar, UserCircle, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../assets/logo.png";

interface NavbarProps {
    user?: {
        isAdmin: boolean;
        name?: string;
    } | null;
}

export function Navbar({ user }: NavbarProps) {
    const router = useRouter();

    const pathname = usePathname();

    if (pathname?.startsWith("/login")) {
        return (
            <nav className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <Image
                                src={logo}
                                alt="SingularLogic Logo"
                                width={180}
                                height={40}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login"); // Middleware helps, but explicit redirect is good
        router.refresh();
    };

    return (
        <nav className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="SingularLogic Logo"
                            width={180}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </div>
                    <div className="flex gap-6 items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Calendar className="h-4 w-4" />
                            Attendance
                        </Link>
                        <Link
                            href="/portal"
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <UserCircle className="h-4 w-4" />
                            Portal
                        </Link>
                        {user?.isAdmin && (
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Users className="h-4 w-4" />
                                Admin
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors border-l pl-6 ml-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
