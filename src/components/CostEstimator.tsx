import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES, ADD_ONS, REGIONS, TELEPHONE } from "../constants";
import Icon, { IconName } from "./Icon";

interface CostEstimatorProps {
  selectedServiceId: string | null;
}

export default function CostEstimator({ selectedServiceId }: CostEstimatorProps) {
  // Service selection
  const [serviceId, setServiceId] = useState("home");
  
  // Sizing details
  const [size, setSize] = useState(100); // sqm
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  
  // Extras / Addons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Frequency
  const [frequency, setFrequency] = useState<"once" | "weekly" | "monthly">("once");
  
  // Schedule
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  // User Details
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [regionId, setRegionId] = useState("nasrcity");

  // Success Modal
  const [showInvoice, setShowInvoice] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Update selected service if parent triggers it
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Pricing math calculation
  const currentService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];
  
  const basePrice = currentService.basePrice;
  const roomCost = bedrooms * currentService.priceMultipliers.room;
  const bathCost = bathrooms * currentService.priceMultipliers.bathroom;
  const sqmCost = size * currentService.priceMultipliers.sqm;
  
  const addOnCost = selectedAddOns.reduce((total, addonId) => {
    const addon = ADD_ONS.find(a => a.id === addonId);
    return total + (addon ? addon.price : 0);
  }, 0);

  const subtotal = basePrice + roomCost + bathCost + sqmCost + addOnCost;
  
  // Discount rates
  let discountPercent = 0;
  if (frequency === "weekly") discountPercent = 15;
  if (frequency === "monthly") discountPercent = 25;
  
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalEstimate = Math.round(subtotal - discountAmount);

  // Toggle addons
  const handleAddOnToggle = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Counters
  const incrementBedrooms = () => setBedrooms(b => Math.min(10, b + 1));
  const decrementBedrooms = () => setBedrooms(b => Math.max(1, b - 1));
  const incrementBathrooms = () => setBathrooms(b => Math.min(6, b + 1));
  const decrementBathrooms = () => setBedrooms(b => Math.max(1, b - 1));

  // Form Validation and submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!clientName.trim()) {
      newErrors.push("الرجاء إدخال الاسم بالكامل");
    }
    if (!clientPhone.trim()) {
      newErrors.push("الرجاء إدخال رقم هاتف صحيح");
    } else if (clientPhone.trim().length < 10) {
      newErrors.push("رقم الهاتف المدخل غير مكتمل");
    }
    if (!date) {
      newErrors.push("الرجاء تحديد تاريخ الزيارة المفضل");
    }
    if (!time) {
      newErrors.push("الرجاء تحديد ساعة الزيارة المفضلة");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      // Auto-clear errors in 5s
      setTimeout(() => setErrors([]), 5000);
      return;
    }

    setErrors([]);
    setShowInvoice(true);
  };

  // Compile WhatsApp encoded text and open connection
  const handleSendToWhatsApp = () => {
    const selectedRegion = REGIONS.find(r => r.id === regionId)?.arabicName || "";
    const chosenAddonNames = selectedAddOns
      .map(id => ADD_ONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(" - ");

    const frequencyArabic = 
      frequency === "once" ? "زيارة واحدة فريدة" : 
      frequency === "weekly" ? "زيارات أسبوعية دورية (خصم ١٥٪)" : 
      "زيارات شهرية متواصلة (خصم ٢٥٪)";

    const messageTemplate = `
*طلب حجز خدمات تنظيف - شركة الجنة* ✨
-----------------------------
👤 *الاسم:* ${clientName}
📞 *رقم الهاتف:* ${clientPhone}
📍 *المنطقة:* ${selectedRegion}
📫 *البريد:* ${clientEmail || "غير محدد"}

*تفاصيل خدمة التنظيف:*
🛠️ *الخدمة المطلوبة:* ${currentService.title}
📐 *المساحة:* ${size} متر مربع
🛏️ *عدد الغرف:* ${bedrooms} غرف
🚿 *عدد الحمامات:* ${bathrooms} حمامات

*الخدمات الإضافية:*
➕ ${chosenAddonNames || "لا خدمات إضافية"}

📆 *الموعد المطلوب:* ${date}
⏰ *التوقيت:* ${time}
🔄 *التكرار:* ${frequencyArabic}

-----------------------------
💰 *السعر التقريبي المحسوب:* ${totalEstimate} جنيه مصري
-----------------------------
*يرجى تأكيد الحجز وإرسال المشرف والعمال في الموعد المذكور أعلاه.*
    `;

    const encodedMessage = encodeURIComponent(messageTemplate.trim());
    const cleanPhone = TELEPHONE.replace(/\s+/g, "");
    const whatsappUrl = `https://wa.me/20${cleanPhone.substring(1)}?text=${encodedMessage}`;
    
    // Open in separate tab
    window.open(whatsappUrl, "_blank");
    setShowInvoice(false);
  };

  return (
    <section id="estimator" className="py-24 bg-brand-navy select-none text-white relative">
      {/* Absolute decorative gradient glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-tajawal flex flex-col items-center gap-4">
          <span className="text-brand-gold font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold pb-1 font-sans">
            حـسـاب فـوري تـفـاعـلـي
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            احسب تكلفة خدمتك الآن بلمسة واحدة
          </h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full my-1" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            استخدم حاسبة التكلفة الذكية المخصصة لتحديد تفاصيل شقتك، فيلتك أو مكتبك، أضف الساعات أو المميزات التخديمية المناسبة، واحصل على السعر الشفاف وأرسل التفاصيل للواتساب فوراً!
          </p>
        </div>

        {/* Dynamic Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-tajawal">
          
          {/* Main Controls Form Side - 7Cols */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 bg-brand-navy-light/45 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md flex flex-col gap-6">
            
            {/* Step 1: Select Service */}
            <div className="flex flex-col gap-4">
              <label className="text-base sm:text-lg font-bold text-brand-gold flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-xs font-sans text-brand-gold font-bold">١</span>
                <span>اختر الخدمة المطلوبة:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setServiceId(srv.id)}
                    className={`p-4 rounded-2xl border text-center font-bold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                      serviceId === srv.id 
                        ? "bg-brand-gold text-brand-navy border-brand-gold shadow-lg shadow-brand-gold/15" 
                        : "bg-white/5 text-gray-200 border-white/10 hover:border-brand-gold/45"
                    }`}
                  >
                    <Icon name={srv.icon as IconName} className={serviceId === srv.id ? "text-brand-navy" : "text-brand-gold"} size={22} />
                    <span className="text-xs sm:text-sm">{srv.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sizing parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
              
              {/* Box A: Area Sqm */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold text-brand-gold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-xs font-sans text-brand-gold font-bold">٢</span>
                    <span>مساحة العقار بالمتر المربع:</span>
                  </span>
                  <span className="text-white font-sans font-bold bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs sm:text-sm">
                    {size} م²
                  </span>
                </label>

                {/* Slider input */}
                <div className="flex flex-col gap-2 mt-2">
                  <input 
                    type="range" 
                    min="40" 
                    max="600" 
                    step="10"
                    value={size} 
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-brand-gold cursor-pointer bg-white/10 h-2 rounded-lg"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-sans">
                    <span>٤٠ م²</span>
                    <span>٣٠٠ م²</span>
                    <span>٦٠٠ م²</span>
                  </div>
                </div>
              </div>

              {/* Box B: Rooms & Bathrooms Custom Counters */}
              <div className="flex flex-col gap-4">
                <span className="text-base font-bold text-brand-gold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-xs font-sans text-brand-gold font-bold">٣</span>
                  <span>تخصيص المساحات الداخلية:</span>
                </span>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* bedrooms Counter */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gray-300 font-semibold">عدد غرف النوم</span>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button" 
                        onClick={decrementBedrooms}
                        className="w-8 h-8 rounded-full bg-white/15 hover:bg-brand-gold hover:text-brand-navy flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg font-sans w-5 text-center">{bedrooms}</span>
                      <button 
                        type="button" 
                        onClick={incrementBedrooms}
                        className="w-8 h-8 rounded-full bg-white/15 hover:bg-brand-gold hover:text-brand-navy flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* bathrooms Counter */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gray-300 font-semibold">عدد حمامات الشقة</span>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button" 
                        onClick={decrementBathrooms}
                        className="w-8 h-8 rounded-full bg-white/15 hover:bg-brand-gold hover:text-brand-navy flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg font-sans w-5 text-center">{bathrooms}</span>
                      <button 
                        type="button" 
                        onClick={incrementBathrooms}
                        className="w-8 h-8 rounded-full bg-white/15 hover:bg-brand-gold hover:text-brand-navy flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Step 3: Add Ons options selection */}
            <div className="border-t border-white/10 pt-6">
              <label className="text-base sm:text-lg font-bold text-brand-gold flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-xs font-sans text-brand-gold font-bold">٤</span>
                <span>حدد الخدمات الإضافية المتاحة (اختياري):</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleAddOnToggle(addon.id)}
                      className={`p-3.5 rounded-2xl border text-right flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isChecked 
                          ? "bg-brand-gold/10 text-white border-brand-gold shadow-md" 
                          : "bg-white/5 text-gray-300 border-white/5 hover:border-brand-gold/25"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isChecked ? "bg-brand-gold border-brand-gold text-brand-navy" : "border-white/30"}`}>
                          {isChecked && <Icon name="Check" size={13} />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-brand-gold shrink-0 font-sans">
                        +{addon.price} ج.م
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Frequency discounts option */}
            <div className="border-t border-white/10 pt-6">
              <label className="text-base sm:text-lg font-bold text-brand-gold flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-xs font-sans text-brand-gold font-bold">٥</span>
                <span>تكرار عمل الزيارة والخصومات لتوفير أكبر:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "once", label: "زيارة فردية واحدة", desc: "بدون أي تكرار", discount: null },
                  { id: "weekly", label: "زيارة أسبوعية دورية", desc: "توفير ١٥٪ من الإجمالي", discount: "خصم ١٥٪" },
                  { id: "monthly", label: "زيارة دورية شهرية", desc: "توفير ٢٥٪ من الإجمالي", discount: "خصم ٢٥٪" }
                ].map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setFrequency(freq.id as any)}
                    className={`p-4 rounded-2xl border text-center flex flex-col justify-center gap-1.5 transition-all cursor-pointer ${
                      frequency === freq.id 
                        ? "bg-brand-gold text-brand-navy border-brand-gold shadow-lg" 
                        : "bg-white/5 text-gray-200 border-white/10 hover:border-brand-gold/45"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-extrabold">{freq.label}</span>
                      {freq.discount && (
                        <span className={`text-[10px] sm:text-xs font-bold border rounded-full px-2 py-0.5 ${frequency === freq.id ? "bg-brand-navy text-brand-gold border-brand-navy" : "bg-brand-gold/20 text-brand-gold border-brand-gold/30"}`}>
                          {freq.discount}
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] ${frequency === freq.id ? "text-brand-navy/80" : "text-gray-400"}`}>{freq.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Location, Preferred Schedule and User contact data */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <span className="text-base sm:text-lg font-bold text-brand-gold flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-xs font-sans text-brand-gold font-bold">٦</span>
                <span>بيانات العميل وجدول الموعد المفضل:</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full name input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm text-gray-300 font-bold">الاسم بالكامل <span className="text-brand-gold">*</span></label>
                  <input 
                    type="text" 
                    placeholder="مها ياسر..."
                    required
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-brand-gold/35 rounded-xl px-4 py-3 text-white text-sm focus:bg-brand-navy-light/60 outline-none transition-all placeholder:text-gray-500"
                  />
                </div>

                {/* Telephone input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm text-gray-300 font-bold">رقم الهاتف النشط (الواتساب) <span className="text-brand-gold">*</span></label>
                  <input 
                    type="tel" 
                    dir="ltr"
                    placeholder="01157139355"
                    required
                    value={clientPhone} 
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-brand-gold/35 rounded-xl px-4 py-3 text-white text-sm text-right focus:bg-brand-navy-light/60 outline-none transition-all placeholder:text-gray-500 font-sans"
                  />
                </div>

                {/* City region selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm text-gray-300 font-bold">منطقة السكن المقيم بها <span className="text-brand-gold">*</span></label>
                  <select 
                    value={regionId} 
                    onChange={(e) => setRegionId(e.target.value)}
                    className="w-full bg-brand-navy-light border border-white/10 hover:border-brand-gold/35 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all cursor-pointer"
                  >
                    {REGIONS.map((region) => (
                      <option key={region.id} value={region.id} className="bg-brand-navy text-white text-sm">
                        {region.arabicName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email address input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm text-gray-300">البريد الإلكتروني (اختياري)</label>
                  <input 
                    type="email" 
                    dir="ltr"
                    placeholder="client@mail.com"
                    value={clientEmail} 
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-brand-gold/35 rounded-xl px-4 py-3 text-white text-sm focus:bg-brand-navy-light/60 outline-none transition-all placeholder:text-gray-500 font-sans"
                  />
                </div>

                {/* Preferred Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm text-gray-300 font-bold">تاريخ الزيارة المطلوبة <span className="text-brand-gold">*</span></label>
                  <input 
                    type="date" 
                    required
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-brand-gold/35 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all font-sans cursor-pointer"
                  />
                </div>

                {/* Preferred Time hours */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm text-gray-300 font-bold">ساعة التوقيت المفضلة <span className="text-brand-gold">*</span></label>
                  <input 
                    type="time" 
                    required
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-brand-gold/35 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all font-sans cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Error notifications container */}
            {errors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/35 rounded-2xl p-4 text-xs sm:text-sm text-red-300 space-y-1"
              >
                {errors.map((err, i) => (
                  <p key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{err}</span>
                  </p>
                ))}
              </motion.div>
            )}

            {/* Submit book trigger button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-white hover:to-white hover:text-brand-navy text-brand-navy font-bold font-tajawal text-md tracking-wide py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-brand-gold/35 hover:scale-[1.01] transition-all duration-300 cursor-pointer text-center"
            >
              مراجعة طلب الحجز والأسعار بالكامل
            </button>

          </form>

          {/* Side Sticky Receipt Breakdown Side - 4Cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Calculation Card */}
            <div className="bg-brand-navy-light/75 border border-brand-gold/30 p-6 rounded-3xl backdrop-blur-lg flex flex-col gap-5 sticky top-28 shadow-2xl relative overflow-hidden">
              {/* Gold watermark ribbon */}
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold" />

              <h3 className="text-lg sm:text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <Icon name="BadgeDollarSign" className="text-brand-gold" size={20} />
                <span>فاتورة التكلفة التقريبية</span>
              </h3>

              <div className="flex flex-col gap-4 text-xs sm:text-sm border-b border-white/10 pb-4 font-normal text-gray-300">
                <div className="flex justify-between">
                  <span>نوع خدمة النظافة:</span>
                  <span className="text-white font-bold">{currentService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>الفتح الأساسي للتنظيف:</span>
                  <span className="text-white font-bold font-sans">{basePrice} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>حجم العقار ({size} م²):</span>
                  <span className="text-white font-bold font-sans">{sqmCost} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>مجموع الغرف ({bedrooms}):</span>
                  <span className="text-white font-bold font-sans">{roomCost} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>مجموع الحمامات ({bathrooms}):</span>
                  <span className="text-white font-bold font-sans">{bathCost} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>تفاصيل إضافات الكنب/البخار:</span>
                  <span className="text-white font-bold font-sans">{addOnCost} ج.م</span>
                </div>
              </div>

              {/* Summary line */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>المجموع الفرعي الأولي:</span>
                  <span className="font-sans text-white">{subtotal} ج.م</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-green-400 font-semibold bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                    <span>خصم تكرار الخدمة ({discountPercent}%):</span>
                    <span className="font-sans">- {discountAmount} ج.م</span>
                  </div>
                )}

                <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded-2xl p-4 mt-2">
                  <span className="text-xs text-brand-gold font-bold">القيمة التقديرية الكلية للعمل:</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-sans">{totalEstimate}</span>
                    <span className="text-sm font-bold text-gray-300">جنيه مصري</span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="text-[10px] sm:text-xs text-gray-400 leading-normal flex items-start gap-2 pt-2">
                <Icon name="ShieldCheck" className="text-brand-gold shrink-0 mt-0.5" size={14} />
                <span>السعر المعروض تقريبي مبدئي ويتأكد بشكل نهائي مع المشرف الميداني بعد الفحص الفعلي وفقاً لحالة بقع الحوائط أو مخلفات التشطيب.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* SUCCESS CONFIRMATION RECEIPT MODAL */}
      <AnimatePresence>
        {showInvoice && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInvoice(false)}
              className="fixed inset-0 bg-black z-50 transition-opacity"
            />

            {/* Modal Box */}
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none font-tajawal dir-rtl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", duration: 0.45 }}
                className="bg-brand-navy border border-brand-gold/45 text-white max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
              >
                {/* Gold top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold to-brand-gold-dark" />

                {/* Successful sparkling header */}
                <div className="flex flex-col items-center text-center gap-2 pb-6 border-b border-white/10">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/15 border border-brand-gold flex items-center justify-center text-brand-gold mb-1 shadow-lg animate-pulse">
                    <Icon name="CheckCircle2" size={36} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">تفاصيل طلب حجزك جاهزة!</h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-sm">لإتمام الحجز واستقبال سيارة الخدمة، يرجى إرسال الفاتورة المحسوبة فوراً لخدمة العملاء عبر الواتساب لتأكيد الميعاد.</p>
                </div>

                {/* Receipt Details Recap list info */}
                <div className="py-5 space-y-3.5 text-xs sm:text-sm text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>اسم العميل:</span>
                    <span className="text-white font-bold">{clientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>رقم الواتساب:</span>
                    <span className="text-white font-bold font-sans" dir="ltr">{clientPhone}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>المنطقة السكنية:</span>
                    <span className="text-white font-bold">{REGIONS.find(r => r.id === regionId)?.arabicName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>الخدمة المطلوبة:</span>
                    <span className="text-white font-semibold text-brand-gold">{currentService.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>مساحة العقار / الغرف:</span>
                    <span className="text-white font-medium font-sans">{size} م² | {bedrooms} غرف نوم | {bathrooms} حمامات</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>موعد الزيارة المحدد:</span>
                    <span className="text-brand-gold font-bold font-sans">{date} - في تمام {time}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>تكرار حجز الخدمة:</span>
                    <span className="text-white font-medium">
                      {frequency === "once" ? "مرة واحدة فريدة" : frequency === "weekly" ? "أسبوعي دوري" : "شهري متواصل"}
                    </span>
                  </div>
                  <div className="flex justify-between bg-white/5 p-3 rounded-2xl border border-white/10 items-baseline mt-2">
                    <span className="text-white font-bold text-sm sm:text-base">التكلفة النهائية الكلية:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-sans font-extrabold text-brand-gold">{totalEstimate}</span>
                      <span className="text-xs font-bold">جنيه مصري</span>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col gap-3 mt-4">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <Icon name="Phone" size={18} />
                    <span>إرسال الحجز الفوري عبر الواتساب</span>
                  </button>
                  <button
                    onClick={() => setShowInvoice(false)}
                    className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-semibold py-2.5 rounded-2xl text-xs sm:text-sm text-center transition-colors cursor-pointer"
                  >
                    إغلاق وتعديل البيانات
                  </button>
                </div>

                {/* Little note */}
                <p className="text-center text-[10px] text-gray-400 mt-4 leading-normal">
                  * بالضغط على إرسال، سنقوم بفتح شات مباشر مع المشرف به تفاصيل الحجز، مما يوفر عليك كتابته وصياغته يدوياً!
                </p>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
