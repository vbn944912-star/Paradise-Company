import { motion } from "motion/react";
import { WORKING_HOURS } from "../constants";
import Icon from "./Icon";

export default function WorkingHours() {
  const schedule = [
    { day: "السبت", hours: WORKING_HOURS.saturday, isClosed: false },
    { day: "الأحد", hours: WORKING_HOURS.sunday, isClosed: false },
    { day: "الاثنين", hours: WORKING_HOURS.monday, isClosed: false },
    { day: "الثلاثاء", hours: WORKING_HOURS.tuesday, isClosed: false },
    { day: "الأربعاء", hours: WORKING_HOURS.wednesday, isClosed: false },
    { day: "الخميس", hours: WORKING_HOURS.thursday, isClosed: false },
    { day: "الجمعة", hours: WORKING_HOURS.friday, isClosed: true }
  ];

  return (
    <section className="py-20 bg-white select-none relative overflow-hidden text-brand-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl font-tajawal">
        
        {/* Visual Box Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-brand-navy text-white rounded-3xl p-8 md:p-12 border border-brand-gold/30 shadow-2xl relative"
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-gold/5 rounded-full blur-3xl -z-10" />

          {/* Header block inside */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-gold/15 border border-brand-gold/30 rounded-2xl text-brand-gold shadow-md">
                <Icon name="Clock" size={28} />
              </div>
              <div>
                <span className="text-xs text-brand-gold font-bold font-sans tracking-wider uppercase">حالة التوافر</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ساعات العمل والزيارات</h2>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm md:text-base max-w-sm leading-relaxed">
              يسعدنا تلقي مكالماتكم وحجوزاتكم طوال أيام الأسبوع. يتم الالتزام بالميعاد المحدد والانتهاء من العمل بدقة تامة.
            </p>
          </div>

          {/* Schedule list items */}
          <div className="space-y-4">
            {schedule.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all ${
                  item.isClosed 
                    ? "bg-red-500/10 border-red-500/35 text-red-100" 
                    : "bg-white/5 border-white/10 hover:border-brand-gold/30 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.isClosed ? "bg-red-500" : "bg-brand-gold"}`} />
                  <span className="font-bold text-base sm:text-lg">{item.day}</span>
                </div>
                
                <span className={`text-sm sm:text-base font-semibold ${item.isClosed ? "text-red-400 font-bold" : "text-gray-200"}`}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom quick reminder */}
          <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed font-light">
            * شركة الجنة توفر فرق مناوبات طوارئ للشركات والمصانع الكبرى في يوم الجمعة حسب الاتفاق المسبق مع الإدارة.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
