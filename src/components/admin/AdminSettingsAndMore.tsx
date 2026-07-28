"use client";

import React, { useState } from "react";
import { MessageCircle, Settings as SettingsIcon, Users, HelpCircle, Save, CheckCircle2, AlertCircle, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

interface AdminSettingsAndMoreProps {
  settings: any;
  testimonials: any[];
  faqs: any[];
  onRefresh: () => void;
}

export default function AdminSettingsAndMore({ settings, testimonials, faqs, onRefresh }: AdminSettingsAndMoreProps) {
  const [subTab, setSubTab] = useState<"general" | "testimonials" | "faqs">("general");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Settings State
  const [siteTitle, setSiteTitle] = useState(settings?.siteTitle || "منصة الزهراء للخدمات التعليمية والحلول الذكية");
  const [heroTitle, setHeroTitle] = useState(settings?.heroTitle || "كل ما تحتاجه من خدمات تعليمية وإدارية وتصميمية... في مكان واحد.");
  const [heroSubtitle, setHeroSubtitle] = useState(settings?.heroSubtitle || "منصة الزهراء تقدم حلولاً احترافية للمعلمين والمعلمات والطلاب والمؤسسات التعليمية، بجودة عالية، وتسليم سريع، واهتمام بأدق التفاصيل.");
  const [aboutText, setAboutText] = useState(settings?.aboutText || "نحن في منصة الزهراء نسعى لريادة حلول التحول العالي في القطاع التعليمي عبر توفير خدمات التصميم والإدارة والتحليل المحكم.");
  const [whatsappNumber, setWhatsappNumber] = useState(settings?.whatsappNumber || "966538950445");
  const [whatsappPrefix, setWhatsappPrefix] = useState(settings?.whatsappMessagePrefix || "السلام عليكم، أرغب في طلب هذا النموذج من موقعكم: ");
  const [contactEmail, setContactEmail] = useState(settings?.contactEmail || "info@al-zahra-edu.sa");
  const [statsProjects, setStatsProjects] = useState(settings?.statsProjects || "500+");
  const [statsClients, setStatsClients] = useState(settings?.statsClients || "98%");
  const [statsYears, setStatsYears] = useState(settings?.statsYears || "100%");

  // Testimonials State
  const [tClientName, setTClientName] = useState("");
  const [tRole, setTRole] = useState("");
  const [tContent, setTContent] = useState("");

  // FAQs State
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteTitle,
          heroTitle,
          heroSubtitle,
          aboutText,
          whatsappNumber: whatsappNumber.replace(/[^0-9]/g, ""),
          whatsappMessagePrefix: whatsappPrefix,
          contactEmail,
          statsProjects,
          statsClients,
          statsYears,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "تم حفظ الإعدادات وتغيير رقم الواتساب بنجاح! تم التطبيق فوراً بجميع صفحات ومكونات الموقع." });
        onRefresh();
      } else {
        setMessage({ type: "error", text: "فشل حفظ الإعدادات." });
      }
    } catch {
      setMessage({ type: "error", text: "خطأ في الاتصال." });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tClientName || !tContent) return;
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: tClientName, clientRole: tRole || "قيادي تربوي", content: tContent, rating: 5 }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "تمت إضافة شهادة الثقة والرأي بنجاح." });
        setTClientName("");
        setTRole("");
        setTContent("");
        onRefresh();
      }
    } catch {
      alert("فشل الإضافة");
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("هل تريد حذف هذا الرأي؟")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    onRefresh();
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: faqQuestion, answer: faqAnswer, sortOrder: faqs.length + 1 }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "تمت إضافة السؤال والجواب بنجاح." });
        setFaqQuestion("");
        setFaqAnswer("");
        onRefresh();
      }
    } catch {
      alert("فشل الإضافة");
    }
  };

  const handleDeleteFaq = async (id: number) => {
    if (!confirm("هل تريد حذف هذا السؤال؟")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className="space-y-8 font-['Cairo']">
      {/* Sub tabs navigation */}
      <div className="flex flex-wrap gap-2.5 border-b border-[#E5E7EB] pb-4">
        <button
          onClick={() => { setSubTab("general"); setMessage(null); }}
          className={`px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition ${
            subTab === "general" ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" : "bg-white text-[#1F2937] hover:bg-slate-50 border border-[#E5E7EB]"
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>إعدادات رقم الواتساب والنصوص</span>
        </button>
        <button
          onClick={() => { setSubTab("testimonials"); setMessage(null); }}
          className={`px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition ${
            subTab === "testimonials" ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" : "bg-white text-[#1F2937] hover:bg-slate-50 border border-[#E5E7EB]"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>إدارة آراء العملاء ({testimonials.length})</span>
        </button>
        <button
          onClick={() => { setSubTab("faqs"); setMessage(null); }}
          className={`px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition ${
            subTab === "faqs" ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/25" : "bg-white text-[#1F2937] hover:bg-slate-50 border border-[#E5E7EB]"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>إدارة الأسئلة الشائعة ({faqs.length})</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border font-bold text-sm ${
          message.type === "success" ? "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30" : "bg-rose-50 text-rose-700 border-rose-200"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#22C55E]" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* GENERAL SETTINGS */}
      {subTab === "general" && (
        <form onSubmit={handleSaveSettings} className="space-y-8 bg-white p-7 sm:p-9 rounded-3xl border border-[#E5E7EB] shadow-sm">
          <div className="border-b border-[#E5E7EB] pb-5">
            <h3 className="text-xl font-black text-[#1F2937] flex items-center gap-2.5">
              <MessageCircle className="w-6 h-6 text-[#22C55E]" />
              <span>إدارة رقم الواتساب الموحد وإعدادات المنصة</span>
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 font-['Tajawal'] font-normal">
              تغيير رقم الواتساب هنا سيحدّث الرابط فوراً في كل بطاقة وزر داخل موقع منصة الزهراء دون الحاجة للمبرمج!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">
                رقم الواتساب الرسمي (مثال: 966538950445) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-2xl text-[#1F2937] font-mono text-base font-black dir-ltr text-left focus:outline-none focus:border-[#22C55E]"
              />
              <p className="text-[11px] text-[#6B7280] font-['Tajawal']">الرابط الحالي الفعال: https://wa.me/{whatsappNumber}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">نص بداية الرسالة التلقائية للعميل عند الطلب</label>
              <input
                type="text"
                value={whatsappPrefix}
                onChange={(e) => setWhatsappPrefix(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#6C63FF]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">اسم المنصة (Site Title)</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#6C63FF]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">البريد الإلكتروني للدعم الفني</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#6C63FF] dir-ltr text-left"
              />
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] pt-6 space-y-4">
            <h4 className="font-black text-[#1F2937] text-base">نصوص الصفحة الرئيسية (Hero Copywriting):</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1F2937]">العنوان الكبير (Headline)</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl font-bold text-sm text-[#1F2937] focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1F2937]">العنوان الفرعي الوصفي (Subheadline)</label>
                <textarea
                  rows={2}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] focus:outline-none focus:border-[#6C63FF] font-['Tajawal']"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-9 py-4 bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-black text-base rounded-2xl shadow-xl shadow-[#6C63FF]/30 flex items-center gap-2.5 transition"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>حفظ وتفعيل التعديلات ورقم الواتساب الآن 🚀</span>
            </button>
          </div>
        </form>
      )}

      {/* TESTIMONIALS */}
      {subTab === "testimonials" && (
        <div className="space-y-6">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-5">
            <h4 className="font-black text-[#1F2937] text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#6C63FF]" />
              <span>إضافة شهادة ثقة ورأي جديد من قائد أو معلم:</span>
            </h4>
            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="اسم العميل (مثال: أ. فيصل العتيبي)"
                  value={tClientName}
                  onChange={(e) => setTClientName(e.target.value)}
                  className="px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937]"
                />
                <input
                  type="text"
                  placeholder="اللقب والجهة (مثال: مدير ثانوية - الرياض)"
                  value={tRole}
                  onChange={(e) => setTRole(e.target.value)}
                  className="px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937]"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="اكتب تعليق وثناء العميل على جودة ملفات منصة الزهراء وسرعة الإنجاز..."
                value={tContent}
                onChange={(e) => setTContent(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] font-['Tajawal']"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-black rounded-2xl text-sm shadow-md"
              >
                + إضافة الرأي لصفحة الهبوط
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 bg-white rounded-3xl border border-[#E5E7EB] shadow-2xs flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-[#1F2937] text-base">{t.clientName}</span>
                    <span className="text-[#22C55E] text-xs font-bold">⭐⭐⭐⭐⭐ 5/5</span>
                  </div>
                  <span className="text-xs text-[#6C63FF] font-bold block mb-2">{t.clientRole}</span>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal font-['Tajawal']">"{t.content}"</p>
                </div>
                <button
                  onClick={() => handleDeleteTestimonial(t.id)}
                  className="mt-2 self-end px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 border border-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQS */}
      {subTab === "faqs" && (
        <div className="space-y-6">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-5">
            <h4 className="font-black text-[#1F2937] text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#6C63FF]" />
              <span>إضافة سؤال شائع وجوابه لتسهيل الطلب على الزائر:</span>
            </h4>
            <form onSubmit={handleAddFaq} className="space-y-4">
              <input
                type="text"
                required
                placeholder="نص السؤال (مثال: هل توفرون فواتير معتمدة عبر الواتساب؟)"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937]"
              />
              <textarea
                required
                rows={2}
                placeholder="الجواب الكافٍ والمحفز (مثال: نعم بالتأكيد، يتم تزويدك بكافة تفاصيل الطلب والفواتير...)"
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] font-['Tajawal']"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-black rounded-2xl text-sm shadow-md"
              >
                + إضافة السؤال لصفحة الهبوط
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.id} className="p-6 bg-white rounded-3xl border border-[#E5E7EB] shadow-2xs flex items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <h5 className="font-extrabold text-[#1F2937] text-base">{f.question}</h5>
                  <p className="text-sm text-[#6B7280] font-['Tajawal']">{f.answer}</p>
                </div>
                <button
                  onClick={() => handleDeleteFaq(f.id)}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl shrink-0 flex items-center gap-1.5 border border-rose-200 transition"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
