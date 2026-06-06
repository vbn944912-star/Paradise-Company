import { motion } from "motion/react";
import { STATS } from "../constants";

export default function Stats() {
  return (
    <section className="py-16 bg-brand-navy select-none relative overflow-hidden text-white border-t border-b border-brand-gold/20">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 dir-rtl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center gap-2 font-tajawal"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-gold tracking-tight drop-shadow-sm font-sans">
                {stat.value}
              </span>
              <div className="w-10 h-[2px] bg-brand-gold/45 rounded my-1" />
              <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium max-w-[150px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
