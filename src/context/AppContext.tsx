"use client";

import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, AttendanceRecord, Category, Holiday, Department } from "@/types";

interface AppContextType {
    users: User[];
    attendance: AttendanceRecord[];
    categories: Category[];
    holidays: Holiday[];
    departments: Department[];
    addUser: (user: Partial<User>) => Promise<void>;
    updateUser: (user: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    updateAttendance: (record: Partial<AttendanceRecord>) => Promise<void>;
    deleteAttendance: (userId: string, date: string) => Promise<void>;
    getAttendance: (userId: string, date: string) => string | undefined;
    addCategory: (category: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    toggleCategoryStatus: (id: string, isActive: boolean) => Promise<void>;
    addHoliday: (holiday: Partial<Holiday>) => Promise<void>;
    deleteHoliday: (id: string) => Promise<void>;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();

    // Fetch Users
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("/api/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            return res.json();
        },
    });

    // Fetch Departments
    const { data: departments = [], isLoading: departmentsLoading } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await fetch("/api/departments");
            if (!res.ok) throw new Error("Failed to fetch departments");
            return res.json();
        },
    });

    // Fetch Attendance
    const { data: attendance = [], isLoading: attendanceLoading } = useQuery({
        queryKey: ["attendance"],
        queryFn: async () => {
            const res = await fetch("/api/attendance");
            if (!res.ok) throw new Error("Failed to fetch attendance");
            return res.json();
        },
    });

    // Fetch Categories
    const { data: categories = [], isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("/api/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            return res.json();
        },
    });

    // Fetch Holidays
    const { data: holidays = [], isLoading: holidaysLoading } = useQuery({
        queryKey: ["holidays"],
        queryFn: async () => {
            const res = await fetch("/api/holidays");
            if (!res.ok) throw new Error("Failed to fetch holidays");
            return res.json();
        },
    });

    // Mutations
    const addUserMutation = useMutation({
        mutationFn: async (user: Partial<User>) => {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to add user");
            }
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    const updateUserMutation = useMutation({
        mutationFn: async (user: Partial<User>) => {
            const res = await fetch("/api/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update user");
            }
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    const deleteUserMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete user");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    const updateAttendanceMutation = useMutation({
        mutationFn: async (record: Partial<AttendanceRecord>) => {
            const res = await fetch("/api/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record),
            });
            if (!res.ok) throw new Error("Failed to update attendance");
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendance"] }),
    });

    const deleteAttendanceMutation = useMutation({
        mutationFn: async ({ userId, date }: { userId: string; date: string }) => {
            const res = await fetch(`/api/attendance?userId=${userId}&date=${date}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete attendance");
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendance"] }),
    });

    const addCategoryMutation = useMutation({
        mutationFn: async (category: Partial<Category>) => {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category),
            });
            if (!res.ok) throw new Error("Failed to add category");
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete category");
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });

    const toggleCategoryStatusMutation = useMutation({
        mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
            const res = await fetch("/api/categories/toggle", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, isActive }),
            });
            if (!res.ok) throw new Error("Failed to update category status");
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });

    const addHolidayMutation = useMutation({
        mutationFn: async (holiday: Partial<Holiday>) => {
            const res = await fetch("/api/holidays", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(holiday),
            });
            if (!res.ok) throw new Error("Failed to add holiday");
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["holidays"] }),
    });

    const deleteHolidayMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/holidays?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete holiday");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["holidays"] }),
    });

    // Helpers
    const getAttendance = (userId: string, date: string) => {
        const record = attendance.find(
            (r: AttendanceRecord) => r.userId === userId && new Date(r.date).toISOString().split("T")[0] === date
        );
        return record?.category?.code;
    };

    return (
        <AppContext.Provider
            value={{
                users,
                attendance,
                categories,
                holidays,
                departments,
                addUser: addUserMutation.mutateAsync,
                updateUser: updateUserMutation.mutateAsync,
                deleteUser: deleteUserMutation.mutateAsync,
                updateAttendance: updateAttendanceMutation.mutateAsync,
                deleteAttendance: (userId, date) => deleteAttendanceMutation.mutateAsync({ userId, date }),
                getAttendance,
                addCategory: addCategoryMutation.mutateAsync,
                deleteCategory: deleteCategoryMutation.mutateAsync,
                toggleCategoryStatus: (id, isActive) => toggleCategoryStatusMutation.mutateAsync({ id, isActive }),
                addHoliday: addHolidayMutation.mutateAsync,
                deleteHoliday: deleteHolidayMutation.mutateAsync,
                isLoading: usersLoading || attendanceLoading || categoriesLoading || holidaysLoading || departmentsLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
