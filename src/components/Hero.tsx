import { motion } from "motion/react";
import { TELEPHONE, TELEPHONE_FORMATTED, IMAGES } from "../constants";
import Icon from "./Icon";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const checkmarks = [
    "فريق متخصص ومدرب على أعلى المستويات",
    "واد تنظيف ومعقمات آمنة وعالية الجودة",
    "مواعيد دقيقة والتزام كامل بالجدول المتفق عليه",
    "خدمة ممتازة وأسعار مرنة تناسب احتياجاتكم"
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden select-none">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.villaHero} 
          alt="صالة فيلا نظيفة فخمة" 
          className="w-full h-full object-cover object-center transform scale-105"
          style={{ filter: "brightness(0.35) contrast(1.1)" }}
          referrerPolicy="no-referrer"
        />
        {/* Navy/gradient overlays to mesh with colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/60 to-brand-navy/95" />
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-transparent to-black/40" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 dir-rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main textual column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start gap-6 text-white"
          >
            {/* Tagline */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold font-medium text-xs sm:text-sm shadow-inner"
            >
              <Icon name="Sparkles" size={14} className="text-brand-gold animate-pulse" />
              <span>نظافة احترافية... راحة تدوم</span>
            </motion.div>

            {/* Dynamic Headlines */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-tajawal font-extrabold text-white leading-tight"
            >
              تنظيف احترافي يمنحك <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-white">
                راحة حقيقية وبيئة صحية
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-200 text-base sm:text-lg max-w-2xl font-light leading-relaxed font-tajawal"
            >
              نقدم خدمات تنظيف وتعقيم شاملة ومتميزة للمنازل، الفلل، الشركات، والمصانع داخل القاهرة الكبرى بأحدث المعدات الألمانية وبأيدي فريق محترف يضمن لك التميز من أول زيارة.
            </motion.p>

            {/* Value Propositions checklist */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full border-t border-b border-white/10 py-5 my-2"
            >
              {checkmarks.map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm sm:text-[15px] group">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/25 border border-brand-gold flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold transition-colors">
                    <Icon name="Check" size={11} className="text-white font-bold" />
                  </div>
                  <span className="text-gray-100 font-medium group-hover:text-brand-gold-light transition-colors">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a 
                href="#estimator" 
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-brand-gold/30 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              >
                <Icon name="Calendar" size={20} />
                <span>احجز خدمتك الآن</span>
              </a>

              <a 
                href={`tel:${TELEPHONE}`} 
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-brand-gold/50 text-white font-semibold text-lg px-8 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <Icon name="PhoneCall" className="text-brand-gold animate-pulse" size={20} />
                <span>اتصل بنا: <span dir="ltr" className="text-brand-gold font-bold">{TELEPHONE_FORMATTED}</span></span>
              </a>
            </motion.div>
          </motion.div>

          {/* Graphical/Widget column (Highlighting interactive card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.5 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="bg-brand-navy-light/45 backdrop-blur-md rounded-3xl p-6 border border-brand-gold/25 shadow-2xl relative">
              {/* Abs glass glow */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl -z-10" />

              <div className="flex flex-col gap-6 font-tajawal">
                <div className="flex items-center gap-4 border-b border-brand-gold/20 pb-4">
                  <div className="p-3 bg-brand-gold/15 rounded-xl text-brand-gold border border-brand-gold/25">
                    <Icon name="Sparkles" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">الجنة للخدمات والنظافة</h3>
                    <p className="text-xs text-gray-300">نلتزم بالتعقيم، الأمانة، والنتائج المبهرة</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">فروع تغطية طوال الأسبوع</p>
                      <h4 className="font-bold text-white text-base mt-0.5">القاهرة الكبرى وضواحيها</h4>
                    </div>
                    <Icon name="MapPin" className="text-brand-gold" size={20} />
                  </div>

                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">تقييم الخدمة العام</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Icon key={s} name="Star" className="text-brand-gold" size={13} />
                        ))}
                        <span className="text-white text-xs font-bold mr-2">٤.٧ / ٥ (٣٠٠٠+ عميل)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">مواد التعقيم والمستحضرات</p>
                      <h4 className="font-bold text-white text-base mt-0.5">ماركات آمنة ١٠٠٪ ومسجلة طبياً</h4>
                    </div>
                    <Icon name="ShieldCheck" className="text-brand-gold" size={20} />
                  </div>
                </div>

                <a 
                  href="#estimator" 
                  className="w-full text-center bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy font-bold py-3.5 rounded-xl block shadow-lg hover:shadow-brand-gold/25 hover:brightness-110 active:scale-95 transition-all text-[15px]"
                >
                  احسب تكلفة تنظيف بيتك فوراٌ
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Soft Bottom Curved divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
