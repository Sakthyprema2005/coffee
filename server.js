import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const resFile = path.join(dataDir, 'reservations.json');
const subFile = path.join(dataDir, 'subscribers.json');
const ordersFile = path.join(dataDir, 'orders.json');

if (!fs.existsSync(resFile)) fs.writeFileSync(resFile, JSON.stringify([]));
if (!fs.existsSync(subFile)) fs.writeFileSync(subFile, JSON.stringify([]));
if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, JSON.stringify([]));

// Products DB
const PRODUCTS = [
  {
    id: 1,
    name: 'Night Garden',
    origin: 'Ethiopia / Yirgacheffe / Kochere',
    price: 48,
    unit: '200g',
    image: 'assets/prod_eth.jpg',
    flavorNotes: ['Blueberry', 'Jasmine', 'Dark Chocolate'],
    badge: 'Limited Micro-Lot',
    rating: 4.9,
    description: 'A washed Ethiopian lot from the legendary Kochere zone. Extraordinary floral aromatics give way to vivid blueberry sweetness and a dark chocolate finish that lingers for minutes.',
    specs: {
      altitude: '1,800 - 2,200 masl',
      process: 'Washed / Slow Sun Dried',
      harvest: 'November 2024',
      roast: 'Light Filter',
      varietal: 'JARC 74110 & 74112',
      cuppingScore: '91.5 pts'
    },
    flavors: [
      { name: 'Blueberry', value: 88 },
      { name: 'Jasmine', value: 72 },
      { name: 'Dark Chocolate', value: 65 },
      { name: 'Acidity Brightness', value: 90 }
    ]
  },
  {
    id: 2,
    name: 'Amber Hours',
    origin: 'Colombia / Huila / La Plata',
    price: 42,
    unit: '200g',
    image: 'assets/prod_col.jpg',
    flavorNotes: ['Caramel', 'Red Apple', 'Brown Sugar'],
    badge: 'Single Producer',
    rating: 4.8,
    description: 'A honey-processed lot from a single family farm in La Plata. Ripe caramel apple transitions to rich brown sugar sweetness with a lingering, impossibly clean finish.',
    specs: {
      altitude: '1,650 - 1,850 masl',
      process: 'Yellow Honey Ferment',
      harvest: 'October 2024',
      roast: 'Light-Medium',
      varietal: 'Castillo & Caturra',
      cuppingScore: '89.5 pts'
    },
    flavors: [
      { name: 'Caramel', value: 85 },
      { name: 'Red Apple', value: 70 },
      { name: 'Brown Sugar', value: 80 },
      { name: 'Body Weight', value: 75 }
    ]
  },
  {
    id: 3,
    name: 'Silent Peak',
    origin: 'Panama / Boquete / Finca Lerida',
    price: 120,
    unit: '100g',
    image: 'assets/prod_pan.jpg',
    flavorNotes: ['Peach', 'Earl Grey', 'Bergamot'],
    badge: 'Reserve Geisha',
    rating: 5.0,
    description: 'The Geisha variety from the historic Finca Lerida estate. Transcendent peach blossom, bergamot, and a sweetness so refined it borders on the ethereal. Our rarest lot.',
    specs: {
      altitude: '1,600 - 1,700 masl',
      process: 'Natural Anaerobic 96h',
      harvest: 'February 2025',
      roast: 'Ultra Light Filter',
      varietal: 'Geisha (Panama)',
      cuppingScore: '94.2 pts'
    },
    flavors: [
      { name: 'Peach Blossom', value: 92 },
      { name: 'Bergamot', value: 85 },
      { name: 'Floral Aromatics', value: 95 },
      { name: 'Complexity', value: 98 }
    ]
  },
  {
    id: 4,
    name: 'Eclipse Velvet',
    origin: 'Kenya / Nyeri / Mount Kenya',
    price: 54,
    unit: '200g',
    image: 'assets/prod_eth.jpg',
    flavorNotes: ['Blackcurrant', 'Ruby Grapefruit', 'Brown Sugar'],
    badge: 'Highland AA Lot',
    rating: 4.9,
    description: 'Cultivated on the volcanic red soil of Mount Kenya. Explosive blackcurrant vibrancy backed by rich sugarcane sweetness and a sparkling, clean acidity.',
    specs: {
      altitude: '1,750 - 1,900 masl',
      process: 'Double Washed',
      harvest: 'December 2024',
      roast: 'Light Filter',
      varietal: 'SL28 & SL34',
      cuppingScore: '92.0 pts'
    },
    flavors: [
      { name: 'Blackcurrant', value: 94 },
      { name: 'Grapefruit', value: 88 },
      { name: 'Sugarcane', value: 85 },
      { name: 'Vibrancy', value: 92 }
    ]
  },
  {
    id: 5,
    name: 'Golden Terroir',
    origin: 'Guatemala / Antigua / Volcán de Fuego',
    price: 46,
    unit: '200g',
    image: 'assets/prod_col.jpg',
    flavorNotes: ['Milk Chocolate', 'Candied Orange', 'Hazelnut'],
    badge: 'Volcanic Estate',
    rating: 4.8,
    description: 'Sheltered by three majestic volcanoes in the Antigua valley. Silky milk chocolate body layered with sweet candied orange peel and delicate toasted praline.',
    specs: {
      altitude: '1,600 - 1,800 masl',
      process: 'Washed / Sun Patio Dried',
      harvest: 'January 2025',
      roast: 'Light-Medium',
      varietal: 'Bourbon & Caturra',
      cuppingScore: '90.5 pts'
    },
    flavors: [
      { name: 'Milk Chocolate', value: 90 },
      { name: 'Candied Orange', value: 82 },
      { name: 'Hazelnut', value: 86 },
      { name: 'Balance', value: 89 }
    ]
  },
  {
    id: 6,
    name: 'Highland Mist',
    origin: 'Yemen / Haraz Mountains / Terrace Farm',
    price: 88,
    unit: '150g',
    image: 'assets/prod_pan.jpg',
    flavorNotes: ['Dried Fig', 'Cardamom', 'Wild Honey'],
    badge: 'Ancient Heirloom',
    rating: 5.0,
    description: 'Sourced from millennia-old stepped mountain terraces in Haraz. Complex dried fig richness intertwined with exotic cardamom spice and raw golden honey sweetness.',
    specs: {
      altitude: '2,100 - 2,400 masl',
      process: 'Natural Sun Dried on Rooftops',
      harvest: 'November 2024',
      roast: 'Light Filter',
      varietal: 'Ancient Udaini',
      cuppingScore: '93.8 pts'
    },
    flavors: [
      { name: 'Dried Fig', value: 95 },
      { name: 'Cardamom', value: 89 },
      { name: 'Wild Honey', value: 92 },
      { name: 'Complexity', value: 96 }
    ]
  }
];

