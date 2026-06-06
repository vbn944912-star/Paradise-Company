import { motion } from "motion/react";
import { ADVANTAGES } from "../constants";
import Icon, { IconName } from "./Icon";

export default function WhyChooseUs() {
  return (
    <section id="advantages" className="py-24 bg-white select-none relative overflow-hidden">
      {/* Light background geometric motifs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-slate-light rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-tajawal flex flex-col items-center gap-4">
          <span className="text-brand-gold font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold pb-1 font-sans">
            مـمـيـزات عـالـمـيـة
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            لماذا يثق مئات الأسر والشركات بفريق الجنة؟
          </h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full my-1" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
            نحن نضع معايير جديدة لجودة الحياة اليومية من خلال تقديم رعاية فائقة وتطهير مستمر ينعكس مباشرة على صحة عقاراتك ونظافتها.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 font-tajawal">
          {ADVANTAGES.map((adv, idx) => (
            <motion.div 
              key={adv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-slate-light hover:bg-brand-navy rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-brand-gold/30 hover:shadow-xl group transition-all duration-300 flex flex-col items-start gap-4 relative overflow-hidden"
            >
              {/* Soft gold backdrop glow inside card on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 bg-brand-gold/5 rounded-full transition-all group-hover:w-full group-hover:h-full -z-10" />

              {/* Graphic Icon */}
              <div className="p-3 bg-brand-navy text-brand-gold rounded-2xl group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-300 shadow-md">
                <Icon name={adv.icon as IconName} size={24} />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy group-hover:text-white transition-colors">
                  {adv.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                  {adv.desc}
                </p>
              </div>

              {/* Index indicator */}
              <span className="absolute bottom-4 left-6 text-2xl font-bold text-gray-200 group-hover:text-brand-gold/15 transition-colors font-sans">
                {String(idx + 1).padStart(2, "٠")}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
