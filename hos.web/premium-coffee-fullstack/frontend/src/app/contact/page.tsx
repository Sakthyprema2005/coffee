"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#0a0503] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            We'd love to hear from you. Reach out for any questions, feedback, or partnership inquiries.
          </motion.p>
        </div>
      </section>

      <section className="py-20 flex-grow relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-gray-500 dark:text-gray-400">123 Luxury Avenue<br />Beverly Hills, CA 90210<br />United States</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Address</h4>
                    <p className="text-gray-500 dark:text-gray-400">hello@luminacoffee.com<br />press@luminacoffee.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                    <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567<br />Mon-Fri from 8am to 6pm</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#23140a] text-white rounded-3xl p-8">
                <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--gold)]" /> Opening Hours
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="font-medium text-[var(--gold)]">07:00 AM - 08:00 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-300">Saturday</span>
                    <span className="font-medium text-[var(--gold)]">08:00 AM - 09:00 PM</span>
                  </li>
                  <li className="flex justify-between pt-1">
                    <span className="text-gray-300">Sunday</span>
                    <span className="font-medium text-[var(--gold)]">08:00 AM - 06:00 PM</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-[#1a120e] rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-3xl font-heading font-bold mb-2">Send a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white" placeholder="How can we help?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea rows={5} className="w-full bg-gray-50 dark:bg-[#0a0503] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors text-gray-900 dark:text-white resize-none" placeholder="Your message here..."></textarea>
                </div>

                <button type="button" className="w-full bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors flex items-center justify-center gap-2 group">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Mockup */}
      <section className="h-[400px] w-full bg-gray-200 dark:bg-gray-800 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 font-medium">Google Maps Integration (Phase 2)</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
