"use client";

import React, { useState } from "react";
import { X, MessageCircle, FileText, CheckCircle2, ChevronLeft, ChevronRight, Download, Eye, Tag, Sparkles, ShieldCheck } from "lucide-react";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  categoryName: string;
  price: string;
  coverImage: string;
  galleryImages: string[];
  pdfUrl?: string;
  orderCount?: number;
}

interface WorkModalProps {
  work: WorkItem;
  whatsappNumber: string;
  messagePrefix?: string;
  onClose: () => void;
}

export default function WorkModal({ 
  work, 
  whatsappNumber, 
  messagePrefix = "السلام عليكم، أرغب في طلب هذا النموذج من منصة الزهراء: ", 
  onClose 
}: WorkModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showPdf, setShowPdf] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const images = work.galleryImages?.length ? work.galleryImages : [work.coverImage];
  const currentImg = images[activeImageIdx] || work.coverImage;

  const cleanWa = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "966538950445";
  const fullText = `${messagePrefix}${work.title} (السعر: ${work.price || "حسب العرض"})`;
  const orderUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(fullText)}`;
  const orderCustomUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`السلام عليكم، أرغب في طلب تصميم نموذج مخصص شبيه بـ (${work.title}).`)}`;

  const handleOrderClick = async () => {
    setIsOrdering(true);
    try {
      await fetch(`/api/works/${work.id}/order`, { method: "POST" });
    } catch {
      // ignore
    }
    setIsOrdering(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1F2937]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-up">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5E7EB] flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4.5 bg-[#F8F9FC] border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3.5 py-1 bg-[#6C63FF]/10 text-[#6C63FF] font-bold text-xs rounded-full border border-[#6C63FF]/20 flex items-center gap-1.5 font-['Cairo']">
              <Tag className="w-3.5 h-3.5" />
              <span>{work.categoryName || "نموذج فاخر"}</span>
            </span>
            {work.price && (
              <span className="px-3.5 py-1 bg-[#22C55E]/15 text-[#22C55E] font-black text-xs rounded-full border border-[#22C55E]/30 font-['Cairo']">
                السعر: {work.price}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق المعاينة"
            className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] transition shadow-2xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7 flex-1 font-['Tajawal']">
          {/* Title & Trust info */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] leading-tight font-['Cairo']">
              {work.title}
            </h2>
            <div className="flex items-center flex-wrap gap-4 text-xs text-[#6B7280] font-medium">
              <span className="flex items-center gap-1.5 text-[#22C55E] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>مطابق لأحدث معايير هيئة تقويم التعليم والوزارة</span>
              </span>
              <span className="flex items-center gap-1 text-[#6C63FF] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>تسليم فوري ومحكم عبر واتساب المنصة</span>
              </span>
              {work.orderCount !== undefined && work.orderCount > 0 && (
                <span className="text-[#8B7BFF]">⚡ تم اقتناء وتفضيل هذا النموذج ({work.orderCount + 10}) مرة</span>
              )}
            </div>
          </div>

          {/* Toggle View: Gallery vs PDF Preview */}
          {work.pdfUrl && (
            <div className="flex gap-2 p-1.5 bg-[#F8F9FC] rounded-2xl w-fit border border-[#E5E7EB]">
              <button
                onClick={() => setShowPdf(false)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 font-['Cairo'] ${
                  !showPdf ? "bg-white text-[#6C63FF] shadow-sm border border-[#E5E7EB]" : "text-[#6B7280] hover:text-[#1F2937]"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>معاينة صور النموذج ({images.length})</span>
              </button>
              <button
                onClick={() => setShowPdf(true)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 font-['Cairo'] ${
                  showPdf ? "bg-white text-[#6C63FF] shadow-sm border border-[#E5E7EB]" : "text-[#6B7280] hover:text-[#1F2937]"
                }`}
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>معاينة ملف الـ PDF المرفق</span>
              </button>
            </div>
          )}

          {/* Gallery Carousel */}
          {!showPdf ? (
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#F8F9FC] border border-[#E5E7EB] shadow-inner flex items-center justify-center group">
                <img
                  src={currentImg}
                  alt={work.title}
                  className="w-full h-full object-cover transition duration-500"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/90 hover:bg-white text-[#1F2937] flex items-center justify-center transition shadow-lg border border-[#E5E7EB]"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setActiveImageIdx((prev) => (prev + 1) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/90 hover:bg-white text-[#1F2937] flex items-center justify-center transition shadow-lg border border-[#E5E7EB]"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-[#1F2937]/80 text-white text-xs font-bold backdrop-blur-md font-['Cairo'] shadow-sm">
                  صورة {activeImageIdx + 1} من {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        activeImageIdx === idx 
                          ? "border-[#6C63FF] shadow-md scale-105" 
                          : "border-[#E5E7EB] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* PDF Interactive Preview View */
            <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden bg-[#F8F9FC] shadow-sm">
              <div className="bg-white px-5 py-3 border-b border-[#E5E7EB] flex items-center justify-between text-xs text-[#1F2937] font-['Cairo'] font-bold">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span>معاينة مستند PDF الفعلي</span>
                </span>
                <a
                  href={work.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 text-[#6C63FF] flex items-center gap-1.5 transition font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>فتح في نافذة جديدة</span>
                </a>
              </div>
              <iframe
                src={work.pdfUrl}
                className="w-full h-[380px] sm:h-[480px] bg-white border-0"
                title="معاينة PDF منصة الزهراء"
              />
            </div>
          )}

          {/* Description & Advantages */}
          <div className="bg-[#F8F9FC] p-6 sm:p-7 rounded-3xl border border-[#E5E7EB] space-y-4">
            <h3 className="font-extrabold text-[#1F2937] text-lg font-['Cairo'] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6C63FF]" />
              <span>تفاصيل ومزايا الملف عند الاستلام:</span>
            </h3>
            <p className="text-[#6B7280] text-base leading-relaxed whitespace-pre-line font-normal font-['Tajawal']">
              {work.description}
            </p>

            <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold text-[#1F2937]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>إمكانية التعديل والإضافة المباشرة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>تنسيق وألوان هادئة وفاخرة جداً</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>تواصل واستلام فوري عبر واتساب</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action CTA Bars */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 font-['Cairo']">
          <div className="text-center sm:text-right">
            <span className="block text-xs text-[#6B7280] font-medium">سعر هذا النموذج الاستثماري:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1F2937]">
              {work.price || "99 ريال"}
            </span>
            <span className="text-[11px] text-[#22C55E] font-bold block sm:inline sm:ml-2">
              (اطلب الآن عبر واتساب المنصة مباشرة)
            </span>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrderClick}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#22C55E] hover:bg-[#1fa950] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#22C55E]/25 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>اطلب هذا النموذج</span>
            </a>

            <a
              href={orderCustomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md shadow-[#6C63FF]/25 transition"
            >
              <span>اطلب مثل هذا (تخصيص)</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-[#F8F9FC] hover:bg-slate-200 text-[#6B7280] hover:text-[#1F2937] font-bold text-sm text-center transition border border-[#E5E7EB]"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
