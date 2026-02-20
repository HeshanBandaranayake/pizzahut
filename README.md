# 🍕 PizzaHut Enterprise - Restaurant Management System

A premium, role-based management system designed for high-load restaurant operations. Built with speed, security, and aesthetics in mind.

## 🚀 Key Features

### 🛡️ Role-Based Access Control (RBAC)
Tailored software experience for every staff member:
- **Admin**: Full system control, staff management, and team analytics.
- **Manager**: Operational control over orders, menu, and customers.
- **Chef**: Kitchen-focused view with orders and menu management.
- **Receptionist**: Front-desk management including customer registration and orders.

### 📦 Logistics & Ordering
- **Smart Checkout**: Context-aware fulfillment details (Table # for Dine-in, Pickup Time for Takeaway).
- **Real-time Order Tracking**: Dynamic status updates (Pending, Cooking, Ready, Delivered).
- **Branded Interface**: A custom "PizzaHut Red" aesthetic with glassmorphism and modern typography.

### 📊 Admin Dashboard
- **Quick Action Terminal**: One-click access to core business functions.
- **Team Composition**: Real-time distribution of staff roles across the store.
- **Performance Metrics**: Monitor revenue and prep times at a glance.

---

## 🔐 Credentials for Testing

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@pizzahut.com` | `password` |
| **Manager** | `manager@pizzahut.com` | `password` |
| **Chef** | `chef@pizzahut.com` | `password` |
| **Receptionist** | `reception@pizzahut.com` | `password` |

---

## 🛠️ Technology Stack
- **Backend**: Laravel 11 (PHP)
- **Frontend**: React + TypeScript + Inertia.js
- **Styling**: Tailwind CSS + Shadcn/ui
- **Icons**: Lucide React
- **Branding**: Custom PizzaHut Design System

---

## ⚡ Quick Start

1. **Install Dependencies**:
   ```bash
   composer install
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database & Seeding**:
   ```bash
   php artisan migrate --seed
   ```

4. **Launch Application**:
   ```bash
   php artisan serve
   npm run dev
   ```
