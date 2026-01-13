"use client";

import { useState } from "react";
import { AttendanceGrid } from "@/components/AttendanceGrid";
import { SummaryStats } from "@/components/SummaryStats";

import { motion } from "framer-motion";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

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
      <AttendanceGrid currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </motion.div>
  );
}
