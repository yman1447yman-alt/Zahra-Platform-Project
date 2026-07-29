"use client";

import React, { useState } from "react";
import { Tag, MessageCircle, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { initialPrices, PriceItem } from "@/data/pricesData";

export default function PublicPricesPage() {
  const [search, setSearch] = useState("");
  const prices: PriceItem[] = initialPrices;

  const filteredPrices = prices.filter(
    (item) =>
      item.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      item.sectionName.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filteredPrices.reduce((acc, item) => {
    if (!acc[item.sectionName]) acc[item.sectionName] = [];
    acc[item.sectionName].push(item);
    return acc;
  }, {} as Record<string, PriceItem[]>);

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-12 px-6 sm:px-10 font-['Cairo']" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#6C63FF] font-bold bg-white px-4 py-2 rounded-full border border-[#E5E7EB] shadow-xs mb-4">
            <ArrowRight className="w-4 h-4" /> العودة للرئيسية
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1F2937]">قائمة الأسعار الشاملة</h1>
          <p className="text-base text-[#6B7280] max-w-xl mx-auto">
            استعرض كافة الخدمات والملفات التعليمية والإدارية المتاحة في منصة الزهراء مع أسعارها المعتمدة.
          </p>

          <div className="max-w-md mx-auto relative pt-4">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 mt-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن اسم الخدمة أو القسم..."
              className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm text-sm focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-3xl border border-[#E5E7EB]">
            لا توجد نتائج مطابقة لبحثك.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([section, items]) => (
              <div key={section} className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-4">
                  <Tag className="w-5 h-5 text-[#6C63FF]" />
                  <h2 className="text-xl font-extrabold text-[#1F2937]">{section}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((item) => {
                    const orderUrl = `https://wa.me/966538950445?text=${encodeURIComponent(
                      `السلام عليكم، أرغب في طلب خدمة: ${item.serviceName} (${item.price} ريال)`
                    )}`;
                    return (
                      <div key={item.id} className="p-4 rounded-2xl bg-[#F8F9FC] border border-[#E5E7EB]/60 flex items-center justify-between gap-4 hover:border-[#6C63FF] transition">
                        <div>
                          <h4 className="font-bold text-[#1F2937] text-sm sm:text-base">{item.serviceName}</h4>
                          <span className="text-xs font-extrabold text-[#22C55E] mt-1 inline-block">{item.price} ريال</span>
                        </div>
                        <a
                          href={orderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-[#22C55E] hover:bg-[#1fa950] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm shrink-0"
                        >
                          <MessageCircle className="w-4 h-4" /> طلب
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
