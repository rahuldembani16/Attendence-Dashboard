"use client";

import { useApp } from "@/context/AppContext";
import { format } from "date-fns";
import { Users, Building, Home, Plane, CalendarOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryStatsProps {
    currentDate: Date;
}

import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

import { motion } from "framer-motion";

export function SummaryStats({ currentDate }: SummaryStatsProps) {
    const { users, categories, holidays, getAttendance } = useApp();

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    // Calculate stats for the whole month
    const activeCategories = categories.filter(c => c.isActive !== false);

    const isHoliday = (date: Date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        return holidays.some((h) => h.date.split("T")[0] === dateStr);
    };

    const stats = activeCategories.map(category => {
        let count = 0;
        users.forEach(user => {
            daysInMonth.forEach(day => {
                // Skip holidays checks
                if (isHoliday(day)) return;

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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
            <motion.div
                variants={item}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4 cursor-pointer"
            >
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                    <Users className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
            </motion.div>

            {stats.map((stat) => (
                <motion.div
                    key={stat.id}
                    variants={item}
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4 cursor-pointer"
                >
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
                </motion.div>
            ))}
        </motion.div>
    );
}
