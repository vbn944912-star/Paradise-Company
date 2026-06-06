import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CoverageArea from "./components/CoverageArea";
import WorkingHours from "./components/WorkingHours";
import Gallery from "./components/Gallery";
import CostEstimator from "./components/CostEstimator";
import Footer from "./components/Footer";
import Icon from "./components/Icon";
import { TELEPHONE } from "./constants";

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy flex flex-col font-sans selection:bg-brand-gold selection:text-brand-navy">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Layout */}
      <main className="flex-grow">
        
        {/* Parallax Hero Landing Section */}
        <Hero />

        {/* Corporate Profile / About Us */}
        <AboutUs />

        {/* Services Showcase Portfolio */}
        <Services onSelectService={handleSelectService} />

        {/* Why Clients Choose Al-Jannah */}
        <WhyChooseUs />

        {/* Dynamic Metric Numbers Counters Banner */}
        <Stats />

        {/* Before & After Interactive Gallery */}
        <Gallery onSelectService={handleSelectService} />

        {/* Real-time Responsive Interactive Cost Calculator & Lead Builder Form */}
        <CostEstimator selectedServiceId={selectedServiceId} />

        {/* Client Testimonials Carousel/Grid */}
        <Testimonials />

        {/* Cairo Coverage Regions */}
        <CoverageArea />

        {/* Business Working Hours Timetable Layout */}
        <WorkingHours />

      </main>

      {/* Floating Call & WhatsApp Buttons for Ultimate Conversion Rate Optimization (CRO) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 select-none">
        {/* Quick Dial Button */}
        <a 
          href={`tel:${TELEPHONE}`} 
          className="w-14 h-14 bg-brand-gold hover:bg-white text-brand-navy hover:text-brand-gold rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-brand-gold/30 cursor-pointer"
          aria-label="اتصال هاتفي مباشر"
          title="اتصال هاتفي مباشر"
        >
          <Icon name="PhoneCall" className="animate-pulse" size={24} />
        </a>

        {/* Quick WhatsApp chat */}
        <a 
          href={`https://wa.me/20${TELEPHONE.substring(1)}`} 
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 bg-emerald-500 hover:bg-white text-white hover:text-emerald-500 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-emerald-500/30 cursor-pointer"
          aria-label="مراسلة واتساب فورية"
          title="مراسلة واتساب فورية"
        >
          <Icon name="Phone" size={24} />
        </a>
      </div>

      {/* Full Map Footer */}
      <Footer />
    </div>
  );
}
