"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Search, Heart, Plus, Star, StarHalf, Filter, X, Coffee } from "lucide-react";
import { products, categories } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (gridRef.current && filteredProducts.length > 0) {
      const cards = gsap.utils.toArray('.menu-card');
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", overwrite: true }
      );
    }
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      {/* Menu Hero Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#0a0503] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Explore our curated selection of artisanal coffees, delicate pastries, and signature beverages.
          </motion.p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16 flex-grow relative">
        <div className="container mx-auto px-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            
            {/* Desktop Categories */}
            <div className="hidden md:flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? "bg-[var(--gold)] text-white border-[var(--gold)]" 
                      : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden w-full flex justify-between items-center px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-medium"
            >
              <span>{activeCategory}</span>
              <Filter className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search menu..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-12 pr-4 py-3 rounded-full bg-transparent border border-gray-300 dark:border-gray-700 focus:border-[var(--gold)] focus:outline-none transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden mb-8"
              >
                <div className="flex flex-col gap-2 bg-white dark:bg-[#1a120e] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                      className={`text-left px-4 py-3 rounded-xl transition-colors ${activeCategory === cat ? "bg-[var(--gold)]/10 text-[var(--gold)] font-medium" : "text-gray-600 dark:text-gray-400"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="menu-card glass-panel rounded-3xl p-5 group flex flex-col h-full bg-white dark:bg-transparent">
                  <div className="relative h-56 mb-5 rounded-2xl overflow-hidden bg-[var(--coffee-light)] dark:bg-[#1a120e] flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button className="absolute top-3 right-3 bg-white/40 dark:bg-black/40 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center z-10 text-gray-700 dark:text-white hover:text-red-500 hover:bg-white transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <Link href={`/product/${product.id}`} className="hover:text-[var(--gold)] transition-colors">
                        <h3 className="font-heading text-xl font-bold leading-tight">{product.name}</h3>
                      </Link>
                      <span className="text-[var(--gold)] font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center text-[var(--gold)]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-gray-600 dark:text-gray-300 text-xs ml-1 font-medium">{product.rating} <span className="text-gray-400 font-normal">({product.reviews})</span></span>
                    </div>
                    <Link href={`/product/${product.id}`} className="bg-[var(--coffee-dark)] dark:bg-[var(--coffee-light)] text-white dark:text-black hover:bg-[var(--gold)] dark:hover:bg-[var(--gold)] hover:text-white transition-colors text-xs font-medium px-4 py-2 rounded-full">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <Coffee className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2">No items found</h3>
                <p className="text-gray-500">We couldn't find anything matching your search.</p>
                <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="mt-6 text-[var(--gold)] font-medium hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
