"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, Truck, Coffee, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-12"
          >
            <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
              <span className={step >= 1 ? "text-[var(--gold)] font-bold" : "text-gray-400"}>1. Shipping</span>
              <div className={`w-12 h-px ${step >= 2 ? "bg-[var(--gold)]" : "bg-gray-300 dark:bg-gray-700"}`}></div>
              <span className={step >= 2 ? "text-[var(--gold)] font-bold" : "text-gray-400"}>2. Payment</span>
              <div className={`w-12 h-px ${step >= 3 ? "bg-[var(--gold)]" : "bg-gray-300 dark:bg-gray-700"}`}></div>
              <span className={step >= 3 ? "text-[var(--gold)] font-bold" : "text-gray-400"}>3. Review</span>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form Section */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-[#1a120e] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                
                {/* Step 1: Shipping */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                      <Truck className="text-[var(--gold)]" /> Shipping Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                        <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                        <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="Doe" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input type="email" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="john@example.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                        <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="123 Coffee Lane" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                        <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="Beverly Hills" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
                        <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="90210" />
                      </div>
                    </div>
                    
                    <button onClick={() => setStep(2)} className="w-full bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors">
                      Continue to Payment
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                      <CreditCard className="text-[var(--gold)]" /> Payment Method
                    </h2>
                    
                    <div className="space-y-4 mb-8">
                      {/* Stripe Option */}
                      <label className={`block relative p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-[var(--gold)]' : 'border-gray-400'}`}>
                              {paymentMethod === 'stripe' && <div className="w-3 h-3 rounded-full bg-[var(--gold)]"></div>}
                            </div>
                            <span className="font-bold text-lg">Credit / Debit Card (Stripe)</span>
                          </div>
                          <div className="flex gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                          </div>
                        </div>
                        <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} className="hidden" />
                      </label>

                      {/* Razorpay Option */}
                      <label className={`block relative p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-[var(--gold)]' : 'border-gray-400'}`}>
                            {paymentMethod === 'razorpay' && <div className="w-3 h-3 rounded-full bg-[var(--gold)]"></div>}
                          </div>
                          <span className="font-bold text-lg">UPI / Net Banking (Razorpay)</span>
                        </div>
                        <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="hidden" />
                      </label>
                      
                      {/* COD Option */}
                      <label className={`block relative p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[var(--gold)]' : 'border-gray-400'}`}>
                            {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-[var(--gold)]"></div>}
                          </div>
                          <span className="font-bold text-lg">Cash on Delivery</span>
                        </div>
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="w-1/3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        Back
                      </button>
                      <button onClick={() => setStep(3)} className="w-2/3 bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors">
                        Review Order
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review & Success */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">Ready to Complete!</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Your order is ready. Click the button below to confirm and place your order. (Mock Checkout for Phase 1)</p>
                    
                    <button onClick={() => alert("Order Placed Successfully!")} className="bg-[var(--gold)] text-white py-4 px-10 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all">
                      Place Order
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-[#23140a] text-white rounded-3xl p-8 sticky top-32">
                <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-[var(--gold)]" /> Your Order
                </h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=100" alt="Coffee" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Classic Cappuccino</h4>
                        <p className="text-xs text-gray-400">Qty: 2 | Medium</p>
                      </div>
                    </div>
                    <span className="font-bold text-[var(--gold)]">$11.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517701550927-30cfcb64d306?q=80&w=100" alt="Coffee" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Nitro Cold Brew</h4>
                        <p className="text-xs text-gray-400">Qty: 1 | Large</p>
                      </div>
                    </div>
                    <span className="font-bold text-[var(--gold)]">$6.50</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Subtotal</span>
                    <span>$17.50</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Tax (8%)</span>
                    <span>$1.40</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-[var(--gold)]">$18.90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
