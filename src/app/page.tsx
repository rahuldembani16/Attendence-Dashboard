"use client";

import { useState } from "react";
import { AttendanceGrid } from "@/components/AttendanceGrid";
import { SummaryStats } from "@/components/SummaryStats";
import { useApp } from "@/context/AppContext";

import { motion } from "framer-motion";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isLoading } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Department Attendance</h1>
      </div>
      <SummaryStats currentDate={currentDate} />
      {isLoading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border">
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm">Loading attendance data…</span>
          </div>
        </div>
      ) : (
        <AttendanceGrid currentDate={currentDate} setCurrentDate={setCurrentDate} />
      )}
    </motion.div>
  );
}
