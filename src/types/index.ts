export type Department = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type User = {
    id: string;
    am: string;
    surname: string;
    name: string;
    username: string;
    password?: string; // Optional for display, required for creation
    isAdmin: boolean;
    department: Department;
    departmentId: string;
    startDate: string;
    endDate?: string;
};

export type Category = {
    id: string;
    code: string;
    label: string;
    color: string;
    isWorkDay: boolean;
    isActive: boolean;
};

export type AttendanceRecord = {
    id?: string;
    userId: string;
    date: string; // ISO date string YYYY-MM-DD
    categoryId: string;
    category?: Category;
    notes?: string;
    status?: string; // For backward compatibility in UI helper
};

export type Holiday = {
    id: string;
    date: string; // ISO date string YYYY-MM-DD
    description: string;
    isRecurring: boolean;
};

export const STATUS_LABELS: Record<string, string> = {
    OS: "On Site",
    T: "Teleworking",
    OOO: "Out of Office",
    BT: "Business Trip",
};

export const STATUS_COLORS: Record<string, string> = {
    OS: "bg-green-100 text-green-800 border-green-200",
    T: "bg-blue-100 text-blue-800 border-blue-200",
    OOO: "bg-yellow-100 text-yellow-800 border-yellow-200",
    BT: "bg-purple-100 text-purple-800 border-purple-200",
};
