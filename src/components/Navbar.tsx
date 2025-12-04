import Image from "next/image";
import Link from "next/link";
import { Users, Calendar, UserCircle } from "lucide-react";

export function Navbar() {
    return (
        <nav className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="SingularLogic Logo"
                            width={180}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </div>
                    <div className="flex gap-6">
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
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Users className="h-4 w-4" />
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
