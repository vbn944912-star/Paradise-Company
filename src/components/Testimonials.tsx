import { motion } from "motion/react";
import { TESTIMONIALS } from "../constants";
import Icon from "./Icon";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-tajawal flex flex-col items-center gap-4">
          <span className="text-brand-gold font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold pb-1 font-sans">
            آراء عـمـلائـنـا
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy">
            ماذا يقولون عن شركة الجنة؟
          </h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full my-1" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            نثق أن سر نجاحنا هو رضا عملائنا، فخورون بآراء مئات العملاء السعداء عبر القاهرة الكبرى. إليكم لمحة من تجاربهم:
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-tajawal">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-light rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-brand-gold/25 transition-all duration-300 relative flex flex-col justify-between shadow-sm group"
            >
              {/* Massive background quote mark */}
              <span className="absolute top-2 left-6 text-7xl font-serif text-brand-gold/15 select-none font-extrabold">
                ”
              </span>

              {/* Comment text */}
              <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed relative z-10 mb-6 font-normal">
                "{t.comment}"
              </p>

              {/* Card Footer author info */}
              <div className="flex items-center gap-4 border-t border-gray-200/50 pt-4 mt-auto">
                {/* Avatar with Letter */}
                <div className="w-12 h-12 rounded-full bg-brand-navy border border-brand-gold text-white font-bold flex items-center justify-center text-lg shadow-sm">
                  {t.avatarLetter}
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-base">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-0.5 mr-auto">
                  {Array.from({ length: t.rating }).map((_, starIdx) => (
                    <Icon key={starIdx} name="Star" className="text-brand-gold fill-brand-gold" size={14} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
