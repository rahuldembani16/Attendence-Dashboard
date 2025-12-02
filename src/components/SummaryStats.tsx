"use client";

import { useApp } from "@/context/AppContext";
import { format } from "date-fns";
import { Users, Building, Home, Plane, CalendarOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryStatsProps {
    currentDate: Date;
}

import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

export function SummaryStats({ currentDate }: SummaryStatsProps) {
    const { users, categories, getAttendance } = useApp();

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    // Calculate stats for the whole month
    const stats = categories.map(category => {
        let count = 0;
        users.forEach(user => {
            daysInMonth.forEach(day => {
                const dateStr = format(day, "yyyy-MM-dd");
                if (getAttendance(user.id, dateStr) === category.code) {
                    count++;
                }
            });
        });
        return {
            ...category,
            count
        };
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                    <Users className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
            </div>

            {stats.map((stat) => (
                <div key={stat.id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                    <div className={cn(
                        "p-3 rounded-full flex items-center justify-center w-12 h-12 border",
                        stat.color
                    )}>
                        <span className="text-xs font-bold">{stat.code}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
