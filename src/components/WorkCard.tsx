"use client";

import React from "react";
import { Eye, MessageCircle, FileText, Tag, Image as ImageIcon, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";

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

interface WorkCardProps {
  work: WorkItem;
  whatsappNumber?: string;
  messagePrefix?: string;
  onPreview: () => void;
}

export default function WorkCard({
  work,
  whatsappNumber = "966538950445",
  messagePrefix = "السلام عليكم، أرغب في طلب هذا النموذج من منصة الزهراء: ",
  onPreview,
}: WorkCardProps) {
  const cleanWa = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "966538950445";
  const fullText = `${messagePrefix}${work.title}`;
  const orderUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(fullText)}`;

  const handleOrderClick = async () => {
    try {
      await fetch(`/api/works/${work.id}/order`, { method: "POST" });
    } catch {
      // ignore silently
    }
  };

  const galleryCount = work.galleryImages ? work.galleryImages.length : 1;

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xs hover:shadow-xl hover:border-[#8B7BFF]/60 transition-all duration-500 flex flex-col overflow-hidden group">
      {/* Cover Image Container */}
      <div 
        onClick={onPreview}
        className="relative aspect-video w-full overflow-hidden bg-[#F8F9FC] cursor-pointer"
      >
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out opacity-95 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/75 via-[#1F2937]/15 to-transparent opacity-60 group-hover:opacity-40 transition duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#6C63FF] font-bold text-xs rounded-xl shadow-sm border border-[#E5E7EB]/50 flex items-center gap-1.5 font-['Cairo']">
            <Tag className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>{work.categoryName || "نموذج فاخر"}</span>
          </span>
        </div>

        {/* Left Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-end z-10">
          {work.price && (
            <span className="px-3 py-1 bg-[#22C55E]/90 backdrop-blur-md text-white font-extrabold text-xs rounded-xl shadow-sm border border-white/20 font-['Cairo']">
              {work.price}
            </span>
          )}
          {work.pdfUrl && (
            <span className="px-2.5 py-1 bg-[#6C63FF]/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-2xs flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>PDF متاح للمعاينة</span>
            </span>
          )}
          {galleryCount > 1 && (
            <span className="px-2.5 py-1 bg-[#1F2937]/75 backdrop-blur-md text-[#F8F9FC] text-[11px] font-semibold rounded-lg flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              <span>{galleryCount} صور</span>
            </span>
          )}
        </div>

        {/* Hover Center Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-400 bg-[#6C63FF]/20 backdrop-blur-[2px]">
          <span className="px-5 py-2.5 bg-white/95 text-[#1F2937] font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition duration-300 font-['Cairo']">
            <Eye className="w-4 h-4 text-[#6C63FF]" />
            <span>انقر للمعاينة والتفاصيل</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <h3 
            onClick={onPreview}
            className="text-lg sm:text-xl font-extrabold text-[#1F2937] line-clamp-2 hover:text-[#6C63FF] transition cursor-pointer leading-snug font-['Cairo']"
          >
            {work.title}
          </h3>
          <p className="text-sm text-[#6B7280] line-clamp-3 leading-relaxed font-normal font-['Tajawal']">
            {work.description}
          </p>

          <div className="pt-1 flex items-center gap-4 text-xs font-semibold text-[#6B7280]">
            <span className="flex items-center gap-1 text-[#22C55E]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>جاهز للتعديل والطباعة</span>
            </span>
            {work.orderCount !== undefined && work.orderCount > 0 && (
              <span className="text-[#8B7BFF] font-medium">⚡ طُلِب ({work.orderCount + 10}) مرات</span>
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-5 border-t border-[#E5E7EB] flex items-center gap-3">
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOrderClick}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#22C55E] hover:bg-[#1fa950] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#22C55E]/20 transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-['Cairo']"
          >
            <MessageCircle className="w-5 h-5 fill-current shrink-0" />
            <span>اطلب هذا النموذج</span>
            <ArrowLeft className="w-4 h-4 text-white/80 transition-transform group-hover:-translate-x-1" />
          </a>

          <button
            onClick={onPreview}
            className="px-4 py-3.5 rounded-2xl bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold text-sm flex items-center justify-center gap-1.5 border border-[#E5E7EB] transition shrink-0 font-['Cairo'] hover:text-[#6C63FF]"
          >
            <Eye className="w-4 h-4 text-[#6C63FF]" />
            <span>معاينة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
