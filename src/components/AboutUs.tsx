import { motion } from "motion/react";
import { IMAGES } from "../constants";
import Icon from "./Icon";

export default function AboutUs() {
  const values = [
    {
      title: "الرؤية والرسالة",
      desc: "أن نكون الخيار الأول والاسم الأكثر ثقةً لخدمات النظافة والتعقيم الفاخرة لجميع المنازل والمنشآت بمحافظة القاهرة.",
      icon: "Sparkles"
    },
    {
      title: "الأمانة المطلقة",
      desc: "نلتزم بمعايير صارمة وثقة متبادلة، حيث يتم اختيار وتدريب الطاقم بدقة، مما يجعلك مطمئناً بالكامل على ممتلكاتك.",
      icon: "ShieldCheck"
    },
    {
      title: "صديق للبيئة والصحة",
      desc: "نستخدم معقمات وسوائل تنظيف حاصلة على تراخيص جودة معتمدة بدون أي أضرار على صحة الرضع، الكبار وحيوانتكم الأليفة.",
      icon: "Heart"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dir-rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Graphic Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient gold aura behind photo */}
            <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-tr from-brand-gold/20 to-brand-navy/10 rounded-3xl -z-10" />
            
            {/* Main Picture Frame */}
            <div className="rounded-3xl overflow-hidden border-2 border-brand-gold/35 shadow-2xl bg-brand-navy aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[4/3]">
              <img 
                src={IMAGES.cleanersTeam} 
                alt="فريق تنظيف شركة الجنة" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Stats Floating Overlay */}
            <div className="absolute bottom-6 right-6 bg-brand-navy/90 backdrop-blur-md border border-brand-gold/40 text-white rounded-2xl p-4 sm:p-5 shadow-xl max-w-xs flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-brand-gold">
                <Icon name="Users2" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-brand-gold">طاقم مؤهل بالكامل</h4>
                <p className="text-xs text-gray-300">أكثر من ١٥٠ فنياً مدرباً على تنظيف الفنادق والمنشآت الكبرى</p>
              </div>
            </div>
          </motion.div>

          {/* Text/Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col items-start gap-6 font-tajawal"
          >
            {/* Title Pre-tag */}
            <span className="text-brand-gold font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold pb-1.5 font-sans">
              مـن نـحـن
            </span>

            {/* Main title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight">
              شركة الجنة للخدمات والنظافة <br />
              <span className="text-brand-gold">شريكك الموثوق للنقاء المثالي</span>
            </h2>

            {/* Company Bio paragraphs */}
            <div className="text-gray-700 text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-normal">
              <p>
                شركة الجنة للخدمات والنظافة واحدة من الشركات المصرية الرائدة ومتسارعة النمو في مجال تنظيف المكاتب والفلل والشركات والمصانع والمنازل داخل القاهرة الكبرى ككل (مدينة نصر، التجمع الخامس، مصر الجديدة، المعادي، الشيخ زايد، و٦ أكتوبر).
              </p>
              <p>
                نعتمد على فريق عمل محترف وخبرات تراكمية تمتد لعقد من الزمن، وتجهيزات تكنولوجية متكاملة تضمن إزالة أصعب البقع والملوثات الجبسية والأسمنتية والدهنية، مع إتباع دقيق لبروتوكولات التطهير والتعقيم الآمن من وزارة الصحة للحفاظ على سلامة أسرتك وموظفيك.
              </p>
            </div>

            {/* Core Values / Sub features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4 w-full">
              {values.map((val, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-light p-5 rounded-2xl border border-gray-100 hover:border-brand-gold/30 hover:bg-white shadow-sm hover:shadow-md transition-all duration-350 flex flex-col items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center shadow-md">
                    <Icon name={val.icon as any} size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm sm:text-base">{val.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 lines-clamp-3 leading-normal">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
