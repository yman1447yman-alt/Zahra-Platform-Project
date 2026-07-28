"use client";

import React, { useState } from "react";
import { FolderOpen, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";

interface AdminCategoriesManagerProps {
  categories: any[];
  onRefresh: () => void;
}

export default function AdminCategoriesManager({ categories, onRefresh }: AdminCategoriesManagerProps) {
  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAddOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCatName.trim();
    if (!name) return;

    setLoading(true);
    try {
      const url = editingCat ? `/api/admin/categories/${editingCat.id}` : "/api/admin/categories";
      const method = editingCat ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, sortOrder: categories.length + 1 }),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingCat ? `تم تعديل اسم التصنيف إلى "${name}" بنجاح!` : `تمت إضافة التصنيف "${name}" وبات متاحاً فوراً بصفحة الموقع!`,
        });
        setNewCatName("");
        setEditingCat(null);
        onRefresh();
      } else {
        setMessage({ type: "error", text: "فشل حفظ التصنيف" });
      }
    } catch {
      setMessage({ type: "error", text: "خطأ في الاتصال بالسيرفر" });
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (cat: any) => {
    setEditingCat(cat);
    setNewCatName(cat.name);
    setMessage(null);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في حذف تصنيف "${name}"؟`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: `تم حذف تصنيف "${name}".` });
        onRefresh();
      }
    } catch {
      alert("فشل حذف التصنيف");
    }
  };

  return (
    <div className="space-y-8 font-['Cairo']">
      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border font-bold text-sm ${
          message.type === "success" ? "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30" : "bg-rose-50 text-rose-700 border-rose-200"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Add New Category Card */}
      <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-5">
        <h3 className="text-xl font-black text-[#1F2937] flex items-center gap-2.5">
          <FolderOpen className="w-6 h-6 text-[#6C63FF]" />
          <span>{editingCat ? "تعديل اسم التصنيف الحالي:" : "إضافة تصنيف عمل جديد لمعرض منصة الزهراء:"}</span>
        </h3>
        <p className="text-xs text-[#6B7280] font-['Tajawal']">
          سيظهر أي تصنيف تضعه هنا كزر فلتر (Filter Tab) أعلى قائمة الأعمال في الموقع ليختار منه المعلمون بكل مرونة.
        </p>

        <form onSubmit={handleAddOrEdit} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="text"
            required
            placeholder="اكتب اسم التصنيف الجديد (مثال: أوراق القياس الوطني)..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 px-5 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#6C63FF]"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#6C63FF] hover:bg-[#5b52e6] text-white font-extrabold rounded-2xl shadow-md shadow-[#6C63FF]/25 flex items-center justify-center gap-2 transition text-sm shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
              <span>{editingCat ? "حفظ التعديل" : "إضافة التصنيف للموقع"}</span>
            </button>
            {editingCat && (
              <button
                type="button"
                onClick={() => { setEditingCat(null); setNewCatName(""); }}
                className="px-5 py-3.5 bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold rounded-2xl text-xs border border-[#E5E7EB]"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories Grid List */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-7 sm:p-9 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
          <h4 className="font-extrabold text-[#1F2937] text-base flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#8B7BFF]" />
            <span>التصنيفات التعليمية المعتمدة حالياً بالمنصة ({categories.length}):</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div 
              key={cat.id}
              className="p-5 rounded-2xl bg-[#F8F9FC] hover:bg-white border border-[#E5E7EB] hover:border-[#6C63FF]/50 transition flex items-center justify-between gap-3 group shadow-2xs hover:shadow-md"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] font-black text-xs flex items-center justify-center shrink-0 border border-[#6C63FF]/20 font-mono">
                  {idx + 1}
                </span>
                <span className="font-extrabold text-[#1F2937] text-sm truncate group-hover:text-[#6C63FF] transition">
                  {cat.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 shrink-0">
                <button
                  onClick={() => handleStartEdit(cat)}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#1F2937] border border-[#E5E7EB] transition shadow-2xs"
                  title="تعديل الاسم"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#6C63FF]" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-[#E5E7EB] transition shadow-2xs"
                  title="حذف التصنيف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
