import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../constants";
import Icon, { IconName } from "./Icon";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(null);

  const toggleDetails = (idx: number) => {
    setActiveServiceIdx(activeServiceIdx === idx ? null : idx);
  };

  const handleBookingClick = (serviceId: string) => {
    onSelectService(serviceId);
    // Smooth scroll directly to calculator
    const element = document.getElementById("estimator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-light relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-tajawal flex flex-col items-center gap-4">
          <span className="text-brand-gold font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold pb-1 font-sans">
            خـدمـاتـنـا الـمـتـمـيـزة
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy">
            حلول تنظيف وتعقيم متطورة لجميع المساحات
          </h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full my-1" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            نحن نفخر بتقديم باقة متكاملة من الخدمات المتخصصة المُهندسة خصيصاً لتتجاوز توقعاتكم، مع تسخير أحدث تقنيات إزالة الملوثات والأتربة الصعبة.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const isExpanded = activeServiceIdx === idx;
            return (
              <motion.div 
                key={srv.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-gray-100 hover:border-brand-gold/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Visual Accent Top Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-navy to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content Area */}
                <div className="p-6 sm:p-8 flex-grow font-tajawal">
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-brand-navy text-brand-gold rounded-2xl shadow-md group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-300">
                      <Icon name={srv.icon as IconName} size={26} />
                    </div>
                    {/* Simulated Badge */}
                    <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      متاح حالياً
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {srv.description}
                  </p>

                  {/* Toggle list details */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <button
                      onClick={() => toggleDetails(idx)}
                      className="w-full flex items-center justify-between text-brand-navy font-bold text-sm sm:text-base hover:text-brand-gold transition-colors group/btn cursor-pointer py-1"
                    >
                      <span>تشتمل الخدمة على:</span>
                      <span className="text-brand-gold flex items-center gap-1.5 text-xs font-semibold font-sans">
                        {isExpanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                        <Icon 
                          name="ArrowLeft" 
                          size={14} 
                          className={`transform transition-transform duration-300 ${isExpanded ? "-rotate-90 text-brand-navy" : "text-brand-gold group-hover/btn:-translate-x-1"}`} 
                        />
                      </span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="mt-4 space-y-2 text-xs sm:text-sm text-gray-500 overflow-hidden text-right leading-relaxed font-light"
                        >
                          {srv.details.map((detail, stepIdx) => (
                            <li key={stepIdx} className="flex items-start gap-2.5 group/li">
                              <Icon name="CheckCircle2" size={14} className="text-brand-gold mt-1 flex-shrink-0 group-hover/li:scale-110 transition-transform" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Quick CTA actions */}
                <div className="bg-slate-light border-t border-gray-100 p-5 flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => handleBookingClick(srv.id)}
                    className="w-full bg-brand-navy hover:bg-brand-gold text-white hover:text-brand-navy font-bold py-2.5 rounded-xl text-sm transition-all shadow hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    احسب التكلفة واحجز فوراً
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
