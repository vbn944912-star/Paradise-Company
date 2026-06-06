import { TELEPHONE, TELEPHONE_FORMATTED, IMAGES, ADDRESS } from "../constants";
import Icon from "./Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-brand-navy border-t border-brand-gold/30 text-white select-none">
      
      {/* Upper Footer: Contact Channels */}
      <div className="bg-brand-navy-light/45 py-12 border-b border-white/5 font-tajawal dir-rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          
          {/* Address Item */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0">
              <Icon name="MapPin" size={22} />
            </div>
            <div>
              <h4 className="font-bold text-gray-300 text-xs sm:text-sm uppercase tracking-wider">موقعنا الرئيسي</h4>
              <p className="font-bold text-white text-sm sm:text-base mt-1">{ADDRESS}</p>
            </div>
          </div>

          {/* Telephone Item */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0">
              <Icon name="PhoneCall" size={22} />
            </div>
            <div>
              <h4 className="font-bold text-gray-300 text-xs sm:text-sm uppercase tracking-wider">رقم الهاتف والحجز</h4>
              <a 
                href={`tel:${TELEPHONE}`} 
                className="font-bold text-brand-gold text-base sm:text-lg block hover:underline mt-1 font-sans" 
                dir="ltr"
              >
                {TELEPHONE}
              </a>
            </div>
          </div>

          {/* Email Item */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0">
              <Icon name="Mail" size={22} />
            </div>
            <div>
              <h4 className="font-bold text-gray-300 text-xs sm:text-sm uppercase tracking-wider">البريد الإلكتروني للشركات</h4>
              <a 
                href="mailto:contact@aljannah-cleaning.com" 
                className="font-bold text-white hover:text-brand-gold text-sm sm:text-base block mt-1 font-sans"
              >
                contact@aljannah-cleaning.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer: Links and Brand info */}
      <div className="py-16 font-tajawal dir-rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Col 1: Bio */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={IMAGES.logo} 
                alt="شركة الجنة للخدمات والنظافة" 
                className="w-12 h-12 rounded-full border border-brand-gold object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-tajawal text-xl sm:text-2xl font-black text-white">
                شركة <span className="text-brand-gold">الجنة</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-light mt-2">
              شريكك الأول للنقاء الاستثنائي والخدمات الفندقية والتعقيم لفلل وقصور ومكاتب القاهرة الكبرى. نوفر أعلى مستويات النظافة براحة تدوم.
            </p>
            <span className="text-xs font-semibold text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-lg border border-brand-gold/20">
              "نظافة احترافية... راحة تدوم."
            </span>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-brand-gold border-r-4 border-brand-gold pr-3">روابط سريعة</h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-300 font-light">
              <a href="#hero" className="hover:text-brand-gold transition-colors">الرئيسية</a>
              <a href="#about" className="hover:text-brand-gold transition-colors">من نحن</a>
              <a href="#services" className="hover:text-brand-gold transition-colors">خدماتنا وخطوات العمل</a>
              <a href="#advantages" className="hover:text-brand-gold transition-colors">لماذا يختارنا العملاء</a>
              <a href="#testimonials" className="hover:text-brand-gold transition-colors">آراء العملآء الموثقين</a>
              <a href="#coverage" className="hover:text-brand-gold transition-colors">مناطق التغطية</a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-brand-gold border-r-4 border-brand-gold pr-3">خدماتنا الرئيسية</h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-300 font-light">
              <a href="#services" className="hover:text-brand-gold transition-colors">تنظيف الشقق السكنية</a>
              <a href="#services" className="hover:text-brand-gold transition-colors">جلي وتلميع الفلل الكبيرة</a>
              <a href="#services" className="hover:text-brand-gold transition-colors">خدمات تطهير مكاتب وشركات</a>
              <a href="#services" className="hover:text-brand-gold transition-colors">تنظيف وبسترة خطوط مصانع</a>
              <a href="#services" className="hover:text-brand-gold transition-colors">التعقيم الطبي والتطهير</a>
              <a href="#services" className="hover:text-brand-gold transition-colors">تنظيف غبار وبقايا التشطيبات</a>
            </div>
          </div>

          {/* Col 4: Reach Info info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-brand-gold border-r-4 border-brand-gold pr-3">مواعيد التوافق والطوارئ</h4>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              نحن نعمل طوال السبت إلى الخميس من الساعة التاسعة صباحاً وحتى التاسعة مساءً لتأكيد المواعيد وإرسال الفرق للمنازل. فروع الطوارئ بالمصانع تعمل ٢٤ ساعة طوال الأسبوع بجدولة مسبقة.
            </p>
            <a 
              href="#estimator" 
              className="mt-3 inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-white text-brand-navy font-bold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95 text-center"
            >
              <Icon name="Calendar" size={14} />
              <span>احسب تكلفة بيتك الآن</span>
            </a>
          </div>

        </div>
      </div>

      {/* Footer Bottom copyright notes */}
      <div className="border-t border-white/5 py-6 bg-brand-navy font-tajawal text-center text-xs text-gray-400 dir-rtl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {year} شركة الجنة للخدمات والنظافة والتعقيم. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            <span>صمم كأرقى حل للأسر والشركات بواسطة</span>
            <Icon name="Heart" className="text-red-500 fill-red-500 inline mx-0.5 animate-pulse" size={12} />
            <span className="text-brand-gold font-semibold">الجنة لخدمات التعقيم</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
