"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { OrderRecord } from "@/lib/database";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "paid" | "abandoned">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter & Search Logic
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
      <div className="mx-auto max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center shadow-md shadow-[#FF8A00]/20 text-white font-bold text-xl">
                P
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">{siteConfig.brand.name} Admin Dashboard</h1>
                <p className="text-xs text-gray-500 font-medium">
                  Track Paid Orders & Abandoned Checkouts
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#FF8A00] hover:text-[#FF8A00] text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer bg-white"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-[#1A1A2E] text-white hover:bg-gray-800 text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Revenue */}
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

          {/* Paid Orders */}
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

          {/* Abandoned Checkouts */}
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

          {/* Conversion Rate */}
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

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === "all" ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500 hover:text-[#1A1A2E]"
                }`}
              >
                All Checkouts ({orders.length})
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === "paid" ? "bg-green-600 text-white shadow-sm" : "text-gray-500 hover:text-green-600"
                }`}
              >
                Paid Orders ({paidOrders.length})
              </button>
              <button
                onClick={() => setFilter("abandoned")}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === "abandoned" ? "bg-[#FF8A00] text-white shadow-sm" : "text-gray-500 hover:text-[#FF8A00]"
                }`}
              >
                Abandoned ({abandonedOrders.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-xs text-[#1A1A2E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 text-[#FF8A00] animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-500">Loading order records from Supabase...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700">No Orders Found</h3>
              <p className="text-xs text-gray-500 mt-1">
                {searchQuery
                  ? "No checkouts match your search query."
                  : filter === "abandoned"
                  ? "Great news! No abandoned checkouts found."
                  : "No checkouts recorded yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-4 px-6">Customer Details</th>
                    <th className="py-4 px-6">Contact Info</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Order & Payment ID</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-[#1A1A2E] text-right px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order, idx) => {
                    const isPaid = order.payment_status === "paid";
                    const formattedPhone = order.phone.replace(/[^0-9]/g, "");
                    const whatsappMsg = `Hi ${order.customer_name}! I noticed you started ordering the Parento 15,000+ Kids Worksheet Bundle on our website. Would you like any help completing your order?`;
                    const whatsappUrl = `https://wa.me/91${formattedPhone}?text=${encodeURIComponent(whatsappMsg)}`;

                    return (
                      <tr key={order.id || order.order_id || idx} className="hover:bg-gray-50/50 transition-colors">
                        {/* Name */}
                        <td className="py-4 px-6 font-bold text-[#1A1A2E]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8A00] to-[#FF5500] text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                              {order.customer_name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <span>{order.customer_name}</span>
                          </div>
                        </td>

                        {/* Contact */}
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

                        {/* Status */}
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

                        {/* Amount */}
                        <td className="py-4 px-6 font-extrabold text-[#1A1A2E] text-sm">
                          ₹{order.amount || siteConfig.product.price}
                        </td>

                        {/* IDs */}
                        <td className="py-4 px-6 font-mono text-[11px] text-gray-500">
                          <div><span className="text-gray-400">Order:</span> {order.order_id}</div>
                          {order.payment_id && (
                            <div className="text-green-600"><span className="text-gray-400">Pay:</span> {order.payment_id}</div>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-gray-500 text-[11px]">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "Just now"}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm transition-colors"
                              title="Send WhatsApp recovery message"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Follow Up
                            </a>
                          </div>
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
    </div>
  );
}
