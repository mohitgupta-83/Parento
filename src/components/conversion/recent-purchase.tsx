"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

/* ── 20 Demo Purchase Notifications for Baby Food Product ───── */
const babyFoodPurchases = [
  { name: "Priya Sharma", city: "Mumbai", timeAgo: "1 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Amit Patel", city: "Ahmedabad", timeAgo: "3 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Sneha Reddy", city: "Hyderabad", timeAgo: "5 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Rahul Verma", city: "Delhi", timeAgo: "6 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Kavita Joshi", city: "Pune", timeAgo: "8 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Meera Nair", city: "Kochi", timeAgo: "10 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Anita Gupta", city: "Bengaluru", timeAgo: "12 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Deepak Malhotra", city: "Chandigarh", timeAgo: "14 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Riya Sen", city: "Kolkata", timeAgo: "16 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Sanjay Tiwari", city: "Lucknow", timeAgo: "18 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Neha Agarwal", city: "Jaipur", timeAgo: "20 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Vikram Deshmukh", city: "Nagpur", timeAgo: "22 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Pooja Mishra", city: "Surat", timeAgo: "24 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Rajesh Kumar", city: "Patna", timeAgo: "26 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Anjali Bhatnagar", city: "Bhopal", timeAgo: "28 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Siddharth Rao", city: "Chennai", timeAgo: "30 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Sunita Saxena", city: "Indore", timeAgo: "32 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Karan Dhillon", city: "Ludhiana", timeAgo: "35 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Bhavna Mehta", city: "Vadodara", timeAgo: "38 min ago", product: "Healthy Weight Gain Recipes Ebook" },
  { name: "Divya Kapoor", city: "Gurugram", timeAgo: "40 min ago", product: "Healthy Weight Gain Recipes Ebook" },
];

/* ── 20 Demo Purchase Notifications for Worksheets Product ── */
const worksheetPurchases = [
  { name: "Sunita M.", city: "Delhi", timeAgo: "2 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Rajesh P.", city: "Mumbai", timeAgo: "4 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Ananya G.", city: "Bengaluru", timeAgo: "5 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Vikram K.", city: "Pune", timeAgo: "7 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Pooja S.", city: "Jaipur", timeAgo: "9 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Rohan B.", city: "Ahmedabad", timeAgo: "11 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Kavita T.", city: "Chennai", timeAgo: "13 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Deepak R.", city: "Kolkata", timeAgo: "15 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Meera N.", city: "Hyderabad", timeAgo: "17 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Amit S.", city: "Lucknow", timeAgo: "20 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Neha P.", city: "Indore", timeAgo: "23 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Sanjay V.", city: "Surat", timeAgo: "25 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Anita K.", city: "Nagpur", timeAgo: "27 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Rahul D.", city: "Bhopal", timeAgo: "30 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Priya J.", city: "Chandigarh", timeAgo: "33 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Siddharth M.", city: "Patna", timeAgo: "36 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Divya H.", city: "Vadodara", timeAgo: "39 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Karan G.", city: "Ludhiana", timeAgo: "42 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Bhavna R.", city: "Gurugram", timeAgo: "45 min ago", product: "15,000+ Kids Worksheets Bundle" },
  { name: "Arpita K.", city: "Kochi", timeAgo: "48 min ago", product: "15,000+ Kids Worksheets Bundle" },
];

export function RecentPurchasePopup() {
  const pathname = usePathname();
  const isBabyFood = pathname?.includes("baby-food-gain-recipe");
  const purchaseList = isBabyFood ? babyFoodPurchases : worksheetPurchases;

  const [isVisible, setIsVisible] = useState(false);
  const indexRef = useRef(0);
  const [current, setCurrent] = useState(purchaseList[0]);

  useEffect(() => {
    setCurrent(purchaseList[0]);
  }, [isBabyFood]);

  useEffect(() => {
    const showNotification = () => {
      const entry = purchaseList[indexRef.current % purchaseList.length];
      setCurrent(entry);
      setIsVisible(true);
      indexRef.current += 1;

      // Auto-hide after 4 seconds
      setTimeout(() => setIsVisible(false), 4000);
    };

    // Show first notification after 6 seconds
    const initialTimeout = setTimeout(showNotification, 6000);

    // Then cycle every 10 seconds
    const interval = setInterval(showNotification, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [purchaseList]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 md:bottom-8 left-4 z-40 max-w-xs sm:max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FFF4] flex items-center justify-center flex-shrink-0 border border-green-100">
              <ShoppingBag className="w-5 h-5 text-[#4CAF50]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-[#1A1A2E] truncate">
                {current.name} from {current.city}
              </p>
              <p className="text-[11px] font-medium text-gray-600 truncate">
                purchased <span className="font-bold text-[#FF8A00]">{current.product}</span> · {current.timeAgo}
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
