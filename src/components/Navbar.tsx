import Link from "next/link";
import { LayoutDashboard, Users, Calendar, UserCircle } from "lucide-react";

export function Navbar() {
    return (
        <nav className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-blue-600" />
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            SingularLogic
                        </span>
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
