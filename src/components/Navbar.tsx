"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  MessageCircle,
  ChevronLeft,
  BookOpen,
  ArrowUpRight
} from "lucide-react";

interface NavbarProps {
  siteTitle?: string;
  whatsappNumber?: string;
}

export default function Navbar({ 
  siteTitle = "منصة الزهراء للخدمات التعليمية والحلول الذكية", 
  whatsappNumber = "966538950445" 
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cleanWaNumber = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "966538950445";
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent("السلام عليكم، أرغب في الاستفسار عن خدمات منصة الزهراء.")}`;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/85 backdrop-blur-xl border-b border-[#E5E7EB] shadow-sm py-3.5" 
          : "bg-white/60 backdrop-blur-md border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6C63FF] via-[#8B7BFF] to-[#B497FF] flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/25 group-hover:scale-105 transition duration-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1F2937] group-hover:text-[#6C63FF] transition duration-200 font-['Cairo']">
                {siteTitle.split(" ")[0] + " " + (siteTitle.split(" ")[1] || "الزهراء")}
              </span>
              <span className="text-[11px] text-[#6B7280] font-medium font-['Tajawal'] tracking-wide">
                للخدمات التعليمية والحلول الذكية
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (RTL Ordered) */}
          <nav className="hidden xl:flex items-center gap-7 text-[15px] font-semibold text-[#1F2937]/80 font-['Tajawal']">
            <Link href="/#hero" className="hover:text-[#6C63FF] transition-colors py-1">
              الرئيسية
            </Link>
            <Link href="/#services" className="hover:text-[#6C63FF] transition-colors py-1">
              الخدمات
            </Link>
            <Link href="/#why-us" className="hover:text-[#6C63FF] transition-colors py-1">
              لماذا نحن
            </Link>
            <Link href="/#process" className="hover:text-[#6C63FF] transition-colors py-1">
              آلية العمل
            </Link>
            <Link href="/#portfolio" className="hover:text-[#6C63FF] transition-colors py-1">
              معرض الأعمال
            </Link>
            <Link href="/#testimonials" className="hover:text-[#6C63FF] transition-colors py-1">
              آراء العملاء
            </Link>
            <Link href="/#faq" className="hover:text-[#6C63FF] transition-colors py-1">
              الأسئلة الشائعة
            </Link>
            <Link href="/#contact" className="hover:text-[#6C63FF] transition-colors py-1">
              تواصل معنا
            </Link>
          </nav>

          {/* Action Buttons in Far Left (RTL end) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Admin link for easy dashboard access */}
            <Link
              href="/admin"
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#F8F9FC] text-[#6B7280] hover:text-[#6C63FF] hover:bg-[#6C63FF]/10 border border-[#E5E7EB] transition flex items-center gap-1.5 shadow-2xs"
              title="الدخول إلى لوحة التحكم الإدارية"
            >
              <ShieldCheck className="w-4 h-4 text-[#6C63FF]" />
              <span>لوحة التحكم</span>
            </Link>

            {/* Featured CTA Button: ابدأ الآن */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-bold text-sm shadow-md shadow-[#6C63FF]/30 flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <span className="relative z-10 font-['Cairo'] tracking-wide">ابدأ الآن</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            </a>
          </div>

          {/* Mobile Menu & Quick Buttons */}
          <div className="flex xl:hidden items-center gap-2.5">
            <Link
              href="/admin"
              className="p-2 text-xs font-bold rounded-xl bg-[#F8F9FC] text-[#6B7280] border border-[#E5E7EB]"
              title="لوحة الإدارة"
            >
              <ShieldCheck className="w-5 h-5 text-[#6C63FF]" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="فتح القائمة"
              className="p-2.5 rounded-xl text-[#1F2937] hover:text-[#6C63FF] hover:bg-[#F8F9FC] focus:outline-none transition border border-[#E5E7EB]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-[#E5E7EB] px-6 pt-4 pb-8 space-y-4 shadow-xl animate-fade-up">
          <div className="flex flex-col space-y-3 font-medium text-base text-[#1F2937]">
            <Link
              href="/#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              الرئيسية
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              الخدمات
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              لماذا نحن
            </Link>
            <Link
              href="/#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              آلية العمل
            </Link>
            <Link
              href="/#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              معرض الأعمال
            </Link>
            <Link
              href="/#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              آراء العملاء
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] border-b border-slate-100 transition"
            >
              الأسئلة الشائعة
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#6C63FF] transition"
            >
              تواصل معنا
            </Link>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-[#6C63FF]/30 transition"
            >
              <span>ابدأ الآن</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] text-center font-bold text-sm flex items-center justify-center gap-2 border border-[#E5E7EB]"
            >
              <ShieldCheck className="w-5 h-5 text-[#6C63FF]" />
              <span>الدخول إلى لوحة إدارة المنصة</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
