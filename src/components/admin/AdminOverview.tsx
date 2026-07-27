"use client";

import React from "react";
import { FileText, FolderOpen, Award, MessageCircle, Sparkles, PlusCircle, TrendingUp } from "lucide-react";

interface AdminOverviewProps {
  data: any;
  onSelectTab: (tab: string) => void;
}

export default function AdminOverview({ data, onSelectTab }: AdminOverviewProps) {
  const totalWorks = data?.works?.length || 0;
  const totalCategories = data?.categories?.length || 0;
  const totalServices = data?.services?.length || 0;
  const totalTestimonials = data?.testimonials?.length || 0;

  const totalOrders = data?.works?.reduce((sum: number, w: any) => sum + (w.orderCount || 0), 0) || 0;

  return (
    <div className="space-y-8 font-['Cairo']">
      {/* Welcome & Action Banner */}
      <div className="bg-gradient-to-r from-[#6C63FF] via-[#7D70FF] to-[#8B7BFF] rounded-3xl p-7 sm:p-9 text-white shadow-xl shadow-[#6C63FF]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold inline-block backdrop-blur-md border border-white/20">
              👑 مركز قيادة منصة الزهراء للخدمات التعليمية والحلول الذكية
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              مرحباً بك يا مدير المنصة!
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed font-['Tajawal'] font-normal">
              صممنا لك هذه اللوحة بأسلوب الشركات العالمية الهادئ، بحيث تستطيع بكل سرعة إضافة نموذج عمل جديد، تعديل الأسعار، رفع ملفات PDF وصور الغلاف، وتغيير رقم الواتساب ونصوص الموقع دون كتابة أي كود نهائياً.
            </p>
          </div>

          <button
            onClick={() => onSelectTab("works")}
            className="px-6 py-4 rounded-2xl bg-white hover:bg-[#F8F9FC] text-[#1F2937] font-black text-sm shadow-xl flex items-center gap-2.5 transform hover:-translate-y-0.5 transition shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-[#22C55E]" />
            <span>+ أضف نموذج عمل جديد في دقيقة</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => onSelectTab("works")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center gap-5 hover:border-[#6C63FF] transition cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/10 text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white transition flex items-center justify-center font-bold shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[#6B7280] text-xs font-bold mb-1">إجمالي النماذج والملفات</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1F2937] font-mono">{totalWorks}</span>
            <span className="block text-[11px] text-[#22C55E] mt-0.5 font-bold font-['Tajawal']">متاحة في المعرض حالياً</span>
          </div>
        </div>

        <div 
          onClick={() => onSelectTab("categories")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center gap-5 hover:border-[#8B7BFF] transition cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#8B7BFF]/15 text-[#8B7BFF] group-hover:bg-[#8B7BFF] group-hover:text-white transition flex items-center justify-center font-bold shrink-0">
            <FolderOpen className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[#6B7280] text-xs font-bold mb-1">التصنيفات المعتمدة</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1F2937] font-mono">{totalCategories}</span>
            <span className="block text-[11px] text-[#6C63FF] mt-0.5 font-bold font-['Tajawal']">تسهل البحث على العميل</span>
          </div>
        </div>

        <div 
          onClick={() => onSelectTab("works")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center gap-5 hover:border-[#22C55E] transition cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/15 text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition flex items-center justify-center font-bold shrink-0">
            <MessageCircle className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[#6B7280] text-xs font-bold mb-1">نقرات الطلب عبر واتساب</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1F2937] font-mono">{totalOrders}</span>
            <span className="block text-[11px] text-[#22C55E] mt-0.5 font-bold font-['Tajawal']">إجمالي التفاعل من الزوار</span>
          </div>
        </div>

        <div 
          onClick={() => onSelectTab("services")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center gap-5 hover:border-[#B497FF] transition cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#B497FF]/20 text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white transition flex items-center justify-center font-bold shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[#6B7280] text-xs font-bold mb-1">الخدمات والآراء</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1F2937] font-mono">{totalServices + totalTestimonials}</span>
            <span className="block text-[11px] text-[#8B7BFF] mt-0.5 font-bold font-['Tajawal']">تغطي كافة متطلبات المدارس</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h3 className="text-lg font-black text-[#1F2937] mb-5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#6C63FF]" />
          <span>اختر القسم الذي تريد إدارته بسرعة:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button
            onClick={() => onSelectTab("works")}
            className="p-7 bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#6C63FF] hover:shadow-lg transition text-right group flex flex-col justify-between h-44 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FC] border border-[#E5E7EB] text-[#6C63FF] flex items-center justify-center group-hover:bg-[#6C63FF] group-hover:text-white transition">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold px-3 py-1 bg-[#6C63FF]/10 text-[#6C63FF] rounded-full">الرئيسي</span>
            </div>
            <div>
              <h4 className="font-black text-[#1F2937] text-lg group-hover:text-[#6C63FF] transition">إدارة معرض النماذج</h4>
              <p className="text-xs text-[#6B7280] mt-1 font-['Tajawal']">إضافة عمل جديد في دقيقة، رفع صور غلاف وملف PDF</p>
            </div>
          </button>

          <button
            onClick={() => onSelectTab("categories")}
            className="p-7 bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#8B7BFF] hover:shadow-lg transition text-right group flex flex-col justify-between h-44 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FC] border border-[#E5E7EB] text-[#8B7BFF] flex items-center justify-center group-hover:bg-[#8B7BFF] group-hover:text-white transition">
                <FolderOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#6B7280] bg-[#F8F9FC] px-2.5 py-1 rounded-lg">{totalCategories} تصنيف</span>
            </div>
            <div>
              <h4 className="font-black text-[#1F2937] text-lg group-hover:text-[#8B7BFF] transition">إدارة التصنيفات</h4>
              <p className="text-xs text-[#6B7280] mt-1 font-['Tajawal']">تعديل أسماء التصنيفات التعليمية أو إضافة تصنيف جديد</p>
            </div>
          </button>

          <button
            onClick={() => onSelectTab("settings")}
            className="p-7 bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#22C55E] hover:shadow-lg transition text-right group flex flex-col justify-between h-44 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 border border-[#E5E7EB] text-[#22C55E] flex items-center justify-center group-hover:bg-[#22C55E] group-hover:text-white transition">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/15 px-2.5 py-1 rounded-lg">واتساب متصل</span>
            </div>
            <div>
              <h4 className="font-black text-[#1F2937] text-lg group-hover:text-[#22C55E] transition">رقم الواتساب والإعدادات</h4>
              <p className="text-xs text-[#6B7280] mt-1 font-['Tajawal']">تغيير رقم الواتساب ونصوص الهيرو والإحصاءات بضغطة زر</p>
            </div>
          </button>
        </div>
      </div>

      {/* WhatsApp Quick Info Strip */}
      <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-right">
          <span className="text-[#22C55E] font-extrabold text-xs flex items-center justify-center md:justify-start gap-1.5 uppercase tracking-wide">
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>الرقم الرسمي المرتبط بجميع أزرار الطلب في الموقع</span>
          </span>
          <h4 className="text-lg font-black text-[#1F2937]">
            رقم الواتساب الحالي: <span className="text-[#6C63FF] font-mono dir-ltr ml-2 inline-block font-extrabold">+{data?.settings?.whatsappNumber || "966538950445"}</span>
          </h4>
          <p className="text-[#6B7280] text-xs font-['Tajawal']">
            عند تغيير الرقم من تبويب «رقم الواتساب وإعدادات النصوص»، سيتغير فوراً في كافة بطاقات "اطلب هذا النموذج" وفوتر الموقع!
          </p>
        </div>

        <button
          onClick={() => onSelectTab("settings")}
          className="px-6 py-3.5 bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-extrabold text-sm rounded-2xl shadow-md shadow-[#6C63FF]/25 transition shrink-0"
        >
          تعديل الرقم أو النصوص الآن
        </button>
      </div>
    </div>
  );
}
