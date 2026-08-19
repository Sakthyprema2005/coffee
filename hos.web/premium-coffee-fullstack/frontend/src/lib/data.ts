export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  sizes: string[];
  toppings: string[];
}

export const categories = ["All", "Hot Coffee", "Cold Brew", "Espresso", "Frappuccino", "Bakery"];

export const products: Product[] = [
  {
    id: "cappuccino-classic",
    name: "Classic Cappuccino",
    description: "A perfect balance of espresso, steamed milk, and a deep layer of foam. Rich in flavor and texture, it's the ultimate Italian classic.",
    price: 5.50,
    category: "Hot Coffee",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 128,
    sizes: ["Small", "Medium", "Large"],
    toppings: ["Extra Foam", "Vanilla Syrup", "Caramel Drizzle", "Cinnamon"]
  },
  {
    id: "vanilla-latte",
    name: "Madagascar Vanilla Latte",
    description: "Smooth espresso combined with velvety steamed milk and authentic Madagascar vanilla syrup, topped with a light layer of foam.",
    price: 6.00,
    category: "Hot Coffee",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=1000&auto=format&fit=crop",
    rating: 5.0,
    reviews: 256,
    sizes: ["Small", "Medium", "Large"],
    toppings: ["Whipped Cream", "Extra Shot", "Oat Milk"]
  },
  {
    id: "nitro-cold-brew",
    name: "Nitro Cold Brew",
    description: "Our signature cold brew infused with nitrogen the moment it's poured, creating a sweet flavor without sugar and a cascading, velvety crema.",
    price: 6.50,
    category: "Cold Brew",
    image: "https://images.unsplash.com/photo-1517701550927-30cfcb64d306?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 189,
    sizes: ["Medium", "Large"],
    toppings: ["Sweet Cream", "Caramel Cold Foam", "Ice"]
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish.",
    price: 5.75,
    category: "Hot Coffee",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 210,
    sizes: ["Small", "Medium", "Large"],
    toppings: ["Extra Caramel", "Extra Espresso Shot", "Almond Milk"]
  },
  {
    id: "iced-mocha",
    name: "Iced Dark Mocha",
    description: "Our rich, full-bodied espresso combined with bittersweet mocha sauce and milk, served over ice and topped with sweetened whipped cream.",
    price: 6.25,
    category: "Cold Brew",
    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviews: 145,
    sizes: ["Medium", "Large"],
    toppings: ["Whipped Cream", "Chocolate Shavings", "Extra Ice"]
  },
  {
    id: "double-espresso",
    name: "Double Espresso (Doppio)",
    description: "Two shots of our signature espresso roast. Rich, caramel-like sweetness and a perfect layer of crema.",
    price: 3.50,
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 340,
    sizes: ["Standard"],
    toppings: ["Splash of Milk", "Sugar Packet"]
  },
  {
    id: "matcha-frappe",
    name: "Matcha Green Tea Frappuccino",
    description: "Premium matcha green tea blended with milk and ice, topped with sweetened whipped cream to create a deliciously vibrant drink.",
    price: 6.50,
    category: "Frappuccino",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    reviews: 112,
    sizes: ["Medium", "Large"],
    toppings: ["Whipped Cream", "Extra Matcha Powder", "Soy Milk"]
  },
  {
    id: "butter-croissant",
    name: "French Butter Croissant",
    description: "A classic, all-butter crescent roll that is flaky and golden brown on the outside and soft on the inside.",
    price: 3.75,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 205,
    sizes: ["Standard"],
    toppings: ["Butter", "Strawberry Jam", "Honey"]
  }
];
