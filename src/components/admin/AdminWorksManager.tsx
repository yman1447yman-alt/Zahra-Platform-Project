"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon, 
  Search, 
  Sparkles,
  Loader2,
  X
} from "lucide-react";

interface AdminWorksManagerProps {
  works: any[];
  categories: any[];
  onRefresh: () => void;
}

// القوالب الذكية للتعبئة التلقائية عند اختيار القسم
const predefinedTemplates: Record<string, { defaultTitle: string; defaultDescription: string }> = {
  "ملفات الإنجاز": {
    defaultTitle: "ملف إنجاز المعلم/المعلمة المتميز",
    defaultDescription: "حقيبة إنجاز متكاملة وشاملة لأعمال المعلم أو الإداري، مصممة وفق أحدث المعايير التعليمية لتعكس الأداء المهني والإنجازات بكل احترافية."
  },
  "الخطط التشغيلية": {
    defaultTitle: "الخطة التشغيلية للمدرسة / للقسم",
    defaultDescription: "خطة تشغيلية دقيقة ومنظمة للأهداف المدرسية والأنشطة خلال العام الدراسي، مع توزيع المهام والجداول الزمنية بأسلوب قيادي متميز."
  },
  "أوراق العمل": {
    defaultTitle: "سلسلة أوراق العمل التفاعلية",
    defaultDescription: "أوراق عمل مدروسة بعناية لتعزيز الفهم واستيعاب الدروس، تحتوي على تمارين متنوعة تناسب مختلف مستويات الطلاب."
  },
  "الاختبارات": {
    defaultTitle: "نموذج اختبار تحصيلي / فتري",
    defaultDescription: "اختبارات مقننة ومبنية وفق جدول مواصفات دقيق لتقييم نواتج التعلم وقياس مستويات الطلاب بكل دقة وموضوعية."
  },
  "ملفات نافس": {
    defaultTitle: "حقيبة إعداد اختبارات نافس الوطنية",
    defaultDescription: "برنامج تدريبي وحقيبة شاملة لتهيئة الطلاب وتدريبهم على اختبارات نافس الوطنية في القراءة والرياضيات والعلوم."
  }
};

