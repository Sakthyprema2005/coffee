"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ReservationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#0a0503] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-4"
          >
            Book a Table
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Experience our premium coffee and cozy ambiance. Reserve your spot for a perfect meeting or relaxation time.
          </motion.p>
        </div>
      </section>

      <section className="py-20 flex-grow relative">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white dark:bg-[#1a120e] rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 dark:border-gray-800">
            {!isSubmitted ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="date" 
                        required
                        className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select 
                        required
                        className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white appearance-none" 
                      >
                        <option value="">Select a time</option>
                        <option value="08:00">08:00 AM</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select 
                        required
                        className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white appearance-none" 
                      >
                        <option value="">Select guests</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        <option value="6">6+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" 
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Special Requests (Optional)</label>
                    <textarea 
                      rows={4}
                      placeholder="Any dietary requirements, preferred seating area, etc."
                      className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white resize-none" 
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors flex items-center justify-center gap-2 group">
                  Confirm Reservation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Reservation Confirmed!</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Thank you for booking with Lumina. We've sent a confirmation email with all the details. We look forward to serving you!</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[var(--gold)] text-white py-3 px-8 rounded-full font-medium hover:bg-[var(--gold-dark)] transition-colors"
                >
                  Make Another Booking
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
