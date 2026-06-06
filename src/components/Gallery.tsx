import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../constants";
import Icon from "./Icon";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  targetServiceId: string;
  beforeFilters: string; // CSS Filter string for Before view
  hasDustOverlay: boolean;
  dustColor: string;
  highlights: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "villa",
    title: "تنظيف الفلل والقصور",
    subtitle: "تنظيف صالونات الفلل الفاخرة وإزالة الأتربة الدقيقة",
    description: "إزالة كاملة للأتربة العميقة من الأقمشة، النوافذ، والأسقف الجبسية مع تعقيم السجاد وتلميع الكريستال والثريات.",
    image: IMAGES.villaHero,
    targetServiceId: "villa",
    beforeFilters: "brightness-[0.62] contrast-[0.9] sepia-[0.35] saturate-[0.75] blur-[0.4px]",
    hasDustOverlay: true,
    dustColor: "rgba(125, 110, 95, 0.25)", // warm dusty brown tint
    highlights: [
      "شفط الغبار الدقيق من ألياف السجاد والمفروشات بالكامل",
      "إرجاع اللمعان الفائق للأخشاب النادرة والمذهبة والستيل",
      "تلميع مثالي للثريات ودرابزين السلالم النحاسية والزجاج",
      "إضفاء رائحة الياسمين المنعشة والتعقيم الكامل"
    ]
  },
  {
    id: "marble",
    title: "جلي وتلميع الرخام",
    subtitle: "استعادة المظهر المرآتي الساحر للأرضيات الرخامية",
    description: "معالجة وتلميع الرخام والجرانيت بأقراص الماس الكريستالية وحمايتها بطبقة نانو عازلة للسوائل والبقع.",
    image: IMAGES.marbleHero,
    targetServiceId: "villa",
    beforeFilters: "brightness-[0.48] contrast-[0.8] grayscale-[0.4] sepia-[0.1]",
    hasDustOverlay: true,
    dustColor: "rgba(80, 80, 80, 0.3)", // gray stains on grout and marble
    highlights: [
      "إزالة طبقة الخدوش والبهتان والتصبغات السطحية عميقاً",
      "تنظيف ترويبة ونقاط اتصال الرخام باحترافية",
      "تلميع كريستالي مرآتي فائق يعكس الضوء بوضوح تام",
      "عزل الأسطح لحمايتها من السوائل المنسكبة والقهوة والزيوت"
    ]
  },
  {
    id: "kitchen",
    title: "إزالة الدهون والزيوت",
    subtitle: "تطهير وإزالة الشحوم المتراكمة في المطابخ العصرية",
    description: "تنظيف عميق لأسطح الجرانيت، الأجهزة الكهربائية، الشفاطات، والأسقف المشبعة بأبخرة طهي الأطعمة الدسمة.",
    image: IMAGES.kitchenHero,
    targetServiceId: "home",
    beforeFilters: "brightness-[0.52] contrast-[0.85] sepia-[0.4] saturate-[0.85] hue-rotate-[10deg]",
    hasDustOverlay: true,
    dustColor: "rgba(160, 140, 80, 0.4)", // greasy yellowish tint
    highlights: [
      "صنفرة وتفتيت دهون الفرن والبوتاجاز والشفاط وفتحات التهوية",
      "تلميع وتعقيم المغاسل والخلاطات الإستانلس ستيل بالبخار",
      "تطهير خزائن المطبخ من الداخل والخارج بمواد مطابقة لمعايير الصحة",
      "تنظيف فوري لجميع البقع الصعبة عن الجدران السيراميك"
    ]
  }
];

interface GalleryProps {
  onSelectService: (serviceId: string) => void;
}

