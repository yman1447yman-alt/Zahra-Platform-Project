"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  Lock, 
  FileText, 
  ExternalLink, 
  Phone,
  X
} from "lucide-react";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const whatsappNumber = settings?.whatsappNumber || "966538950445";
  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent("السلام عليكم، أرغب في الاستفسار عن خدمات منصة الزهراء.")}`;

  return (
    <>
      <footer className="bg-[#F8F9FC] text-[#1F2937] pt-20 pb-12 border-t border-[#E5E7EB] mt-auto relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6C63FF]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#E5E7EB]">
            {/* Col 1: Branding & Description */}
            <div className="space-y-5 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#8B7BFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#6C63FF]/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-bold text-[#1F2937] tracking-tight font-['Cairo'] block">
                    منصة الزهراء
                  </span>
                  <span className="text-[11px] text-[#6C63FF] font-semibold block">
                    للخدمات التعليمية والحلول الذكية
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#6B7280] leading-relaxed font-['Tajawal'] font-normal">
                {settings?.footerDescription || "منصة الزهراء للخدمات التعليمية والحلول الذكية. حلول تعليمية وإدارية وتصميمية متكاملة."}
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs text-[#22C55E] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>نضمن الجودة الفائقة والتسليم بالمواعيد</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h3 className="text-[#1F2937] font-bold text-base mb-5 font-['Cairo'] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#6C63FF] rounded-full inline-block" />
                <span>روابط سريعة</span>
              </h3>
              <ul className="space-y-3 text-sm font-['Tajawal'] font-medium text-[#6B7280]">
                <li>
                  <Link href="/#hero" className="hover:text-[#6C63FF] transition-colors inline-block">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-[#6C63FF] transition-colors inline-block">
                    الخدمات
                  </Link>
                </li>
                <li>
                  <Link href="/#why-us" className="hover:text-[#6C63FF] transition-colors inline-block">
                    من نحن (لماذا الزهراء)
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-[#6C63FF] transition-colors inline-block">
                    تواصل معنا
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType("privacy")} 
                    className="hover:text-[#6C63FF] transition-colors text-right text-left-auto cursor-pointer"
                  >
                    سياسة الخصوصية
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalType("terms")} 
                    className="hover:text-[#6C63FF] transition-colors text-right text-left-auto cursor-pointer"
                  >
                    الشروط والأحكام
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Notable Solutions */}
            <div>
              <h3 className="text-[#1F2937] font-bold text-base mb-5 font-['Cairo'] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#8B7BFF] rounded-full inline-block" />
                <span>أبرز حلولنا الذكية</span>
              </h3>
              <ul className="space-y-3 text-sm font-['Tajawal'] text-[#6B7280]">
                <li className="flex items-center gap-2 hover:text-[#1F2937] transition cursor-pointer" onClick={() => window.location.hash = "#portfolio"}>
                  <span className="text-[#6C63FF] font-bold">•</span>
                  <span>الخطط التشغيلية ومؤشرات الأداء</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#1F2937] transition cursor-pointer" onClick={() => window.location.hash = "#portfolio"}>
                  <span className="text-[#6C63FF] font-bold">•</span>
                  <span>ملفات الإنجاز وحقائب التطور المهني</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#1F2937] transition cursor-pointer" onClick={() => window.location.hash = "#portfolio"}>
                  <span className="text-[#6C63FF] font-bold">•</span>
                  <span>حقائب واختبارات محاكاة نافس</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#1F2937] transition cursor-pointer" onClick={() => window.location.hash = "#portfolio"}>
                  <span className="text-[#6C63FF] font-bold">•</span>
                  <span>سجلات شواهد التقويم الخارجي والداخلي</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#1F2937] transition cursor-pointer" onClick={() => window.location.hash = "#portfolio"}>
                  <span className="text-[#6C63FF] font-bold">•</span>
                  <span>تصميم عروض PowerPoint التفاعلية</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Means (WhatsApp Only) */}
            <div>
              <h3 className="text-[#1F2937] font-bold text-base mb-5 font-['Cairo'] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#B497FF] rounded-full inline-block" />
                <span>وسائل التواصل</span>
              </h3>
              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[#22C55E]/15 text-[#22C55E] text-xs font-black rounded-lg uppercase tracking-wider">
                    واتساب فقط
                  </span>
                  <span className="text-xs text-[#6B7280]">رد سريع الفورية ⚡</span>
                </div>

                <div className="flex items-center gap-3 text-[#1F2937]">
                  <Phone className="w-5 h-5 text-[#6C63FF] shrink-0" />
                  <span className="font-mono text-base font-black dir-ltr text-right w-full block">
                    +{cleanWaNumber}
                  </span>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#22C55E] hover:bg-[#1fa950] text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md shadow-[#22C55E]/20 transition transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>تواصل الآن عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Admin Gateway */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#6B7280] font-['Tajawal'] gap-4">
            <p className="font-medium text-center sm:text-right">
              © 2026 <strong className="text-[#1F2937] font-bold mx-1">منصة الزهراء للخدمات التعليمية والحلول الذكية</strong>. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-[#6B7280]">
                صمم بشغف وجودة عالمية <Heart className="w-4 h-4 text-[#6C63FF] fill-current" />
              </span>
              <Link
                href="/admin"
                className="text-[#6C63FF] hover:underline font-bold inline-flex items-center gap-1 bg-[#6C63FF]/5 px-3 py-1 rounded-lg border border-[#6C63FF]/20 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>دخول الإدارة</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-[#1F2937]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-opacity">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full border border-[#E5E7EB] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#1F2937] font-['Cairo'] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#6C63FF]" />
                <span>{modalType === "privacy" ? "سياسة الخصوصية وسرية المعلومات" : "الشروط والأحكام وموثوقية الخدمة"}</span>
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="w-9 h-9 rounded-xl bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-2 space-y-4 text-sm sm:text-base text-[#6B7280] leading-relaxed font-['Tajawal'] flex-1">
              {modalType === "privacy" ? (
                <>
                  <p className="font-bold text-[#1F2937]">في منصة الزهراء للخدمات التعليمية والحلول الذكية، نلتزم بأقصى درجات سرية وحماية بياناتك:</p>
                  <ul className="list-disc pr-5 space-y-2">
                    <li><strong>سرية الملفات والوثائق:</strong> جميع الشواهد والمستندات والأسماء التي تزودنا بها أثناء تنفيذ الملفات والخطط تعتبر سرية تماماً ولا يتم مشاركتها مطلقاً مع أي جهة أو استخدامها كقوالب مكشوفة.</li>
                    <li><strong>حماية معلومات الاتصال:</strong> أرقام الهواتف والبريد الإلكتروني تُستخدم حصرياً للتواصل بشأن طلبك الفوري عبر الواتساب ولا يُعاد إرسالها أو تداولها.</li>
                    <li><strong>أمان التعاملات التفاعلية:</strong> تتم جميع الاتفاقيات والإرسال بصيغة مشفرة وآمنة لضمان الراحة والثقة الأكاديمية المطلقة لعنايتها بالتربوين والمعلمين والمعلمات.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-bold text-[#1F2937]">نحن نعتز بشراكة النجاح والتميز مع جميع قيادات التعليم في جميع مدارس المملكة وفق الشروط التفاعلية السلسة:</p>
                  <ul className="list-disc pr-5 space-y-2">
                    <li><strong>الالتزام المطلق بالمواعيد:</strong> نتعهد بتسليم العمل والملفات الجاهزة والمخصصة في الوقت المتفق عليه عبر محادثة الواتساب بدقة متناهية 100%.</li>
                    <li><strong>حق التعديل والمراجعة:</strong> يحق للعميل مراجعة المعاينة الأولية لعمله وتقديم ملاحظاته ليقوم فريق الزهراء بالتعديل السريع والمتقن للوصول لرضى 100%.</li>
                    <li><strong>الملكية الأكاديمية:</strong> عند استلامك للملف النهائي (Word، PDF، PowerPoint)، تصبح مالكاً لكافة الصلاحيات لاستخدامه وطباعته وتعديل محتواه داخل نطاق عملك التربوي بكل حرية.</li>
                  </ul>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-6 py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-bold text-sm transition shadow-sm"
              >
                فهمت وأوافق على ذلك
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