export default function AdminWorksManager({ works = [], categories = [], onRefresh }: AdminWorksManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingWork, setEditingWork] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("95 ريال");
  const [coverImage, setCoverImage] = useState("/images/portfolio-cover-1.jpg");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleOpenNewForm = () => {
    setEditingWork(null);
    const defaultCat = categories.length > 0 ? categories[0] : null;
    const catId = defaultCat ? String(defaultCat.id) : "";
    const catName = defaultCat ? defaultCat.name : "ملفات الإنجاز";
    
    setCategoryId(catId);
    setPrice("95 ريال");
    setCoverImage("/images/portfolio-cover-1.jpg");
    setGalleryImages(["/images/portfolio-cover-1.jpg"]);
    setPdfUrl("");

    // تطبيق التعبئة التلقائية الذكية عند الفتح
    if (predefinedTemplates[catName]) {
      setTitle(predefinedTemplates[catName].defaultTitle);
      setDescription(predefinedTemplates[catName].defaultDescription);
    } else {
      setTitle("");
      setDescription("");
    }

    setShowForm(true);
    setMessage(null);
  };

  const handleOpenEditForm = (work: any) => {
    setEditingWork(work);
    setTitle(work.title || "");
    setDescription(work.description || "");
    setCategoryId(work.categoryId ? String(work.categoryId) : "");
    setPrice(work.price || "95 ريال");
    setCoverImage(work.coverImage || "/images/portfolio-cover-1.jpg");
    
    // التعامل الآمن مع galleryImages سواء كانت نص JSON أو مصفوفة
    let parsedGallery = [];
    try {
      if (typeof work.galleryImages === "string") {
        parsedGallery = JSON.parse(work.galleryImages);
      } else if (Array.isArray(work.galleryImages)) {
        parsedGallery = work.galleryImages;
      }
    } catch {
      parsedGallery = [work.coverImage || "/images/portfolio-cover-1.jpg"];
    }
    setGalleryImages(parsedGallery);
    setPdfUrl(work.pdfUrl || "");
    setShowForm(true);
    setMessage(null);
  };

  // دالة تغيير التصنيف لتعبئة البيانات تلقائياً
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCatId = e.target.value;
    setCategoryId(newCatId);

    const selectedCat = categories.find((c) => String(c.id) === String(newCatId));
    if (selectedCat && predefinedTemplates[selectedCat.name]) {
      setTitle(predefinedTemplates[selectedCat.name].defaultTitle);
      setDescription(predefinedTemplates[selectedCat.name].defaultDescription);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "cover" | "gallery" | "pdf") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "pdf") setUploadingPdf(true);
    else setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        if (type === "cover") {
          setCoverImage(data.url);
          if (!galleryImages.includes(data.url)) {
            setGalleryImages((prev) => [data.url, ...prev]);
          }
        } else if (type === "gallery") {
          setGalleryImages((prev) => [...prev, data.url]);
        } else if (type === "pdf") {
          setPdfUrl(data.url);
        }
        setMessage({ type: "success", text: `تم رفع الملف (${file.name}) بنجاح!` });
      } else {
        setMessage({ type: "error", text: data.error || "فشل رفع الملف" });
      }
    } catch {
      setMessage({ type: "error", text: "حدث خطأ أثناء الاتصال بالسيرفر لرفع الملف" });
    } finally {
      setUploadingImage(false);
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage({ type: "error", text: "يرجى كتابة عنوان ووصف النموذج" });
      return;
    }

    setLoading(true);
    try {
      const selectedCat = categories.find((c) => String(c.id) === String(categoryId));
      const payload = {
        title,
        description,
        categoryId: categoryId ? Number(categoryId) : undefined,
        categoryName: selectedCat ? selectedCat.name : "ملفات إنجاز",
        price,
        coverImage,
        galleryImages: galleryImages.length > 0 ? galleryImages : [coverImage],
        pdfUrl: pdfUrl || null,
      };

      const url = editingWork ? `/api/admin/works/${editingWork.id}` : "/api/admin/works";
      const method = editingWork ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingWork ? "تم حفظ التعديلات ونشرها بالموقع بنجاح!" : "تمت إضافة النموذج ونشره في مكتبة الموقع بنجاح خلال ثوانٍ!",
        });
        setShowForm(false);
        onRefresh();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "فشل حفظ البيانات" });
      }
    } catch {
      setMessage({ type: "error", text: "حدث خطأ غير متوقع في الاتصال" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في حذف نموذج "${title}" نهائياً؟`)) return;

    try {
      const res = await fetch(`/api/admin/works/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: `تم حذف النموذج "${title}" بنجاح.` });
        onRefresh();
      } else {
        alert("فشل حذف النموذج");
      }
    } catch {
      alert("خطأ أثناء الاتصال بالحذف");
    }
  };

  // فلترة آمنة تماماً تمنع أي خطأ بريمير (Prerender error)
  const safeWorks = Array.isArray(works) ? works : [];
  const filteredWorks = safeWorks.filter((w) => 
    (w.title && w.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (w.categoryName && w.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 font-['Cairo']">
      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border font-bold text-sm transition-all ${
          message.type === "success" 
            ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30" 
            : "bg-rose-50 text-rose-700 border-rose-200"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="mr-auto opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-7 rounded-3xl border border-[#E5E7EB] shadow-sm">
        <div>
          <h3 className="text-xl font-black text-[#1F2937] flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#6C63FF]" />
            <span>إدارة معرض الأعمال والنماذج الديناميكية</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-1 font-['Tajawal']">
            جميع الأعمال التي تضيفها هنا تظهر فوراً داخل موقع منصة الزهراء مع أزرار المعاينة وطلب الواتساب التلقائي دون تعديل الكود.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleOpenNewForm}
            className="px-6 py-3.5 rounded-2xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-extrabold text-sm shadow-lg shadow-[#6C63FF]/25 flex items-center gap-2 transition shrink-0 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span>+ أضف نموذج عمل جديد الآن</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Card */}
      {showForm && (
        <div className="bg-white text-[#1F2937] rounded-3xl p-7 sm:p-9 border-2 border-[#6C63FF] shadow-xl relative animate-fade-up">
          <div className="flex items-center justify-between pb-5 border-b border-[#E5E7EB] mb-7">
            <h4 className="text-lg sm:text-xl font-black text-[#1F2937] flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-[#6C63FF]" />
              <span>{editingWork ? `تعديل النموذج: (${editingWork.title})` : "إضافة نموذج عمل جديد ذكي وسريع:"}</span>
            </h4>
            <button 
              onClick={() => setShowForm(false)} 
              className="px-4 py-2 text-xs font-bold bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] rounded-xl border border-[#E5E7EB] transition"
            >
              إلغاء وإغلاق Form
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1F2937]">
                  تصنيف النموذج (القسم التعليمي) <span className="text-rose-600">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-bold text-sm focus:outline-none focus:border-[#6C63FF] transition"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-[#6C63FF] font-bold block">
                  ⚡ اختيار التصنيف يملأ الحقول تلقائياً بالصيغة الاحترافية المناسبة!
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1F2937]">
                  سعر النموذج أو طريقة العرض
                </label>
                <input
                  type="text"
                  placeholder="مثال: 95 ريال"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] placeholder-[#6B7280] font-bold text-sm focus:outline-none focus:border-[#6C63FF] transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">
                عنوان النموذج أو الملف <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: حقيبة شواهد وتقييم التقويم الخارجي والداخلي"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] placeholder-[#6B7280] font-bold text-sm focus:outline-none focus:border-[#6C63FF] transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">
                وصف النموذج والمميزات والبنود <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="اكتب نبذة عن الملف وما يحتويه..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] placeholder-[#6B7280] font-normal text-sm focus:outline-none focus:border-[#6C63FF] transition leading-relaxed font-['Tajawal']"
              />
            </div>

            {/* Upload Cover */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937] flex items-center justify-between">
                <span>صورة الغلاف (ارفع صورة أو ضع رابط) <span className="text-rose-600">*</span></span>
                {uploadingImage && <Loader2 className="w-4 h-4 text-[#6C63FF] animate-spin" />}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] text-xs font-mono"
                />
                <label className="px-5 py-3.5 bg-[#6C63FF] hover:bg-[#5b52e6] text-white rounded-2xl font-extrabold text-xs cursor-pointer flex items-center gap-2 shrink-0 transition shadow-sm">
                  <Upload className="w-4 h-4" />
                  <span>ارفع من جهازك</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "cover")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Additional gallery & PDF */}
            <div className="p-6 bg-[#F8F9FC] rounded-3xl border border-[#E5E7EB] space-y-5">
              <h5 className="font-extrabold text-[#1F2937] text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#6C63FF]" />
                <span>المزيد من خيارات المعاينة التفاعلية (ملف PDF وصور إضافية):</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="block text-xs text-[#6B7280] mb-2 font-bold">أضف صور أخرى لمعرض القالب:</span>
                  <label className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#1F2937] rounded-2xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-[#E5E7EB] hover:border-[#6C63FF] transition shadow-2xs">
                    <Upload className="w-4 h-4 text-[#6C63FF]" />
                    <span>+ إضافة صورة إضافية للمعرض</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "gallery")}
                      className="hidden"
                    />
                  </label>
                  {galleryImages.length > 0 && (
                    <div className="mt-3 flex gap-2.5 overflow-x-auto py-1">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-12 rounded-xl overflow-hidden border border-[#E5E7EB] shrink-0 group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-rose-600/90 text-white text-[10px] opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold"
                          >
                            حذف
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <span className="block text-xs text-[#6B7280] mb-2 font-bold">
                    إرفاق مستند PDF للمعاينة المباشرة من الزوار (اختياري):
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <label className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#1F2937] rounded-2xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-[#E5E7EB] hover:border-[#6C63FF] transition shadow-2xs">
                      <FileText className="w-4 h-4 text-rose-500" />
                      <span>{uploadingPdf ? "جاري رفع الـ PDF..." : "ارفع ملف PDF للمعاينة المباشرة"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "pdf")}
                        className="hidden"
                      />
                    </label>
                    {pdfUrl && (
                      <div className="flex items-center justify-between px-3.5 py-2 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-xl text-xs text-[#1F2937]">
                        <span className="truncate max-w-[220px] font-bold">✔️ تم إرفاق مستند PDF بنجاح</span>
                        <button type="button" onClick={() => setPdfUrl("")} className="text-rose-600 font-extrabold ml-2 hover:underline">
                          إزالة
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3.5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-4 bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold rounded-2xl border border-[#E5E7EB] transition text-sm"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImage || uploadingPdf}
                className="px-8 py-4 bg-[#22C55E] hover:bg-[#1fa950] text-white font-extrabold rounded-2xl transition shadow-lg shadow-[#22C55E]/30 text-base flex items-center gap-2.5"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>{editingWork ? "حفظ التعديلات وتحديث الموقع فوراً" : "حفظ ونشر النموذج بالموقع الآن 🚀"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Works List */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F8F9FC]/80">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#6B7280] absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن نموذج أو تصنيف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-[#E5E7EB] rounded-2xl text-sm font-bold focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
          <span className="text-xs text-[#6B7280] font-extrabold bg-white px-3.5 py-1.5 rounded-xl border border-[#E5E7EB]">
            عدد أعمال منصة الزهراء: ({filteredWorks.length})
          </span>
        </div>

        {filteredWorks.length === 0 ? (
          <div className="p-16 text-center text-[#6B7280] space-y-2">
            <p className="font-extrabold text-base text-[#1F2937]">لا توجد نماذج متطابقة مع البحث حالياً.</p>
            <p className="text-xs">اضغط على زر أضف نموذج عمل جديد في الأعلى لإنشاء واحد في دقيقة.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {filteredWorks.map((w) => (
              <div key={w.id} className="p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:bg-[#F8F9FC]/60 transition group">
                <div className="flex items-center gap-5">
                  <img
                    src={w.coverImage}
                    alt={w.title}
                    className="w-24 h-18 rounded-2xl object-cover border border-[#E5E7EB] shadow-2xs shrink-0"
                  />
                  <div className="space-y-1.5">
                    <span className="px-3 py-0.5 bg-[#6C63FF]/10 text-[#6C63FF] font-black text-xs rounded-lg inline-block border border-[#6C63FF]/20">
                      {w.categoryName || "عام"}
                    </span>
                    <h4 className="font-extrabold text-[#1F2937] text-lg group-hover:text-[#6C63FF] transition">
                      {w.title}
                    </h4>
                    <div className="flex items-center flex-wrap gap-4 text-xs text-[#6B7280] font-medium font-['Tajawal']">
                      <span>السعر: <strong className="text-[#22C55E] font-black">{w.price}</strong></span>
                      {w.pdfUrl && <span className="text-rose-600 font-bold">● مرفق معه ملف PDF للمعاينة</span>}
                      <span className="text-[#8B7BFF] font-bold">🎯 نقرات واتساب: ({w.orderCount || 0})</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-end gap-2.5 border-t sm:border-0 pt-3 sm:pt-0 border-[#E5E7EB]">
                  <button
                    onClick={() => handleOpenEditForm(w)}
                    className="px-5 py-2.5 rounded-xl bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-extrabold text-xs flex items-center gap-1.5 border border-[#E5E7EB] transition"
                    title="تعديل هذا النموذج"
                  >
                    <Edit3 className="w-4 h-4 text-[#6C63FF]" />
                    <span>تعديل</span>
                  </button>

                  <button
                    onClick={() => handleDelete(w.id, w.title)}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs flex items-center gap-1 border border-rose-200 transition"
                    title="حذف هذا النموذج نهائياً"
                  >
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}