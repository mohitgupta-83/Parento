"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { OrderRecord } from "@/lib/database";
import { ProductSetting } from "@/lib/products-store";
import {
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Search,
  MessageCircle,
  Download,
  RefreshCw,
  TrendingUp,
  DollarSign,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Sliders,
  Code,
  Save,
  Check,
  Tag,
  Activity,
  Layers,
  HelpCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "pixel-guide">("orders");
  
  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [filter, setFilter] = useState<"all" | "paid" | "abandoned">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Products & Pixel State
  const [products, setProducts] = useState<ProductSetting[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [saveSuccessSlug, setSaveSuccessSlug] = useState<string | null>(null);

  // Editable Form State per product
  const [formState, setFormState] = useState<Record<string, { price: number; originalPrice: number; pixelId: string }>>({});

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        
        // Initialize form state
        const initialForm: Record<string, { price: number; originalPrice: number; pixelId: string }> = {};
        data.products.forEach((p: ProductSetting) => {
          initialForm[p.slug] = {
            price: p.price,
            originalPrice: p.originalPrice,
            pixelId: p.pixelId || "",
          };
        });
        setFormState(initialForm);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const handleProductSave = async (slug: string) => {
    const current = formState[slug];
    if (!current) return;

    setSavingSlug(slug);
    setSaveSuccessSlug(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          price: current.price,
          originalPrice: current.originalPrice,
          pixelId: current.pixelId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSaveSuccessSlug(slug);
        setTimeout(() => setSaveSuccessSlug(null), 3000);
        fetchProducts(); // Refresh list
      } else {
        alert("Error saving settings: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("Failed to save product settings.");
    } finally {
      setSavingSlug(null);
    }
  };

  // Filter & Search Logic for Orders
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "paid"
        ? order.payment_status === "paid"
        : order.payment_status === "abandoned" || order.payment_status === "created";

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.customer_name?.toLowerCase().includes(query) ||
      order.email?.toLowerCase().includes(query) ||
      order.phone?.includes(query) ||
      order.order_id?.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  // Calculate Metrics
  const paidOrders = orders.filter((o) => o.payment_status === "paid");
  const abandonedOrders = orders.filter(
    (o) => o.payment_status === "abandoned" || o.payment_status === "created"
  );
  const totalRevenue = paidOrders.reduce((acc, o) => acc + (o.amount || siteConfig.product.price), 0);
  const conversionRate =
    orders.length > 0 ? Math.round((paidOrders.length / orders.length) * 100) : 0;

  // Export CSV Helper
  const exportCSV = () => {
    if (filteredOrders.length === 0) return;

    const headers = ["Customer Name", "Email", "Phone", "Status", "Amount", "Order ID", "Payment ID", "Date"];
    const rows = filteredOrders.map((o) => [
      `"${o.customer_name}"`,
      `"${o.email}"`,
      `"${o.phone}"`,
      `"${o.payment_status}"`,
      `"${o.amount}"`,
      `"${o.order_id}"`,
      `"${o.payment_id || ""}"`,
      `"${o.created_at ? new Date(o.created_at).toLocaleString("en-IN") : ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Parento_Orders_${filter}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#1A1A2E] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* ── Top Header Bar ───────────────────────────────── */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF8A00] to-[#FF5500] flex items-center justify-center shadow-md shadow-[#FF8A00]/20 text-white font-bold text-2xl">
              P
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1A1A2E]">{siteConfig.brand.name} Admin Panel</h1>
              <p className="text-xs text-gray-500 font-medium">
                Manage Orders, Prices & Product-Specific Facebook Meta Pixel Tracking
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "orders" ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500 hover:text-[#1A1A2E]"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#FF8A00]" /> Orders & Checkouts ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "products" ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500 hover:text-[#1A1A2E]"
              }`}
            >
              <Sliders className="w-4 h-4 text-[#4CAF50]" /> Prices & Meta Pixels
            </button>

            <button
              onClick={() => setActiveTab("pixel-guide")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "pixel-guide" ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500 hover:text-[#1A1A2E]"
              }`}
            >
              <Activity className="w-4 h-4 text-[#3B82F6]" /> Pixel Event Guide
            </button>
          </div>
        </div>

        {/* ── TAB 1: ORDERS & ABANDONED RECOVERY ────────────── */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-green-600">₹{totalRevenue}</div>
                <p className="text-xs text-gray-400 mt-1">{paidOrders.length} successful payments</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Paid Orders</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">{paidOrders.length}</div>
                <p className="text-xs text-gray-400 mt-1">Completed purchases</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Abandoned</span>
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <UserX className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#FF8A00]">{abandonedOrders.length}</div>
                <p className="text-xs text-gray-400 mt-1">Unfinished checkouts</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-blue-600">{conversionRate}%</div>
                <p className="text-xs text-gray-400 mt-1">Paid / Total Checkouts</p>
              </div>
            </div>

            {/* Filter Tabs & Actions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto">
                  <button
                    onClick={() => setFilter("all")}
                    className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      filter === "all" ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500 hover:text-[#1A1A2E]"
                    }`}
                  >
                    All Checkouts ({orders.length})
                  </button>
                  <button
                    onClick={() => setFilter("paid")}
                    className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      filter === "paid" ? "bg-green-600 text-white shadow-sm" : "text-gray-500 hover:text-green-600"
                    }`}
                  >
                    Paid Orders ({paidOrders.length})
                  </button>
                  <button
                    onClick={() => setFilter("abandoned")}
                    className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      filter === "abandoned" ? "bg-[#FF8A00] text-white shadow-sm" : "text-gray-500 hover:text-[#FF8A00]"
                    }`}
                  >
                    Abandoned ({abandonedOrders.length})
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search customer, phone, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-xs text-[#1A1A2E]"
                    />
                  </div>

                  <button
                    onClick={fetchOrders}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-[#FF8A00] hover:text-[#FF8A00] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-white"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingOrders ? "animate-spin" : ""}`} />
                  </button>

                  <button
                    onClick={exportCSV}
                    className="px-3.5 py-2 rounded-xl bg-[#1A1A2E] text-white hover:bg-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {isLoadingOrders ? (
                <div className="p-12 text-center">
                  <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">Loading order records from database...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-gray-700">No Orders Found</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {searchQuery
                      ? "No checkouts match your search query."
                      : filter === "abandoned"
                      ? "No abandoned checkouts recorded yet."
                      : "No checkouts recorded yet."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase font-semibold text-[11px] tracking-wider">
                        <th className="py-4 px-6">Customer Name</th>
                        <th className="py-4 px-6">Contact Info</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Amount</th>
                        <th className="py-4 px-6">Order & Payment ID</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.map((order, idx) => {
                        const isPaid = order.payment_status === "paid";
                        const formattedPhone = order.phone.replace(/[^0-9]/g, "");
                        const whatsappMsg = `Hi ${order.customer_name}! I noticed you started ordering on Parento. Would you like any help completing your order?`;
                        const whatsappUrl = `https://wa.me/91${formattedPhone}?text=${encodeURIComponent(whatsappMsg)}`;

                        return (
                          <tr key={order.id || order.order_id || idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-6 font-bold text-[#1A1A2E]">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8A00] to-[#FF5500] text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                                  {order.customer_name?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <span>{order.customer_name}</span>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{order.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{order.phone}</span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              {isPaid ? (
                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold text-[11px] border border-green-200">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-orange-50 text-[#FF8A00] px-3 py-1 rounded-full font-bold text-[11px] border border-orange-200">
                                  <AlertCircle className="w-3.5 h-3.5" /> Abandoned
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-6 font-extrabold text-[#1A1A2E] text-sm">
                              ₹{order.amount || siteConfig.product.price}
                            </td>

                            <td className="py-4 px-6 font-mono text-[11px] text-gray-500">
                              <div><span className="text-gray-400">Order:</span> {order.order_id}</div>
                              {order.payment_id && (
                                <div className="text-green-600"><span className="text-gray-400">Pay:</span> {order.payment_id}</div>
                              )}
                            </td>

                            <td className="py-4 px-6 text-gray-500 text-[11px]">
                              {order.created_at
                                ? new Date(order.created_at).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })
                                : "Just now"}
                            </td>

                            <td className="py-4 px-6 text-right">
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" /> Follow Up
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: META PIXEL MANAGEMENT ─────────────────── */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-1">
                Facebook Meta Pixel Configuration
              </h2>
              <p className="text-xs text-gray-500">
                Configure Facebook Meta Pixel IDs independently for each product page. Tracks PageView, ViewContent, InitiateCheckout &amp; Purchase events.
              </p>
            </div>

            {isLoadingProducts ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-500">Loading Meta Pixel settings...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {products.map((product) => {
                  const form = formState[product.slug] || {
                    pixelId: product.pixelId,
                  };
                  const isSaving = savingSlug === product.slug;
                  const isSuccess = saveSuccessSlug === product.slug;
                  const displayPrice = product.slug === "baby-food-gain-recipe" ? 299 : 199;
                  const displayOriginalPrice = product.slug === "baby-food-gain-recipe" ? 499 : 1999;

                  return (
                    <div
                      key={product.slug}
                      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-[#FF8A00]" />
                            <span className="font-extrabold text-sm text-[#1A1A2E]">
                              {product.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            /{product.slug}
                          </span>
                        </div>

                        {/* Price Badge Info */}
                        <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-600">Product Price</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-extrabold text-[#FF8A00]">
                              ₹{displayPrice}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{displayOriginalPrice}
                            </span>
                          </div>
                        </div>

                        {/* Facebook Meta Pixel ID Input */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                            <span>Facebook Meta Pixel ID</span>
                            <span className="text-[10px] text-gray-400 font-normal">e.g. 123456789012345</span>
                          </label>
                          <div className="relative">
                            <Code className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={form.pixelId}
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [product.slug]: {
                                    ...form,
                                    pixelId: e.target.value,
                                  },
                                })
                              }
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-mono text-[#1A1A2E] outline-none"
                              placeholder="Enter FB Pixel ID for this product page"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={() => handleProductSave(product.slug)}
                        disabled={isSaving}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isSuccess
                            ? "bg-green-600 text-white"
                            : "bg-[#1A1A2E] hover:bg-gray-800 text-white shadow-md"
                        }`}
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Saving Pixel ID...
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="w-4 h-4" /> Meta Pixel Saved Successfully!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" /> Save Meta Pixel Setting
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: META PIXEL EVENT TRACKING GUIDE ────────── */}
        {activeTab === "pixel-guide" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-1 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" /> Facebook Meta Pixel Event Tracking Setup
              </h2>
              <p className="text-xs text-gray-500">
                All standard e-commerce events are automatically fired using the configured Meta Pixel ID for each product page.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A2E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> PageView
                </div>
                <p className="text-xs text-gray-500">
                  Fired automatically on every page load when a Pixel ID is set.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A2E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> ViewContent
                </div>
                <p className="text-xs text-gray-500">
                  Fired when a user views a product page, sending <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">content_name</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">value</code>, and <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">currency: 'INR'</code>.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A2E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> InitiateCheckout
                </div>
                <p className="text-xs text-gray-500">
                  Fired when a user clicks any &quot;Buy Now&quot; button and opens the checkout modal.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A2E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Purchase
                </div>
                <p className="text-xs text-gray-500">
                  Fired on the Thank You page when a payment is verified successfully, sending <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">value</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">currency</code>, and <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">order_id</code>.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-xs text-blue-900 space-y-2">
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" /> How to Verify Pixel Tracking
              </h4>
              <p>
                1. Install the <strong>Meta Pixel Helper</strong> Chrome Extension.
              </p>
              <p>
                2. Enter your Meta Pixel ID for each product in Tab 2 above and click <strong>Save Settings</strong>.
              </p>
              <p>
                3. Open the product page or complete a test checkout. Meta Pixel Helper will highlight active events in real-time!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
