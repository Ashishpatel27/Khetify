import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Leaf, Search, ShoppingCart, Package, User, PlusCircle, Trash2, MapPin, Star, ChevronRight } from 'lucide-react';

function App() {
  const [role, setRole] = useState('consumer'); // Switch between 'farmer' or 'consumer'
  const [activeTab, setActiveTab] = useState('mandi'); 
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const placeOrder = async (p) => {
    try {
      await axios.post('http://localhost:5000/api/place-order', {
        product_id: p.id,
        quantity: "1kg",
        total_price: p.price
      });
      alert(`🎉 ${p.item_name} ka order confirm ho gaya!`);
    } catch (err) { alert("Order fail ho gaya!"); }
  };

  const filteredProducts = products.filter(p => 
    p.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* --- PREMIUM NAVBAR --- */}
      <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-green-700 font-black text-2xl tracking-tight">
          <Leaf fill="currentColor" /> KHETIFY
        </div>
        
        {/* Search Bar - Desktop */}
        <div className="hidden md:flex bg-slate-100 rounded-2xl px-4 py-2 w-1/3 border focus-within:ring-2 ring-green-500 transition-all">
          <Search size={18} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search fresh crops..." 
            className="bg-transparent outline-none text-sm w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4 items-center">
          {/* Temporary Role Switcher for Testing */}
          <select 
            onChange={(e) => setRole(e.target.value)}
            className="text-xs bg-green-50 text-green-700 border border-green-200 p-2 rounded-lg font-bold"
          >
            <option value="consumer">Consumer Mode</option>
            <option value="farmer">Farmer Mode</option>
          </select>
          <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
            {role === 'farmer' ? '👨‍🌾' : '🛒'}
          </div>
        </div>
      </nav>

      {/* --- MAIN DASHBOARD --- */}
      <main className="max-w-6xl mx-auto p-6 pb-24">
        
        {/* CONSUMER VIEW */}
        {role === 'consumer' && (
          <section>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
              Explore Today's Mandi <span className="text-sm font-normal text-slate-400">Indore, MP</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-[2rem] border p-2 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <img src={p.image_url} className="h-60 w-full object-cover rounded-[1.6rem]" alt={p.item_name} />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-green-600 font-bold text-xs uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md">Verified</span>
                      <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                        <Star size={14} fill="currentColor" /> 4.9
                      </div>
                    </div>
                    <h3 className="font-extrabold text-2xl mb-1">{p.item_name}</h3>
                    <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                      <MapPin size={14} /> Sold by {p.farmer_name} • {p.quantity}
                    </p>
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                      <p className="text-2xl font-black">₹{p.price}<span className="text-xs text-slate-400 font-medium">/kg</span></p>
                      <button 
                        onClick={() => placeOrder(p)}
                        className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart size={18} /> Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FARMER VIEW */}
        {role === 'farmer' && (
          <section className="animate-in fade-in duration-500">
            <div className="bg-green-700 text-white p-8 rounded-[2rem] mb-10 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black mb-2">Ram Singh's Dashboard</h2>
                <p className="opacity-80">Total Earnings this week: <span className="font-bold text-white text-xl">₹12,450</span></p>
              </div>
              <button className="bg-white text-green-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-green-900/20">
                <PlusCircle size={20} /> Add New Crop
              </button>
            </div>

            <h3 className="text-xl font-bold mb-6">Your Active Listings</h3>
            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
               {/* Simplified Inventory List */}
               {products.filter(p => p.farmer_name === "Ram Singh").map(p => (
                 <div className="p-4 border-b last:border-0 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={p.image_url} className="h-16 w-16 rounded-xl object-cover" alt="" />
                      <div>
                        <h4 className="font-bold">{p.item_name}</h4>
                        <p className="text-sm text-slate-400">Price: ₹{p.price}/kg | Stock: {p.quantity}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600"><Package size={18}/></button>
                      <button className="p-2 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}
      </main>

      {/* --- APP-STYLE BOTTOM NAVIGATION --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-white/20 px-8 py-4 flex gap-12 rounded-full shadow-2xl z-50 md:hidden">
        <button onClick={() => setActiveTab('mandi')} className={activeTab === 'mandi' ? 'text-green-600' : 'text-slate-400'}><Leaf /></button>
        <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'text-green-600' : 'text-slate-400'}><Package /></button>
        <button className={activeTab === 'profile' ? 'text-green-600' : 'text-slate-400'}><User /></button>
      </div>

    </div>
  );
}

export default App;