// API Endpoints
app.get('/api/products', (req, res) => {
  res.json({ success: true, count: PRODUCTS.length, data: PRODUCTS });
});

app.get('/api/products/:id', (req, res) => {
  const prod = PRODUCTS.find(p => p.id === parseInt(req.params.id));
  if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: prod });
});

app.post('/api/reserve', (req, res) => {
  try {
    const { name, email, date, session, notes } = req.body;
    if (!name || !email || !date || !session) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
    }

    const reservations = JSON.parse(fs.readFileSync(resFile, 'utf8'));
    const refCode = 'OBS-' + Math.floor(100000 + Math.random() * 900000);
    const newReservation = {
      id: Date.now(),
      refCode,
      name,
      email,
      date,
      session,
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);
    fs.writeFileSync(resFile, JSON.stringify(reservations, null, 2));

    console.log(`[API] New Reservation created: ${refCode} for ${name}`);
    res.json({
      success: true,
      message: 'Reservation confirmed successfully!',
      refCode,
      details: newReservation
    });
  } catch (err) {
    console.error('[API Error]', err);
    res.status(500).json({ success: false, message: 'Failed to record reservation' });
  }
});

app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const subscribers = JSON.parse(fs.readFileSync(subFile, 'utf8'));
    if (!subscribers.some(s => s.email === email)) {
      subscribers.push({ email, subscribedAt: new Date().toISOString() });
      fs.writeFileSync(subFile, JSON.stringify(subscribers, null, 2));
    }

    res.json({ success: true, message: 'Thank you for subscribing to OBSIDIAN Private Journal.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to subscribe' });
  }
});

app.post('/api/order', (req, res) => {
  try {
    const { items, customer } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = {
      orderId,
      items,
      customer: customer || { name: 'Valued Guest' },
      totalAmount,
      currency: 'USD',
      status: 'Confirmed',
      placedAt: new Date().toISOString()
    };

    orders.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    res.json({
      success: true,
      message: 'Your order has been placed successfully!',
      orderId,
      totalAmount,
      details: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Order processing failed.' });
  }
});

// Page Routing
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/collection', (req, res) => res.sendFile(path.join(__dirname, 'collection.html')));
app.get('/process', (req, res) => res.sendFile(path.join(__dirname, 'process.html')));
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, 'gallery.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(` OBSIDIAN Specialty Coffee Server running on:`);
  console.log(` http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
