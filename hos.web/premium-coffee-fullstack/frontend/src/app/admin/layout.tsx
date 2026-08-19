"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Coffee, 
  Users, 
  ShoppingCart, 
  CalendarDays,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Orders", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
  { name: "Products", href: "/admin/products", icon: <Coffee className="w-5 h-5" /> },
  { name: "Customers", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
  { name: "Reservations", href: "/admin/reservations", icon: <CalendarDays className="w-5 h-5" /> },
  { name: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0503] flex">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#1a120e] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-20 flex items-center px-8 border-b border-gray-200 dark:border-gray-800 justify-between">
          <Link href="/admin" className="font-heading text-2xl font-bold flex items-center gap-2">
            <Coffee className="w-6 h-6 text-[var(--gold)]" />
            <span>Admin</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[var(--gold)]/10 text-[var(--gold)] font-medium" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-[#1a120e] border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-[var(--gold)]">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative text-gray-500 hover:text-[var(--gold)] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1a120e]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-200 dark:border-gray-800">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=c5a059&color=fff" alt="Admin" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
