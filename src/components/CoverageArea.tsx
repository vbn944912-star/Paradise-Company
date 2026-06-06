import { motion } from "motion/react";
import { REGIONS } from "../constants";
import Icon from "./Icon";

export default function CoverageArea() {
  return (
    <section id="coverage" className="py-24 bg-slate-light select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-tajawal flex flex-col items-center gap-4">
          <span className="text-brand-gold font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold pb-1 font-sans">
            نـطـاق الـتـغـطـيـة
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            أين نقدم خدماتنا في القاهرة الكبرى؟
          </h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full my-1" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            سياراتنا المجهزة بالكامل وفرقنا المحترفة مستعدة للانطلاق لتغطية جميع أحياء القاهرة والجيزة وضواحيها بكل سرعة والتزام.
          </p>
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 font-tajawal">
          {REGIONS.map((region, idx) => (
            <motion.div 
              key={region.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-brand-gold/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-3 group relative overflow-hidden"
            >
              {/* Pulse circle for location live state */}
              <div className="absolute top-3 left-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>

              {/* Pin Icon with gold ripple */}
              <div className="w-12 h-12 rounded-full bg-slate-light text-brand-gold flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
                <Icon name="MapPin" size={24} />
              </div>

              {/* Text Name detail */}
              <div>
                <h3 className="font-bold text-brand-navy text-sm sm:text-base group-hover:text-brand-gold transition-colors">
                  {region.arabicName}
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">{region.name}</p>
              </div>

              {/* Active check indicator */}
              <span className="text-[10px] sm:text-xs text-green-600 font-semibold bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full">
                تغطية نشطة وفورية
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
