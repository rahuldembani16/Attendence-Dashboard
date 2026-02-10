# 🏢 Attendance Dashboard

A full-featured **employee attendance management system**. It enables HR managers and department heads to track daily employee attendance across departments, manage users, define work-status categories, configure public holidays, and generate exportable reports — all through a modern, responsive web interface.

![Department Attendance Dashboard](public/screenshot.png)

---

## ✨ Features

### 📋 Department Attendance Grid
- **Monthly calendar view** displaying each employee's daily attendance status (On Site, Teleworking, Business Trip, Out of Office)
- **Summary statistics** showing totals per category with color-coded badges
- Month-to-month navigation with at-a-glance department overview

### 🔐 Authentication & Authorization
- Secure **JWT-based authentication** with role-based access control
- **Admin panel** for system administrators
- **Employee portal** for individual users to view and manage their own attendance

### 👥 User Management
- Create, edit, and deactivate employees
- Assign users to departments with unique employee IDs (AM)
- Set employment start/end dates

### 🏷️ Attendance Categories
- Configurable attendance status types (e.g., On Site, Teleworking, Business Trip, Out of Office)
- Custom color coding and display ordering
- Toggle categories as active/inactive

### 📅 Holiday Management
- Define public holidays with descriptions
- Support for recurring annual holidays
- Holidays are automatically reflected in the attendance grid

### 📊 Reports & Export
- Generate attendance reports with filtering options
- Export data to **Excel** via ExcelJS

---

## 🛠️ Tech Stack

| Layer          | Technology                                                     |
| -------------- | -------------------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router)                |
| **Frontend**   | [React 19](https://react.dev/), [TailwindCSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/)               |
| **Icons**      | [Lucide React](https://lucide.dev/)                           |
| **Database**   | [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM](https://www.prisma.io/) |
| **Auth**       | JWT tokens ([jose](https://github.com/panva/jose)) + [bcryptjs](https://github.com/nicolo-ribaudo/bcryptjs) |
| **Data Fetching** | [TanStack React Query](https://tanstack.com/query)         |
| **Export**     | [ExcelJS](https://github.com/exceljs/exceljs)                 |
| **Deployment** | Docker + Docker Compose                                       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **PostgreSQL** (or use the provided Docker Compose setup)

### 1. Clone the repository

```bash
git clone https://github.com/your-org/attendance-dashboard.git
cd attendance-dashboard
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and a secure JWT secret:

```env
DATABASE_URL="postgresql://admin:YOUR_SECURE_PASSWORD@localhost:5432/dashboardDB"
JWT_SECRET="CHANGE_THIS_TO_A_LONG_RANDOM_STRING"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up the database

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

A production-ready Docker setup is included:

```bash
docker compose up -d
```

This starts both the **PostgreSQL** database and the **Next.js** application. The app will be available on port `3000`.

---

## 📁 Project Structure

```
├── prisma/              # Database schema, migrations & seed script
├── public/              # Static assets
├── src/
│   ├── app/
│   │   ├── admin/       # Admin pages (users, categories, holidays, reports)
│   │   ├── api/         # REST API routes (auth, attendance, departments, etc.)
│   │   ├── login/       # Login page
│   │   └── portal/      # Employee self-service portal
│   ├── components/      # Shared React components (AttendanceGrid, Navbar, etc.)
│   ├── context/         # React context providers
│   ├── lib/             # Utility libraries (Prisma client, auth helpers)
│   └── types/           # TypeScript type definitions
├── Dockerfile           # Multi-stage production build
├── docker-compose.yml   # PostgreSQL + App orchestration
└── package.json
```

---

## 📄 License

Email: rahool.dembani16@gmail.com.
