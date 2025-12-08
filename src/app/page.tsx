"use client";

import { useState } from "react";
import { AttendanceGrid } from "@/components/AttendanceGrid";
import { SummaryStats } from "@/components/SummaryStats";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Dec 2025

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Department Attendance</h1>
      </div>
      <SummaryStats currentDate={currentDate} />
      <AttendanceGrid currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
}
