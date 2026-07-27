"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Home, 
  FileText, 
  FolderOpen, 
  Award, 
  Settings, 
  Loader2, 
  Sparkles, 
  TrendingUp, 
  Users, 
  CheckCircle2 
} from "lucide-react";

import AdminOverview from "@/components/admin/AdminOverview";
import AdminWorksManager from "@/components/admin/AdminWorksManager";
import AdminCategoriesManager from "@/components/admin/AdminCategoriesManager";
import AdminServicesManager from "@/components/admin/AdminServicesManager";
import AdminSettingsAndMore from "@/components/admin/AdminSettingsAndMore";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [platformData, setPlatformData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Login form state
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/data");
      if (res.ok) {
        const data = await res.json();
        setPlatformData(data);
      }
    } catch (e) {
      console.error("Error fetching platform data:", e);
    }
  }, []);

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        setAuthenticated(sessionData.authenticated);
        
        await fetchData();
      } catch (e) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndLoad();
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await res.json();

      if (result.success) {
        setAuthenticated(true);
      } else {
        setLoginError(result.error || "بيانات الدخول غير صحيحة.");
      }
    } catch {
      setLoginError("حدث خطأ أثناء محاولة تسجيل الدخول.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center text-[#1F2937] gap-4 font-['Cairo']">
        <Loader2 className="w-10 h-10 animate-spin text-[#6C63FF]" />
        <span className="font-bold text-base">جاري الاتصال بمركز التحكم الآمن لمنصة الزهراء...</span>
      </div>
    );
  }

  // Render Login Screen if Not Authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4 sm:p-6 text-[#1F2937] relative overflow-hidden font-['Cairo']">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#6C63FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#8B7BFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl p-8 sm:p-10 z-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#6C63FF] to-[#8B7BFF] rounded-2xl mx-auto flex items-center justify-center text-white shadow-md shadow-[#6C63FF]/25">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1F2937]">
              دخول الإدارة المنصة
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] font-['Tajawal'] font-medium">
              منصة الزهراء للخدمات التعليمية والحلول الذكية
            </p>
          </div>

          {loginError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">اسم المستخدم (المشرف)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-bold focus:outline-none focus:border-[#6C63FF] transition"
                placeholder="admin"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">كلمة المرور</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-bold focus:outline-none focus:border-[#6C63FF] transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 rounded-2xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-extrabold text-base shadow-lg shadow-[#6C63FF]/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
              <span>تسجيل الدخول وبدء الإدارة</span>
            </button>
          </form>

          <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1 text-center font-['Tajawal']">
            <span className="font-bold block text-[#6C63FF]">💡 بيانات الدخول السلسة المجهزة لك:</span>
            <span>اسم المستخدم: <strong className="text-[#1F2937]">admin</strong> | كلمة المرور: <strong className="text-[#1F2937]">admin123</strong></span>
          </div>

          <div className="pt-2 text-center border-t border-[#E5E7EB]/80">
            <Link href="/" className="text-xs font-bold text-[#6B7280] hover:text-[#6C63FF] transition inline-flex items-center gap-1.5">
              <span>→ العودة إلى واجهة الموقع الرئيسي</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1F2937] flex flex-col font-['Cairo']">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-2xs border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#6C63FF] flex items-center justify-center text-white font-extrabold shadow-sm shadow-[#6C63FF]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1F2937] flex items-center gap-2">
                <span>لوحة التحكم الإدارية</span>
                <span className="text-[11px] bg-[#22C55E]/15 text-[#22C55E] px-2.5 py-0.5 rounded-full font-black">الزهراء PRO</span>
              </span>
              <span className="block text-xs text-[#6B7280] font-medium font-['Tajawal']">
                إدارة كاملة بدون كود في أقل من دقيقة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold text-xs flex items-center gap-2 border border-[#E5E7EB] transition shadow-2xs"
            >
              <Home className="w-4 h-4 text-[#6C63FF]" />
              <span className="hidden sm:inline">عرض الموقع الحي 🌐</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 flex items-center gap-1.5 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-3xl p-3.5 border border-[#E5E7EB] shadow-sm space-y-1.5">
            <div className="px-4 py-2.5 text-[11px] font-black text-[#6B7280] uppercase tracking-wider">
              أقسام المنصة الإدارية
            </div>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full px-4 py-3.5 rounded-2xl font-extrabold text-sm flex items-center gap-3 transition text-right ${
                activeTab === "overview" 
                  ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" 
                  : "text-[#1F2937] hover:bg-[#F8F9FC]"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>نظرة عامة وإحصاءات</span>
            </button>

            <button
              onClick={() => setActiveTab("works")}
              className={`w-full px-4 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-between transition text-right ${
                activeTab === "works" 
                  ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" 
                  : "text-[#1F2937] hover:bg-[#F8F9FC]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                <span>معرض الأعمال (النماذج)</span>
              </div>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-black ${activeTab === "works" ? "bg-white/20 text-white" : "bg-[#F8F9FC] text-[#6C63FF]"}`}>
                {platformData?.works?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full px-4 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-between transition text-right ${
                activeTab === "categories" 
                  ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" 
                  : "text-[#1F2937] hover:bg-[#F8F9FC]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5" />
                <span>إدارة التصنيفات</span>
              </div>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-black ${activeTab === "categories" ? "bg-white/20 text-white" : "bg-[#F8F9FC] text-[#8B7BFF]"}`}>
                {platformData?.categories?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full px-4 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-between transition text-right ${
                activeTab === "services" 
                  ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" 
                  : "text-[#1F2937] hover:bg-[#F8F9FC]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5" />
                <span>إدارة الخدمات (23 خدمة)</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-black ${activeTab === "services" ? "bg-white/20 text-white" : "bg-[#F8F9FC] text-[#22C55E]"}`}>
                {platformData?.services?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full px-4 py-3.5 rounded-2xl font-extrabold text-sm flex items-center gap-3 transition text-right ${
                activeTab === "settings" 
                  ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" 
                  : "text-[#1F2937] hover:bg-[#F8F9FC]"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>رقم الواتساب وإعدادات النصوص</span>
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-[#6C63FF]/10 text-[#1F2937] rounded-3xl p-6 border border-[#6C63FF]/25 shadow-2xs space-y-3 font-['Tajawal']">
            <span className="text-xs font-black text-[#6C63FF] font-['Cairo'] flex items-center gap-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-[#6C63FF]" />
              سهولة فائقة دون كود
            </span>
            <p className="text-xs text-[#1F2937] leading-relaxed font-medium">
              أضف أي عمل جديد وسوف يدرج تلقائياً داخل قاعدة بيانات PostgreSQL ويظهر بصفحة الهبوط بلمسة زر واحدة في أقل من 60 ثانية.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === "overview" && (
            <AdminOverview data={platformData} onSelectTab={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "works" && (
            <AdminWorksManager
              works={platformData?.works || []}
              categories={platformData?.categories || []}
              onRefresh={fetchData}
            />
          )}
          {activeTab === "categories" && (
            <AdminCategoriesManager
              categories={platformData?.categories || []}
              onRefresh={fetchData}
            />
          )}
          {activeTab === "services" && (
            <AdminServicesManager
              services={platformData?.services || []}
              onRefresh={fetchData}
            />
          )}
          {activeTab === "settings" && (
            <AdminSettingsAndMore
              settings={platformData?.settings || {}}
              testimonials={platformData?.testimonials || []}
              faqs={platformData?.faqs || []}
              onRefresh={fetchData}
            />
          )}
        </main>
      </div>

      <footer className="py-6 text-center text-xs text-[#6B7280] border-t border-[#E5E7EB] mt-auto bg-white font-['Tajawal']">
        تم تطوير نظام إدارة **منصة الزهراء للخدمات التعليمية والحلول الذكية** باحترافية كاملة. © 2026 جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
