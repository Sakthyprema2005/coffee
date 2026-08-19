"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, ArrowRight, Mail, Lock, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="flex-grow flex items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[var(--gold)]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--coffee-dark)]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="w-full max-w-5xl flex flex-col-reverse md:flex-row bg-white dark:bg-[#1a120e] rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          
          {/* Form Side */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center md:text-left">
                <Coffee className="w-10 h-10 text-[var(--gold)] mb-4 mx-auto md:mx-0" />
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-500 dark:text-gray-400">Join the exclusive Lumina coffee experience.</p>
              </div>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                      placeholder="John Doe" 
                    />
                  </div>
                </div>

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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input type="checkbox" id="terms" className="w-4 h-4 mt-1 text-[var(--gold)] rounded border-gray-300 focus:ring-[var(--gold)] accent-[var(--gold)]" />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                    I agree to the <Link href="#" className="text-[var(--gold)] hover:underline">Terms of Service</Link> and <Link href="#" className="text-[var(--gold)] hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                <button type="button" className="w-full bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors flex items-center justify-center gap-2 group">
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-[var(--gold)] font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="hidden md:block w-1/2 relative bg-[var(--coffee-dark)]">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" 
              alt="Cafe Interior" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-12 flex flex-col justify-end">
              <h2 className="font-heading text-4xl text-white font-bold mb-4">A Premium Experience</h2>
              <p className="text-gray-300">Join our community of coffee lovers. Get exclusive offers, priority reservations, and much more.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