export default function Gallery({ onSelectService }: GalleryProps) {
  const [activeTab, setActiveTab] = useState<string>("villa");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === activeTab) || GALLERY_ITEMS[0];

  // Handle Drag / Move Logic for Before & After slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUpOrTouchEnd = () => handleEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpOrTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onMouseUpOrTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpOrTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUpOrTouchEnd);
    };
  }, []);

  // Set position to 50 when changing tabs for beauty entrance
  useEffect(() => {
    setSliderPosition(50);
  }, [activeTab]);

  const handleScrollToBooking = (serviceId: string) => {
    onSelectService(serviceId);
    const element = document.getElementById("estimator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="gallery" 
      className="py-20 bg-brand-navy-light/10 border-y border-brand-gold/10 select-none relative overflow-hidden"
    >
      {/* Absolute Backdrop sparkles decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 dir-rtl">
          <span className="text-brand-gold font-semibold tracking-wider text-sm px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/20 inline-block mb-3">
            معرض أعمال الجنة
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-brand-navy tracking-tight mt-1">
            قارن الجودة بنفسك: قبل وبعد التنظيف
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto my-4 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed mt-2">
            تمتلك شركة الجنة القدرة على إعادة الحيوية والبريق والتعقيم المطلق لأسطح ومحتويات منزلك باستخدام تقنيات ومواد تنظيف عالمية متفوقة. تحرك بين قبل وبعد لرؤية السحر الحقيقي!
          </p>
        </div>

        {/* Tab switching buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-xl mx-auto dir-rtl">
          {GALLERY_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`btn-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? "bg-brand-navy text-brand-gold border-brand-gold shadow-lg"
                    : "bg-white text-gray-600 border-gray-100 hover:border-brand-gold/40 hover:text-brand-navy"
                }`}
              >
                <Icon 
                  name={item.id === "villa" ? "Sparkles" : item.id === "marble" ? "Layers" : "Flame"} 
                  size={16} 
                  className={isActive ? "text-brand-gold" : "text-gray-400"} 
                />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Slider Frame */}
        <div className="max-w-4xl mx-auto mb-12">
          <div 
            id="slider-container"
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-2xl border border-brand-gold/25 shadow-2xl bg-brand-navy-light text-white aspect-[16/10] sm:aspect-[16/9] w-full cursor-ew-resize group"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            {/* 1. Underlying Sparkling "AFTER" Visual Layer */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={activeItem.image} 
                alt={`${activeItem.title} - بعد التنظيف العالي من الجنة`}
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              {/* After label in top left corner */}
              <span className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white text-xs md:text-sm font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-md select-none border border-emerald-400/20">
                بعد التنظيف والتعقيم
              </span>
            </div>

            {/* 2. Top-layered Dirty "BEFORE" Visual Layer with Custom Multi-filter */}
            <div 
              className="absolute inset-y-0 right-0 h-full overflow-hidden select-none pointer-events-none"
              style={{ width: `${100 - sliderPosition}%` }}
            >
              <div 
                className="absolute inset-y-0 right-0 h-full select-none"
                style={{ width: containerRef.current?.getBoundingClientRect().width || 800 }}
              >
                <img 
                  src={activeItem.image} 
                  alt={`${activeItem.title} - قبل التنظيف`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{ filter: activeItem.beforeFilters }}
                  referrerPolicy="no-referrer"
                />

                {/* Simulated Dust/Grease Vignette Layer inside the Before View */}
                {activeItem.hasDustOverlay && (
                  <div 
                    className="absolute inset-0 mix-blend-multiply pointer-events-none opacity-85"
                    style={{ 
                      backgroundColor: activeItem.dustColor,
                      backgroundImage: `radial-gradient(ellipse at center, transparent 30%, rgba(90,75,60,0.45) 85%), repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 10px)`
                    }}
                  />
                )}

                {/* Before label in top right corner */}
                <span className="absolute top-4 right-4 bg-brand-navy/90 backdrop-blur-sm text-brand-gold text-xs md:text-sm font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-md select-none border border-white/15">
                  قبل النظافة (واقعي افتراضي)
                </span>
              </div>
            </div>

            {/* 3. Drag Vertical Spine divider line */}
            <div 
              className="absolute inset-y-0 w-[4px] bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.7)] cursor-ew-resize flex items-center justify-center transition-all duration-150 py-4 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag button handle in center of spine */}
              <div className="w-11 h-11 bg-brand-navy border-2 border-brand-gold rounded-full shadow-2xl flex items-center justify-center pointer-events-auto transform hover:scale-110 active:scale-95 transition-all cursor-ew-resize">
                <div className="flex gap-1 items-center text-brand-gold">
                  <Icon name="ChevronLeft" size={12} className="animate-pulse" />
                  <Icon name="ChevronRight" size={12} className="animate-pulse" />
                </div>
              </div>
            </div>

            {/* Micro instructional tooltip banner floating overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-brand-navy/85 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] sm:text-xs text-brand-gold/90 font-medium border border-brand-gold/20 flex items-center gap-1.5 shadow-lg select-none hover:opacity-10 pointer-events-none transition-opacity">
              <Icon name="Pointer" size={12} className="animate-bounce text-brand-gold" />
              <span>قم بسحب المؤشر يميناً ويساراً لمقارنة العمل</span>
            </div>
          </div>
        </div>

        {/* Detailed service deliverables checklist */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6 items-center dir-rtl text-right"
          >
            <div className="md:col-span-3">
              <h3 className="text-xl md:text-2xl font-bold text-brand-navy">
                {activeItem.subtitle}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                خدمات استثنائية تعيد العقار كأنه جديد تماماً بأيدي فريقنا المطور
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
                {activeItem.description}
              </p>

              {/* Gold Button trigger scheduling linking back */}
              <button 
                id={`btn-book-${activeItem.id}`}
                onClick={() => handleScrollToBooking(activeItem.targetServiceId)}
                className="mt-6 px-6 py-3 bg-brand-gold hover:bg-brand-navy text-brand-navy hover:text-brand-gold font-bold text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center gap-2 w-fit"
              >
                <span>احجز هذه النتيجة في بيتك الآن</span>
                <Icon name="Calendar" size={16} />
              </button>
            </div>

            <div className="md:col-span-2 border-r md:border-r border-t md:border-t-0 border-dashed border-gray-200 pt-6 md:pt-0 md:pr-6 flex flex-col gap-3">
              <h4 className="text-brand-navy font-bold text-base flex items-center gap-2">
                <Icon name="ShieldCheck" className="text-brand-gold" size={18} />
                <span>ضمانات الخدمة وجودة الجنة:</span>
              </h4>
              <ul className="flex flex-col gap-2.5 mt-2">
                {activeItem.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
                    <Icon name="Check" className="text-emerald-500 shrink-0 mt-0.5" size={15} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
