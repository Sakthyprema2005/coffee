"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";

export default function CartPage() {
  // Mock cart items based on our products
  const [cartItems, setCartItems] = useState([
    { ...products[0], cartId: "1", quantity: 2, selectedSize: "Medium", selectedToppings: ["Vanilla Syrup"] },
    { ...products[2], cartId: "2", quantity: 1, selectedSize: "Large", selectedToppings: [] }
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-10 text-center"
          >
            Your Cart
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Cart Items List */}
              <div className="lg:w-2/3">
                <div className="bg-white dark:bg-[#1a120e] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>

                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.cartId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8 last:mb-0 pb-8 last:pb-0 border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-6 flex gap-4">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-heading font-bold text-lg leading-tight mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">Size: {item.selectedSize}</p>
                            {item.selectedToppings.length > 0 && (
                              <p className="text-xs text-gray-400">Additions: {item.selectedToppings.join(", ")}</p>
                            )}
                            <div className="mt-2 text-[var(--gold)] font-bold md:hidden">${item.price.toFixed(2)}</div>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 md:col-span-3 flex justify-between md:justify-center items-center">
                          <span className="md:hidden text-sm font-semibold text-gray-500 uppercase">Quantity:</span>
                          <div className="flex items-center bg-gray-100 dark:bg-[#0a0503] rounded-full px-1 py-1 border border-gray-200 dark:border-gray-800">
                            <button 
                              onClick={() => updateQuantity(item.cartId, -1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[var(--gold)] hover:bg-white dark:hover:bg-[#1a120e] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[var(--gold)] hover:bg-white dark:hover:bg-[#1a120e] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center gap-4">
                          <span className="hidden md:block font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => removeItem(item.cartId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 md:p-0 flex items-center gap-2 md:gap-0"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span className="md:hidden text-sm">Remove</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#23140a] text-white rounded-3xl p-8 sticky top-32"
                >
                  <h3 className="font-heading text-2xl font-bold mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Estimated Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 pb-4 border-b border-white/10">
                      <span>Delivery</span>
                      <span className="text-[var(--gold)]">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-2">
                      <span>Total</span>
                      <span className="text-[var(--gold)]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Promo Code" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--gold)] hover:text-white transition-colors px-2">
                        Apply
                      </button>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-[var(--gold)] text-white py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[var(--gold)] transition-colors">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 glass-panel rounded-3xl max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-[var(--coffee-light)] dark:bg-[var(--coffee-dark)] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-[var(--gold)]" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any of our delicious coffees to your cart yet.</p>
              <Link href="/menu" className="inline-flex items-center gap-2 bg-[var(--gold)] text-white py-3 px-8 rounded-full font-medium hover:bg-[var(--gold-dark)] transition-colors">
                Explore Menu
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
