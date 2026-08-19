"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", increase: "+20.1%", icon: <DollarSign className="w-6 h-6 text-green-500" /> },
    { title: "Orders", value: "356", increase: "+15.2%", icon: <ShoppingBag className="w-6 h-6 text-blue-500" /> },
    { title: "New Customers", value: "2,450", increase: "+4.5%", icon: <Users className="w-6 h-6 text-purple-500" /> },
    { title: "Active Now", value: "42", increase: "+12.1%", icon: <TrendingUp className="w-6 h-6 text-orange-500" /> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-[#1a120e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 dark:bg-[#0a0503] rounded-xl">
                {stat.icon}
              </div>
              <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                {stat.increase} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a120e] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h2>
            <button className="text-sm font-medium text-[var(--gold)] hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-xs uppercase border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: "#ORD-001", name: "Sarah Jenkins", date: "Today, 10:24 AM", amount: "$24.50", status: "Completed" },
                  { id: "#ORD-002", name: "Michael Chen", date: "Today, 09:12 AM", amount: "$15.00", status: "Processing" },
                  { id: "#ORD-003", name: "Emma Wilson", date: "Yesterday", amount: "$42.80", status: "Completed" },
                  { id: "#ORD-004", name: "David Miller", date: "Yesterday", amount: "$12.50", status: "Pending" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                    <td className="py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">{order.name}</td>
                    <td className="py-4 text-gray-500">{order.date}</td>
                    <td className="py-4 font-medium text-gray-900 dark:text-white">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' :
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                        'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white dark:bg-[#1a120e] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Popular Items</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { name: "Vanilla Latte", sales: 124, image: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=100" },
              { name: "Nitro Cold Brew", sales: 98, image: "https://images.unsplash.com/photo-1517701550927-30cfcb64d306?q=80&w=100" },
              { name: "Butter Croissant", sales: 85, image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=100" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.sales} Sales</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-[var(--gold)]">
                  #{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
