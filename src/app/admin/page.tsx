"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, FileText, Upload, Sparkles } from "lucide-react";
import { predefinedTemplates } from "@/data/formTemplates";

interface AdminWorksManagerProps {
  works: any[];
  categories: any[];
  onRefresh: () => void;
}

export default function AdminWorksManager({ works, categories, onRefresh }: AdminWorksManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]?.name || "ملفات الإنجاز");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("95 ريال");
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // دالة التعبئة التلقائية الذكية عند تغيير التصنيف
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // جلب القالب الافتراضي المرتبط بالتصنيف إذا وجد
    const template = predefinedTemplates[selectedCategory];
    if (template) {
      setTitle(template.defaultTitle);
      setDescription(template.defaultDescription);
      setFeatures(template.defaultFeatures);
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setFeatures("");
    setPrice("95 ريال");
    setPdfUrl("");
    setImageUrl("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingId ? `/api/works/${editingId}` : "/api/works";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          description,
          features,
          price,
          pdfUrl,
          imageUrl,
        }),
      });

      if (res.ok) {
        onRefresh();
        handleResetForm();
      } else {
        alert("حدث خطأ أثناء حفظ العمل.");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWork = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا النموذج؟")) return;

    try {
      const res = await fetch(`/api/works/${id}`, { method: "DELETE" });
      if (res.ok) {
        onRefresh();
      } else {
        alert("فشل حذف النموذج.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartEdit = (work: any) => {
    setEditingId(work.id);
    setTitle(work.title || "");
    setCategory(work.category || categories[0]?.name);
    setDescription(work.description || "");
    setFeatures(work.features || "");
    setPrice(work.price || "95 ريال");
    setPdfUrl(work.pdfUrl || "");
    setImageUrl(work.imageUrl || "");
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-xs">
        <div>
          <h2 className="text-xl font-black text-[#1F2937]">معرض الأعمال والترويج (النماذج)</h2>
          <p className="text-xs text-[#6B7280] font-['Tajawal'] mt-1">
            أضف ونظم ملفات وقوالب منصة الزهراء التعليمية بكل سهولة.
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => {
              handleResetForm();
              // تطبيق القالب الافتراضي مباشرة عند الفتح لأول تصنيف
              const defaultCat = categories[0]?.name || "ملفات الإنجاز";
              setCategory(defaultCat);
              if (predefinedTemplates[defaultCat]) {
                setTitle(predefinedTemplates[defaultCat].defaultTitle);
                setDescription(predefinedTemplates[defaultCat].defaultDescription);
                setFeatures(predefinedTemplates[defaultCat].defaultFeatures);
              }
              setIsAdding(true);
            }}
            className="px-5 py-3 rounded-2xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-[#6C63FF]/25 transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة نموذج جديد</span>
          </button>
        )}
      </div>

      {/* نموذج الإضافة والتعديل */}
      {isAdding && (
        <form onSubmit={handleSaveWork} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#6C63FF]/30 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
            <h3 className="text-lg font-black text-[#1F2937] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6C63FF]" />
              <span>{editingId ? "تعديل نموذج" : "إضافة نموذج ذكي جديد"}</span>
            </h3>
            <button
              type="button"
              onClick={handleResetForm}
              className="p-2 rounded-xl text-[#6B7280] hover:bg-rose-50 hover:text-rose-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* اختيار التصنيف (مع التعبئة التلقائية الفورية) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">تصنيف النموذج (القسم التعليمي) *</label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-bold focus:outline-none focus:border-[#6C63FF] transition"
              >
                {categories.map((cat: any) => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-[#6C63FF] font-medium block">
                ⚡ بمجرد اختيار التصنيف، سيتم تعبئة البيانات الوصفية والبنود تلقائياً!
              </span>
            </div>

            {/* السعر */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">سعر النموذج أو طريقة العرض *</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-bold focus:outline-none focus:border-[#6C63FF] transition"
                placeholder="95 ريال"
              />
            </div>
          </div>

          {/* عنوان النموذج */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1F2937]">عنوان النموذج *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-bold focus:outline-none focus:border-[#6C63FF] transition"
              placeholder="مثال: حقيبة شواهد وتقييم التقويم الخارجي والداخلي"
            />
          </div>

          {/* الوصف والبنود */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1F2937]">وصف النموذج والمميزات والبنود *</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-[#1F2937] font-medium focus:outline-none focus:border-[#6C63FF] transition text-xs leading-relaxed"
              placeholder="اكتب نبذة عن الملف وما يحتويه..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#1F2937] font-bold text-xs transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-extrabold text-xs shadow-md shadow-[#6C63FF]/25 flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "جاري الحفظ..." : "حفظ النشر بالمنصة"}</span>
            </button>
          </div>
        </form>
      )}

      {/* قائمة النماذج الحالية */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E5E7EB] bg-[#F8F9FC] font-black text-xs text-[#6B7280]">
          إجمالي النماذج النشطة ({works.length})
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {works.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#6B7280] font-['Tajawal']">
              لا توجد نماذج مضافة حتى الآن. اضغط على "إضافة نموذج جديد" للبدء.
            </div>
          ) : (
            works.map((work: any) => (
              <div key={work.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F9FC]/60 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#6C63FF]/10 text-[#6C63FF] px-2.5 py-0.5 rounded-full font-black">
                      {work.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">{work.price}</span>
                  </div>
                  <h4 className="text-sm font-black text-[#1F2937]">{work.title}</h4>
                  <p className="text-xs text-[#6B7280] line-clamp-1 font-['Tajawal']">{work.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartEdit(work)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#6C63FF] hover:text-white text-[#1F2937] transition"
                    title="تعديل"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteWork(work.id)}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}