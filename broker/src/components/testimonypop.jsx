import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonies = [
  { name: "Lucas", country: "MEXICO", amount: 33000 },
  { name: "Amina", country: "NIGERIA", amount: 12500 },
  { name: "James", country: "USA", amount: 47000 },
  { name: "Chloe", country: "CANADA", amount: 28000 },
  { name: "Raj", country: "INDIA", amount: 35000 },
  { name: "Zara", country: "UK", amount: 22000 },
  { name: "Wei", country: "CHINA", amount: 39000 },
  { name: "Ahmed", country: "EGYPT", amount: 15000 },
  { name: "Liam", country: "AUSTRALIA", amount: 27000 },
  { name: "Sofia", country: "BRAZIL", amount: 31000 },
  { name: "Emma", country: "FRANCE", amount: 26000 },
  { name: "Hiroshi", country: "JAPAN", amount: 34000 },
  { name: "Fatima", country: "PAKISTAN", amount: 18000 },
  { name: "Mateo", country: "ARGENTINA", amount: 29000 },
  { name: "Anika", country: "GERMANY", amount: 32000 },
];

export default function TestimonyPop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonies[index];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/90 backdrop-blur-md rounded-2xl px-4 py-3 w-72 border border-blue-500/40 shadow-lg"
        >
          <p className="text-sm font-semibold text-white">
            {current.name} from{" "}
            <span className="text-cyan-400">{current.country}</span>
          </p>
          <p className="text-xs text-gray-300">
            Just invested{" "}
            <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              ${current.amount.toLocaleString()}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
