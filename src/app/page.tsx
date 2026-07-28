"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  FileText, 
  Award, 
  FolderCheck, 
  BookOpen, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Heart, 
  Lock, 
  Sliders, 
  Eye, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  ArrowLeft, 
  ArrowUpRight, 
  Star, 
  Zap, 
  Layers, 
  Palette, 
  PieChart, 
  Presentation, 
  Share2, 
  Layout, 
  ClipboardList, 
  UserCheck,
  Check,
  Search,
  Loader2
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";
import WorkModal from "@/components/WorkModal";

// Helper icon render function for all 23 educational services
function RenderServiceIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "Target": return <Target className={className} />;
    case "FolderCheck": return <FolderCheck className={className} />;
    case "Award": return <Award className={className} />;
    case "TrendingUp": return <TrendingUp className={className} />;
    case "BookOpen": return <BookOpen className={className} />;
    case "FileText": return <FileText className={className} />;
    case "Edit3": return <Sliders className={className} />;
    case "PieChart": return <PieChart className={className} />;
    case "Layers": return <Layers className={className} />;
    case "Presentation": return <Presentation className={className} />;
    case "Sparkles": return <Sparkles className={className} />;
    case "ShieldCheck": return <ShieldCheck className={className} />;
    case "CheckCircle2": return <CheckCircle2 className={className} />;
    case "UserCheck": return <UserCheck className={className} />;
    case "ClipboardList": return <ClipboardList className={className} />;
    case "Users": return <Users className={className} />;
    case "Heart": return <Heart className={className} />;
    case "Palette": return <Palette className={className} />;
    case "Layout": return <Layout className={className} />;
    case "Star": return <Star className={className} />;
    case "Share2": return <Share2 className={className} />;
    default: return <FileText className={className} />;
  }
}

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewWork, setPreviewWork] = useState<any | null>(null);
  const [openFaqId, setOpenFaqId] = useState<number | null>(0);

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const res = await fetch("/api/data");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Failed to load platform data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlatformData();
  }, []);

  const works = data?.works || [];
  const categories = data?.categories || [];
  const services = data?.services || [];
  const testimonials = data?.testimonials || [];
  const faqs = data?.faqs || [];
  const settings = data?.settings || {};

  const whatsappNumber = settings?.whatsappNumber || "966538950445";
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");
  const generalWaUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent("السلام عليكم، أرغب في الاستفسار عن خدمات منصة الزهراء.")}`;
  const customOrderWaUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent("السلام عليكم، أود طلب تصميم خدمة أو نموذج خاص بمؤشرات وإداريات المدرسة/الأستاذ من منصة الزهراء.")}`;

  // Filter works by Category & Search query
  const filteredWorks = useMemo(() => {
    return works.filter((w: any) => {
      const matchesCat = selectedCategory === "الكل" || w.categoryName === selectedCategory || w.categoryId === Number(selectedCategory);
      const matchesSearch = 
        w.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        w.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [works, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#1F2937] gap-5 font-['Cairo']">
        <div className="w-16 h-16 rounded-3xl bg-[#6C63FF]/10 flex items-center justify-center animate-pulse border border-[#6C63FF]/20 shadow-md">
          <Sparkles className="w-8 h-8 text-[#6C63FF] animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-[#1F2937]">منصة الزهراء للخدمات التعليمية والحلول الذكية</h2>
          <p className="text-xs text-[#6B7280]">جاري تحميل الواجهة الفاخرة والمعرض الديناميكي...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#6C63FF]/20 selection:text-[#6C63FF]">
      {/* Navbar */}
      <Navbar siteTitle={settings.siteTitle || "منصة الزهراء"} whatsappNumber={whatsappNumber} />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-10 pb-24 sm:pt-16 sm:pb-32 overflow-hidden bg-gradient-to-b from-white via-[#F8F9FC] to-white border-b border-[#E5E7EB]/50">
        {/* Subtle decorative glowing purple geometry */}
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-[#6C63FF]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-32 w-[500px] h-[500px] bg-[#8B7BFF]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Right Column: Copywriting & CTAs */}
            <div className="lg:col-span-7 text-right space-y-8 animate-fade-up">
              {/* Premium Top Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#6C63FF]/8 border border-[#6C63FF]/25 text-[#6C63FF] text-xs sm:text-sm font-bold shadow-2xs font-['Cairo']">
                <Sparkles className="w-4 h-4 text-[#6C63FF]" />
                <span>المنصة المعتمدة للتميز المؤسسي والتعليم الرقمي الفاخر</span>
              </div>

              {/* Powerful Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#1F2937] leading-[1.25] font-['Cairo']">
                {settings.heroTitle || "كل ما تحتاجه من خدمات تعليمية وإدارية وتصميمية... في مكان واحد."}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal max-w-2xl">
                {settings.heroSubtitle || "منصة الزهراء تقدم حلولاً احترافية للمعلمين والمعلمات والطلاب والمؤسسات التعليمية، بجودة عالية، وتسليم سريع، واهتمام بأدق التفاصيل."}
              </p>

              {/* Hero Two Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 font-['Cairo']">
                {/* Green CTA Button */}
                <a
                  href="#portfolio"
                  className="px-8 py-4.5 rounded-2xl bg-[#22C55E] hover:bg-[#1ea950] text-white font-extrabold text-base shadow-xl shadow-[#22C55E]/25 flex items-center justify-center gap-2.5 transition duration-300 transform hover:-translate-y-1 active:translate-y-0"
                >
                  <span>🟢 اطلب خدمتك الآن</span>
                  <ArrowLeft className="w-5 h-5 ml-1" />
                </a>

                {/* White / WhatsApp Button */}
                <a
                  href={generalWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4.5 rounded-2xl bg-white hover:bg-[#F8F9FC] text-[#1F2937] font-bold text-base border-2 border-[#E5E7EB] hover:border-[#8B7BFF] shadow-md flex items-center justify-center gap-2.5 transition duration-300 transform hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 text-[#22C55E] fill-current" />
                  <span>⚪ تحدث معنا عبر واتساب</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-[#6B7280] font-['Tajawal']">
                <span className="flex items-center gap-1.5 text-[#1F2937]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>دقة في التنفيذ 100%</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#1F2937]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>تسليم فوري عبر واتساب</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#1F2937]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>سرية معلومات تامة</span>
                </span>
              </div>
            </div>

            {/* Left Column: High-end 3D Mockup / Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative w-full max-w-lg">
                {/* Glow behind mockup */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/20 to-[#B497FF]/20 rounded-3xl blur-2xl transform rotate-3" />
                
                {/* Main Illustration container */}
                <div className="relative z-10 bg-white p-3 sm:p-4 rounded-3xl border border-[#E5E7EB] shadow-2xl overflow-hidden glass-card">
                  <img 
                    src="/images/hero-mockup.png" 
                    alt="منصة الزهراء للحلول الذكية والتعليم الرقمي" 
                    className="w-full h-auto rounded-2xl object-cover shadow-sm transform hover:scale-[1.02] transition duration-700"
                  />
                  <div className="mt-4 px-3 pb-2 flex items-center justify-between font-['Cairo']">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E] animate-pulse" />
                      <span className="text-xs font-black text-[#1F2937]">منصة رقمية معتمدة ومتطورة</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-full border border-[#6C63FF]/20">
                      جودة فائقة
                    </span>
                  </div>
                </div>

                {/* Floating Micro UI badge */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 z-20 bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-xl flex items-center gap-3 hidden sm:flex">
                  <div className="w-11 h-11 rounded-xl bg-[#6C63FF] text-white flex items-center justify-center font-black text-sm shadow-md">
                    98%
                  </div>
                  <div className="font-['Cairo']">
                    <span className="text-xs font-bold text-[#1F2937] block">رضا العملاء والمعلمين</span>
                    <span className="text-[10px] text-[#22C55E] font-medium block">⭐ ⭐ ⭐ ⭐ ⭐ تقييم ممتاز</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (قسم الإحصائيات) */}
      <section className="py-16 bg-[#F8F9FC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center font-['Cairo']">
            
            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-[#6C63FF] block mb-2 tracking-tight font-mono">
                500+
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#1F2937]">
                خدمة تم تنفيذها
              </span>
              <span className="text-xs text-[#6B7280] block mt-1 font-normal font-['Tajawal']">بنجاح ودقة واحترافية</span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-[#8B7BFF] block mb-2 tracking-tight font-mono">
                98%
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#1F2937]">
                رضا العملاء
              </span>
              <span className="text-xs text-[#6B7280] block mt-1 font-normal font-['Tajawal']">من المعلمين والمؤسسات</span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-[#B497FF] block mb-2 tracking-tight font-mono">
                24/7
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#1F2937]">
                دعم فني
              </span>
              <span className="text-xs text-[#6B7280] block mt-1 font-normal font-['Tajawal']">متواجدون لخدمتك عبر واتساب</span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-[#22C55E] block mb-2 tracking-tight font-mono">
                100%
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#1F2937]">
                التزام بالمواعيد
              </span>
              <span className="text-xs text-[#6B7280] block mt-1 font-normal font-['Tajawal']">تسليم فوري بالوقت المتفق عليه</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (قسم الخدمات - 23 خدمة في بطاقات زجاجية فاخرة) */}
      <section id="services" className="py-24 sm:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs inline-block border border-[#6C63FF]/20 font-['Cairo']">
              🎓 خدماتنا الشاملة والمحكمة
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F2937] font-['Cairo']">
              نصمم حلولنا الأكاديمية باهتمام بأدق التفاصيل
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-['Tajawal'] font-normal leading-relaxed">
              نوفر قائمة واسعة ومتكاملة تشمل الخطط التشغيلية، ملفات نافس والإنجاز، وسجلات الجودة والتقويم، مصممة بأسلوب عصري وأنيق يناسب الهوية العربية والمنصات العالمية.
            </p>
          </div>

          {/* 23 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 font-['Cairo']">
            {services.map((srv: any) => (
              <div 
                key={srv.id}
                onClick={() => {
                  window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار وطلب خدمة: (${srv.title}) من منصة الزهراء.`)}`, "_blank");
                }}
                className="bg-[#F8F9FC] hover:bg-white p-7 rounded-3xl border border-[#E5E7EB] shadow-2xs hover:shadow-xl hover:border-[#8B7BFF]/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer space-y-6 transform hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Icon Container */}
                  <div className="w-13 h-13 rounded-2xl bg-white border border-[#E5E7EB] text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white flex items-center justify-center shadow-sm transition duration-300">
                    <RenderServiceIcon name={srv.iconName || "Target"} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#1F2937] text-lg group-hover:text-[#6C63FF] transition">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mt-2 font-normal font-['Tajawal']">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#6C63FF]">
                  <span>اطلب الخدمة الآن</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Call out box for custom requests */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#F8F9FC] to-[#FFFFFF] border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-right">
              <h4 className="text-lg font-bold text-[#1F2937] font-['Cairo']">هل تبحث عن خدمة مدرسية مخصصة أو تصميم غير مدرج بالقائمة؟</h4>
              <p className="text-xs sm:text-sm text-[#6B7280] font-['Tajawal']">نحن جاهزون لتنفيذ جميع طلبات التحاضير والملازم وبناء مؤشرات المدرسة الخاصة خلال 24 ساعة.</p>
            </div>
            <a
              href={customOrderWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-bold text-sm shadow-md transition shrink-0 font-['Cairo'] flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>تحدث مع الدعم الفني عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. WHY AL-ZAHRA? (لماذا منصة الزهراء؟ - 6 بطاقات احترافية) */}
      <section id="why-us" className="py-24 sm:py-32 bg-[#F8F9FC] border-y border-[#E5E7EB] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4 font-['Cairo']">
            <span className="px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs inline-block border border-[#6C63FF]/20">
              💎 لماذا منصة الزهراء؟
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F2937]">
              معايير عالمية تميزنا في عالم الخدمات الأكاديمية
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-['Tajawal'] font-normal">
              نلتزم بتقديم تجربة استثنائية لمعلمي ومعلمات وقادة التعليم، مع المحافظة التامة على الجودة الفائقة، السرية، وسرعة الرد.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-['Cairo']">
            
            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center font-bold group-hover:bg-[#6C63FF] group-hover:text-white transition duration-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#1F2937] text-xl">1. جودة عالية</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  تصميماتنا وأعمالنا لا تضاهى؛ فهي مبنية وفق معايير عالمية كبرى مع تنسيق ألوان هادئ ومحتوى لغوي وعلمي دقيق وخالٍ من الأخطاء.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]/70 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <Check className="w-4 h-4" />
                <span>ضمان الجودة والتميز 100%</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#8B7BFF]/15 text-[#8B7BFF] flex items-center justify-center font-bold group-hover:bg-[#8B7BFF] group-hover:text-white transition duration-300">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#1F2937] text-xl">2. سرعة التنفيذ</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  نحن ندرك قيمة وقتك التربوي والمهني؛ لذلك نسلم النماذج الجاهزة فوراً ونمتاز بسرعتنا الفائقة في تنفيذ الخطط والتحاضير المخصصة.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]/70 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <Check className="w-4 h-4" />
                <span>استجابة وإنجاز قياسي</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center font-bold group-hover:bg-[#22C55E] group-hover:text-white transition duration-300">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#1F2937] text-xl">3. الالتزام بالمواعيد</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  المصداقية هي أساس عملنا؛ نتعهد دائماً بالانضباط والالتزام بالوقت المتفق عليه معك عبر محادثة واتساب دون أي تأخير.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]/70 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <Check className="w-4 h-4" />
                <span>دقة متناهية بالوقت</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#B497FF]/20 text-[#6C63FF] flex items-center justify-center font-bold group-hover:bg-[#6C63FF] group-hover:text-white transition duration-300">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#1F2937] text-xl">4. أسعار تنافسية</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  نقدم باقات ونماذج استثمارية بأسعار في متناول جميع المعلمين والمعلمات والمؤسسات، مع تحقيق أعلى قيمة وقابلية للتعديل الدائم.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]/70 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <Check className="w-4 h-4" />
                <span>قيمة مقابل أعلى جودة</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center font-bold group-hover:bg-[#6C63FF] group-hover:text-white transition duration-300">
                  <MessageCircle className="w-7 h-7 fill-current/10" />
                </div>
                <h3 className="font-extrabold text-[#1F2937] text-xl">5. دعم مستمر</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  لا تنتهي علاقتنا عند التسليم؛ فريقنا متواجد 24/7 للرد على أي استفسار أو إجراء تعديلات إضافية تضمن لك الراحة والرضا التام.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]/70 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <Check className="w-4 h-4" />
                <span>خدمة ما بعد التسليم</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-[#1F2937]/10 text-[#1F2937] flex items-center justify-center font-bold group-hover:bg-[#1F2937] group-hover:text-white transition duration-300">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-[#1F2937] text-xl">6. سرية المعلومات</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  نحترم خصوصية عملك ومدرستك؛ كافة الملفات والوثائق والشواهد التي نتداولها محمية ومحفوظة بسرية تامة ولا تُشارك مطلقاً مع أي طرف آخر.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]/70 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <Check className="w-4 h-4" />
                <span>حماية تامة للبيانات</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK? (كيف نعمل؟ - Timeline احترافي) */}
      <section id="process" className="py-24 sm:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4 font-['Cairo']">
            <span className="px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs inline-block border border-[#6C63FF]/20">
              ⚡ كيف نعمل؟ (آلية العمل)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F2937]">
              خطوات سلسة ومتقنة تنقل فكرتك إلى واقع فاخر
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-['Tajawal'] font-normal">
              صممنا مسار عمل استثنائي وخالٍ من التعقيد، يضمن تحقيق أعلى نسب الدقة عبر 6 مراحل متتالية ومنظمة بالكامل.
            </p>
          </div>

          {/* 6 Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative font-['Cairo']">
            {[
              { step: "1.", title: "استقبال الطلب", desc: "نستقبل طلبك واستفسارك عبر محادثة واتساب الرسمية ونتعرف على رغبتك ونوع النموذج المطلوب.", icon: "MessageCircle" },
              { step: "2.", title: "مراجعة التفاصيل", desc: "يقوم فريقنا بمراجعة المعايير، الشواهد، أو مؤشرات الأداء الخاصة بمدرستك أو مادتك الدراسية بدقة.", icon: "CheckCircle2" },
              { step: "3.", title: "بدء التنفيذ", desc: "يبدأ خبراؤنا ومصممون بتجهيز الملف وكتابة المحتوى بأعلى معايير التصميم العالمي (Corporate Luxury).", icon: "Sparkles" },
              { step: "4.", title: "إرسال المعاينة", desc: "نرسل لك نسخة معاينة سريعة وكاملة عبر واتساب للاطلاع عليها ومناقشة أي إضافات أو تعديلات ترغب بها.", icon: "Eye" },
              { step: "5.", title: "اعتماد العميل", desc: "بعد إجراء أي تعدیلات طفيفة ترغب بها، يتم اعتمادك النهائي للعمل بكل سعادة ورضا تام 100%.", icon: "UserCheck" },
              { step: "6.", title: "التسليم النهائي", desc: "نرسل إليك كافة الملفات المفتوحة والقابلة للتعديل والطباعة الفورية (Word, PDF, PowerPoint, Excel).", icon: "Award" },
            ].map((item, index) => (
              <div 
                key={index}
                className="relative bg-[#F8F9FC] p-8 rounded-3xl border border-[#E5E7EB] hover:border-[#6C63FF]/50 transition duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-[#6C63FF] font-mono">
                    {item.step}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1F2937] group-hover:bg-[#6C63FF] group-hover:text-white transition duration-300 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-extrabold text-[#1F2937] text-xl group-hover:text-[#6C63FF] transition">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                  {item.desc}
                </p>

                {index < 5 && (
                  <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-[#6C63FF] transform -translate-x-0.5">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO SECTION (معرض الأعمال الديناميكي) */}
      <section id="portfolio" className="py-24 sm:py-32 bg-[#F8F9FC] border-t border-[#E5E7EB] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 font-['Cairo']">
            <span className="px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs inline-block border border-[#6C63FF]/20">
              🏆 معرض الأعمال والديناميكي
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F2937]">
              نماذج وحقائب رقمية فاخرة ومتاحة للطلب الفوري
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-['Tajawal'] font-normal">
              كل عمل هنا تم تصميمه بعناية فائقة واختبار جودته الأكاديمية. اختر التصنيف الذي تحتاجه (ملفات الإنجاز، نافس، الخطط التشغيلية، وغيرها) وعاينة مباشرة أو اطلبه بضغطة زر.
            </p>
          </div>

          {/* Categories Filter Tabs */}
          <div className="space-y-6">
            <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 pt-1 px-1 text-xs sm:text-sm font-bold scrollbar-none font-['Cairo']">
              <button
                onClick={() => setSelectedCategory("الكل")}
                className={`px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  selectedCategory === "الكل" 
                    ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/25 scale-105" 
                    : "bg-white text-[#6B7280] hover:text-[#1F2937] hover:bg-slate-200/60 border border-[#E5E7EB]"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>جميع الأعمال ({works.length})</span>
              </button>

              {categories.map((cat: any) => {
                const count = works.filter((w: any) => w.categoryName === cat.name || w.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                      selectedCategory === cat.name 
                        ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/25 scale-105" 
                        : "bg-white text-[#6B7280] hover:text-[#1F2937] hover:bg-slate-200/60 border border-[#E5E7EB]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {count > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${selectedCategory === cat.name ? "bg-white/20 text-white" : "bg-[#F8F9FC] text-[#6C63FF]"}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick search inside portfolio & Filter clear */}
            <div className="max-w-xl mx-auto">
              <div className="relative font-['Cairo']">
                <Search className="w-4 h-4 text-[#6B7280] absolute right-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث عن نموذج، عنوان، أو كلمة مفتاحية داخل المكتبة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-11 pl-20 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] placeholder-[#6B7280] font-bold focus:outline-none focus:border-[#6C63FF] shadow-xs"
                />
                {(searchQuery || selectedCategory !== "الكل") && (
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("الكل"); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-black hover:bg-rose-100 transition"
                  >
                    إلغاء الفلتر
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Works Grid */}
          {filteredWorks.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E5E7EB] space-y-4 max-w-lg mx-auto shadow-xs font-['Cairo']">
              <div className="w-16 h-16 bg-[#F8F9FC] rounded-2xl flex items-center justify-center text-[#6B7280] mx-auto border border-[#E5E7EB]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1F2937]">لا توجد نماذج متطابقة حالياً</h3>
              <p className="text-xs text-[#6B7280] font-['Tajawal'] leading-relaxed">
                لم نعثر على نماذج تطابق بحثك الحالي في هذا التصنيف. يمكنك التواصل معنا عبر واتساب لإعداد النموذج خصيصاً لمدرستك.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => { setSelectedCategory("الكل"); setSearchQuery(""); }}
                  className="px-5 py-2.5 rounded-xl bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold text-xs border border-[#E5E7EB]"
                >
                  عرض جميع الأعمال
                </button>
                <a
                  href={customOrderWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#1fa950] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>اطلب تصميم مخصص الآن</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorks.map((work: any) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  whatsappNumber={whatsappNumber}
                  messagePrefix={settings.whatsappMessagePrefix}
                  onPreview={() => setPreviewWork(work)}
                />
              ))}
            </div>
          )}

          {/* Button: مشاهدة جميع الأعمال */}
          <div className="pt-6 text-center">
            <a
              href={generalWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-[#1F2937] font-extrabold text-sm sm:text-base border-2 border-[#E5E7EB] hover:border-[#6C63FF] transition duration-300 shadow-sm font-['Cairo']"
            >
              <FolderCheck className="w-5 h-5 text-[#6C63FF]" />
              <span>مشاهدة جميع الأعمال والملف التعريفي الشامل عبر واتساب</span>
              <ArrowLeft className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION (آراء العملاء) */}
      <section id="testimonials" className="py-24 sm:py-32 bg-white scroll-mt-20 border-b border-[#E5E7EB]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4 font-['Cairo']">
            <span className="px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs inline-block border border-[#6C63FF]/20">
              ⭐ آراء وشهادات القيادات المدرسية
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F2937]">
              نفخر بثقة نخبة المعلمين والمعلمات في منصة الزهراء
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-['Tajawal'] font-normal">
              تصلنا شهادات الثقة والإشادة بصفة يومية، وهذه بعض تجارب شركاء التميز الأكاديمي في مختلف مدارس وإدارات التعليم بالمملكة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-['Cairo']">
            {testimonials.map((t: any) => (
              <div 
                key={t.id} 
                className="bg-[#F8F9FC] p-8 rounded-3xl border border-[#E5E7EB] shadow-2xs hover:shadow-xl hover:border-[#6C63FF]/50 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating 5 stars */}
                  <div className="flex items-center gap-1 text-[#22C55E]">
                    {[...Array(t.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                    <span className="text-xs text-[#6B7280] font-bold font-['Tajawal'] mr-2">(5/5 تقييم ممتاز)</span>
                  </div>

                  <p className="text-[#1F2937] text-sm sm:text-[15px] leading-relaxed font-normal font-['Tajawal'] italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#E5E7EB]">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#8B7BFF] flex items-center justify-center text-white font-extrabold text-base shadow-md shrink-0">
                    {t.clientName?.charAt(0) || "أ"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1F2937] text-base">{t.clientName}</h4>
                    <span className="text-xs text-[#6C63FF] font-bold block mt-0.5">{t.clientRole}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION (الأسئلة الشائعة - Accordion أنيق) */}
      <section id="faq" className="py-24 sm:py-32 bg-[#F8F9FC] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-4 font-['Cairo']">
            <span className="px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs inline-block border border-[#6C63FF]/20">
              💡 الأسئلة الشائعة والمساعدة
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F2937]">
              كل ما تود معرفته عن طريقة الطلب والتسليم
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base font-['Tajawal'] font-normal">
              إليك إجابات مفصلة لأبرز الأسئلة المتكررة حول نماذج منصة الزهراء وسرعة الإنجاز وطرق التنسيق الأمنة عبر واتساب.
            </p>
          </div>

          <div className="space-y-4 font-['Cairo']">
            {faqs.map((f: any) => {
              const isOpen = openFaqId === f.id;
              return (
                <div 
                  key={f.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-2xs ${
                    isOpen ? "border-[#6C63FF] shadow-md" : "border-[#E5E7EB] hover:border-[#8B7BFF]/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : f.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 focus:outline-none transition hover:bg-[#F8F9FC]/50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-extrabold text-[#1F2937] text-base sm:text-lg flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#6C63FF] shrink-0" />
                      <span>{f.question}</span>
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${isOpen ? "bg-[#6C63FF] text-white" : "bg-[#F8F9FC] text-[#6B7280]"}`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-[#6B7280] text-sm sm:text-base leading-relaxed border-t border-slate-100 font-normal font-['Tajawal']">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CONTACT SECTION (قسم التواصل - زر كبير جداً تواصل عبر واتساب +966 53 895 0445) */}
      <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-[#E5E7EB]">
        {/* Ambient lavender gradient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8 font-['Cairo']">
          <span className="px-4 py-1.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] font-black text-xs inline-block uppercase tracking-wide">
            💬 تواصل فوري ومباشر
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1F2937] tracking-tight">
            ابدأ مشروعك اليوم.
          </h2>

          <p className="text-base sm:text-xl text-[#6B7280] font-['Tajawal'] leading-relaxed max-w-2xl mx-auto font-normal">
            هل لديك خطة تشغيلية، حقيبة نافس، أو ملف إنجاز ترغب في إعداده بأعلى درجات الفخامة والأناقة الأكاديمية؟ فريق منصة الزهراء جاهز الآن لتحقيق طموحك والتنفيذ الفوري.
          </p>

          {/* Huge CTA Button */}
          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <a
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent("السلام عليكم، أرغب في البدء بمشروعي وطلب خدمات من منصة الزهراء.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-6 rounded-3xl bg-[#22C55E] hover:bg-[#1fa950] text-white font-black text-xl sm:text-2xl shadow-2xl shadow-[#22C55E]/35 flex items-center justify-center gap-3.5 transition duration-300 transform hover:-translate-y-1 active:translate-y-0 max-w-md mx-auto"
            >
              <MessageCircle className="w-8 h-8 fill-current" />
              <span>تواصل عبر واتساب</span>
              <ArrowLeft className="w-6 h-6 ml-2" />
            </a>

            {/* Sub text exactly as requested */}
            <div className="pt-2 flex flex-col items-center space-y-1">
              <span className="text-xs font-black uppercase text-[#6C63FF] tracking-widest bg-[#6C63FF]/10 px-3 py-1 rounded-full">
                واتساب فقط
              </span>
              <span className="text-lg sm:text-2xl font-black font-mono text-[#1F2937] dir-ltr tracking-wider">
                +966 53 895 0445
              </span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-6 text-xs text-[#6B7280] font-['Tajawal'] font-bold">
            <span>✔️ متاحون على مدار الساعة 24/7</span>
            <span>✔️ ردود سريعة ومختصون تربويون</span>
            <span>✔️ ضمان رضى 100% قبل وبعد الاستلام</span>
          </div>
        </div>
      </section>

      {/* Interactive Work Preview Modal */}
      {previewWork && (
        <WorkModal
          work={previewWork}
          whatsappNumber={whatsappNumber}
          messagePrefix={settings.whatsappMessagePrefix || "السلام عليكم، أرغب في طلب هذا النموذج من منصة الزهراء: "}
          onClose={() => setPreviewWork(null)}
        />
      )}

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
}
