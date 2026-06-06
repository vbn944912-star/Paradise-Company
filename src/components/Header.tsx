import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TELEPHONE, TELEPHONE_FORMATTED, IMAGES, ADDRESS } from "../constants";
import Icon from "./Icon";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "الرئيسية", href: "#hero" },
    { label: "من نحن", href: "#about" },
    { label: "خدماتنا", href: "#services" },
    { label: "لماذا يختارنا العملاء", href: "#advantages" },
    { label: "آراء العملآء", href: "#testimonials" },
    { label: "مناطق الخدمة", href: "#coverage" },
    { label: "اتصل بنا", href: "#contact" }
  ];

  return (
    <header className="w-full fixed top-0 z-50 transition-all duration-300 select-none">
      {/* Top Banner Contact Information */}
      <div className="bg-brand-navy border-b border-brand-gold/15 py-2 px-4 text-white text-xs sm:text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center dir-rtl">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <Icon name="MapPin" className="text-brand-gold" size={14} />
              <span>{ADDRESS}</span>
            </span>
            <span className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <Icon name="Clock" className="text-brand-gold" size={14} />
              <span>ساعات العمل: ٩ ص - ٩ م (الجمعة مغلق)</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${TELEPHONE}`} 
              className="flex items-center gap-2 bg-brand-navy-light/60 hover:bg-brand-gold/20 hover:text-brand-gold transition-all px-3 py-1 rounded-full border border-brand-gold/30 font-medium tracking-wide"
            >
              <Icon name="PhoneCall" className="text-brand-gold animate-bounce" size={14} />
              <span dir="ltr">{TELEPHONE_FORMATTED}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        id="navbar"
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-brand-navy/95 backdrop-blur-md py-3 shadow-lg border-b border-brand-gold/30" 
            : "bg-brand-navy/85 backdrop-blur-sm py-4 border-b border-brand-gold/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between dir-rtl">
          {/* Logo & Brand Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-brand-gold bg-brand-navy flex items-center justify-center">
              <img 
                src={IMAGES.logo} 
                alt="شعار شركة الجنة" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-tajawal text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-gold transition-colors">
                شركة <span className="text-brand-gold">الجنة</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-300 -mt-1 font-medium tracking-widest uppercase">
                للخدمات والنظافة والتعقيم
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                className="text-white hover:text-brand-gold text-[15px] font-medium transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a 
              href="#estimator" 
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy hover:from-white hover:to-white hover:text-brand-navy font-bold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-brand-gold/20 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Icon name="Calendar" size={16} />
              <span>احجز الآن</span>
            </a>

            {/* Mobile Contact trigger */}
            <a 
              href={`tel:${TELEPHONE}`} 
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold text-brand-navy hover:bg-white transition-colors cursor-pointer"
              aria-label="اتصل بنا"
            >
              <Icon name="Phone" size={18} />
            </a>

            {/* Hamburger icon for mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-brand-gold hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              aria-label="تفعيل القائمة"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-brand-navy border-l border-brand-gold/30 z-50 p-6 shadow-2xl flex flex-col justify-between lg:hidden dir-rtl"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-brand-gold/15 mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src={IMAGES.logo} 
                      alt="الجنة شعار" 
                      className="w-10 h-10 object-cover rounded-full border border-brand-gold"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-tajawal text-lg font-bold text-white">
                      شركة <span className="text-brand-gold">الجنة</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-brand-gold hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>

                {/* Drawer Nav links */}
                <div className="flex flex-col gap-4">
                  {menuItems.map((item, i) => (
                    <a 
                      key={i} 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-200 hover:text-brand-gold text-lg py-1.5 border-b border-transparent hover:border-brand-gold/20 transition-all font-medium flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <Icon name="ArrowLeft" size={16} className="text-brand-gold/40" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Drawer Footer info */}
              <div className="border-t border-brand-gold/15 pt-6 mt-6 flex flex-col gap-4">
                <div className="text-xs text-gray-400 flex flex-col gap-2">
                  <p className="flex items-center gap-2">
                    <Icon name="MapPin" size={13} className="text-brand-gold flex-shrink-0" />
                    <span>{ADDRESS}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="Clock" size={13} className="text-brand-gold flex-shrink-0" />
                    <span>ساعات العمل: ٩:٠٠ ص – ٩:٠٠ م</span>
                  </p>
                </div>
                
                <a 
                  href="#estimator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-center flex items-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy font-bold py-3 px-4 rounded-xl shadow-lg"
                >
                  <Icon name="Calendar" size={16} />
                  <span>احجز خدمتك الآن</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
