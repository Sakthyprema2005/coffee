"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, ArrowRight, Mail, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="flex-grow flex items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--gold)]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coffee-dark)]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white dark:bg-[#1a120e] rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          
          {/* Image Side */}
          <div className="hidden md:block w-1/2 relative bg-[var(--coffee-dark)]">
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop" 
              alt="Coffee Beans" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-12 flex flex-col justify-end">
              <h2 className="font-heading text-4xl text-white font-bold mb-4">Welcome Back to Lumina</h2>
              <p className="text-gray-300">Log in to access your saved favorites, view past orders, and manage your premium coffee subscriptions.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center md:text-left">
                <Coffee className="w-10 h-10 text-[var(--gold)] mb-4 mx-auto md:mx-0" />
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Sign In</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                      placeholder="you@example.com" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <Link href="#" className="text-sm text-[var(--gold)] hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="w-4 h-4 text-[var(--gold)] rounded border-gray-300 focus:ring-[var(--gold)] accent-[var(--gold)]" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                    Remember me for 30 days
                  </label>
                </div>

                <button type="button" className="w-full bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors flex items-center justify-center gap-2 group">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-[var(--gold)] font-medium hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}
