import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        if (!from || !to) {
            return NextResponse.json(
                { error: "Date range (from, to) is required" },
                { status: 400 }
            );
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);
        // Adjust toDate to include the entire day
        toDate.setHours(23, 59, 59, 999);

        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
            include: {
                user: {
                    include: {
                        department: true,
                    },
                },
                category: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Attendance Report");

        worksheet.columns = [
            { header: "Date", key: "date", width: 15 },
            { header: "Department", key: "department", width: 20 },
            { header: "AM", key: "am", width: 10 },
            { header: "Surname", key: "surname", width: 20 },
            { header: "Name", key: "name", width: 20 },
            { header: "Category Code", key: "categoryCode", width: 15 },
            { header: "Category Label", key: "categoryLabel", width: 20 },
            { header: "Notes", key: "notes", width: 30 },
        ];

        type AttendanceWithRelations = Prisma.AttendanceGetPayload<{
            include: {
                user: {
                    include: {
                        department: true;
                    };
                };
                category: true;
            };
        }>;

        attendanceRecords.forEach((record: AttendanceWithRelations) => {
            worksheet.addRow({
                date: record.date.toISOString().split("T")[0],
                department: record.user.department.name,
                am: record.user.am,
                surname: record.user.surname,
                name: record.user.name,
                categoryCode: record.category.code,
                categoryLabel: record.category.label,
                notes: record.notes || "",
            });
        });

        // Style the header row
        worksheet.getRow(1).font = { bold: true };

        const buffer = await workbook.xlsx.writeBuffer();

        return new NextResponse(buffer, {
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="Attendance_Report_${from}_to_${to}.xlsx"`,
            },
        });
    } catch (error) {
        console.error("Error generating report:", error);
        return NextResponse.json(
            { error: "Failed to generate report" },
            { status: 500 }
        );
    }
}
