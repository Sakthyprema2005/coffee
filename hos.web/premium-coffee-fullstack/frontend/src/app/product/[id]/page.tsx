"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Heart, Share2, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { products } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Product Not Found</h1>
          <button onClick={() => router.push('/menu')} className="text-[var(--gold)] hover:underline">Return to Menu</button>
        </div>
      </div>
    );
  }

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    // Add to cart logic will go here in Phase 2
  };

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-6">
          {/* Breadcrumb & Back */}
          <div className="mb-8 flex items-center justify-between">
            <button onClick={() => router.push('/menu')} className="flex items-center gap-2 text-gray-500 hover:text-[var(--gold)] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Menu</span>
            </button>
            <div className="text-sm text-gray-400">
              Menu / <span className="text-[var(--gold)]">{product.category}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="sticky top-32"
              >
                <div className="glass-panel rounded-[2rem] overflow-hidden bg-white/50 dark:bg-[#1a120e]/50 p-4">
                  <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[1.5rem] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-3">
                      <button className="bg-white/40 dark:bg-black/40 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:text-red-500 hover:bg-white transition-all shadow-lg">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="bg-white/40 dark:bg-black/40 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:text-[var(--gold)] hover:bg-white transition-all shadow-lg">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <div className="mb-2">
                  <span className="bg-[var(--gold)]/10 text-[var(--gold)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-3xl text-[var(--gold)] font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 border-l border-gray-300 dark:border-gray-700 pl-4">
                    <Star className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" />
                    <span className="font-medium text-lg">{product.rating}</span>
                    <span className="text-gray-500 underline decoration-gray-400 underline-offset-4 cursor-pointer ml-1">
                      {product.reviews} Reviews
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-heading font-bold mb-4">Select Size</h3>
                  <div className="flex flex-wrap gap-4">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 min-w-[100px] py-3 rounded-xl border-2 transition-all font-medium ${
                          selectedSize === size
                            ? "border-[var(--gold)] bg-[var(--gold)]/5 text-[var(--gold)]"
                            : "border-gray-200 dark:border-gray-800 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra Toppings */}
                {product.toppings && product.toppings.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-lg font-heading font-bold mb-4">Add Extra Toppings</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {product.toppings.map((topping) => (
                        <button
                          key={topping}
                          onClick={() => toggleTopping(topping)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                            selectedToppings.includes(topping)
                              ? "border-[var(--gold)] bg-[var(--gold)]/5 text-[var(--gold)]"
                              : "border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-[#1a120e]"
                          }`}
                        >
                          <span className="text-sm">{topping}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            selectedToppings.includes(topping) ? "bg-[var(--gold)] border-[var(--gold)]" : "border-gray-300 dark:border-gray-700"
                          }`}>
                            {selectedToppings.includes(topping) && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="glass-panel p-6 rounded-[2rem] sticky bottom-6 z-20 flex flex-col sm:flex-row gap-4 bg-white/80 dark:bg-[#0a0503]/80 shadow-2xl">
                  {/* Quantity */}
                  <div className="flex items-center justify-between sm:justify-center bg-gray-100 dark:bg-[#1a120e] rounded-full px-2 py-2 sm:w-1/3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-white dark:bg-[#2a1c15] flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-[var(--gold)] shadow-sm"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-lg w-10 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-white dark:bg-[#2a1c15] flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-[var(--gold)] shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-grow h-14 rounded-full flex items-center justify-center gap-2 text-lg font-medium transition-all ${
                      isAdded 
                        ? "bg-green-500 text-white"
                        : "bg-[var(--gold)] text-white hover:bg-transparent hover:text-[var(--gold)] border-2 border-[var(--gold)]"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isAdded ? (
                        <motion.div
                          key="added"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-6 h-6" /> Added to Cart
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="w-5 h-5" /> Add to Cart - ${(product.price * quantity).toFixed(2)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
