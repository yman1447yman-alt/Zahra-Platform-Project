"use client";

import React, { useState } from "react";
import { Award, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface AdminServicesManagerProps {
  services: any[];
  onRefresh: () => void;
}

export default function AdminServicesManager({ services, onRefresh }: AdminServicesManagerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("حسب المواصفات");
  const [iconName, setIconName] = useState("Target");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const iconsList = ["Target", "FolderCheck", "Award", "TrendingUp", "BookOpen", "FileText", "Edit3", "PieChart", "Layers", "Presentation", "Sparkles", "ShieldCheck", "CheckCircle2", "UserCheck", "ClipboardList", "Users", "Heart", "Palette", "Layout", "Star", "Share2"];

  const handleStartEdit = (srv: any) => {
    setEditingId(srv.id);
    setTitle(srv.title);
    setDescription(srv.description);
    setPriceRange(srv.priceRange || "");
    setIconName(srv.iconName || "Target");
    setMessage(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPriceRange("حسب المواصفات");
    setIconName("Target");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);
    try {
      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priceRange, iconName, sortOrder: services.length + 1 }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: editingId ? "تم تعديل الخدمة الأكاديمية بنجاح!" : "تمت إضافة الخدمة بنجاح بصفحة الهبوط!" });
        handleCancelEdit();
        onRefresh();
      } else {
        setMessage({ type: "error", text: "فشل حفظ الخدمة" });
      }
    } catch {
      setMessage({ type: "error", text: "حدث خطأ بالاتصال بالسيرفر" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, srvTitle: string) => {
    if (!confirm(`هل تريد حذف خدمة "${srvTitle}" نهائياً؟`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "تم حذف الخدمة بنجاح." });
        onRefresh();
      }
    } catch {
      alert("فشل الحذف");
    }
  };

  return (
    <div className="space-y-8 font-['Cairo']">
      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border font-bold text-sm ${
          message.type === "success" ? "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30" : "bg-rose-50 text-rose-700 border-rose-200"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#22C55E]" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
        <h3 className="text-xl font-black text-[#1F2937] flex items-center gap-2.5">
          <Award className="w-6 h-6 text-[#6C63FF]" />
          <span>{editingId ? "تعديل خدمة منصة الزهراء:" : "إضافة خدمة جديدة لقائمة الـ 23 خدمة:"}</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">عنوان الخدمة <span className="text-rose-600">*</span></label>
              <input
                type="text"
                required
                placeholder="مثال: تحليل المحتوى واستخراج الأهداف السلوكية"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#6C63FF]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1F2937]">ملاحظة السعر أو التقديم</label>
              <input
                type="text"
                placeholder="مثال: حسب المواصفات أو تسليم خلال 24 ساعة"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1F2937]">وصف الخدمة <span className="text-rose-600">*</span></label>
            <textarea
              required
              rows={3}
              placeholder="اشرح ما تقدمه هذه الخدمة للمعلمين ومدراء المدارس والقيادات التربوية..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl text-sm font-normal text-[#1F2937] focus:outline-none focus:border-[#6C63FF] leading-relaxed font-['Tajawal']"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1F2937]">اختر شكل الأيقونة الحديثة للبطاقة:</label>
            <div className="flex flex-wrap gap-2 pt-1 font-mono">
              {iconsList.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIconName(ic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    iconName === ic ? "bg-[#6C63FF] text-white border-[#6C63FF] shadow-sm" : "bg-[#F8F9FC] text-[#6B7280] border-[#E5E7EB] hover:bg-slate-200"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#22C55E] hover:bg-[#1fa950] text-white font-black rounded-2xl shadow-lg shadow-[#22C55E]/30 flex items-center gap-2 text-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
              <span>{editingId ? "حفظ التعديل فوراً" : "إضافة الخدمة للموقع 🚀"}</span>
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3.5 bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold rounded-2xl text-sm border border-[#E5E7EB]"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Services Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-2xs hover:shadow-md hover:border-[#6C63FF]/50 transition flex flex-col justify-between gap-5">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-[#F8F9FC] text-[#6B7280] rounded-xl text-xs font-bold font-mono border border-[#E5E7EB]">
                  Icon: {s.iconName}
                </span>
                {s.priceRange && (
                  <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] font-extrabold text-xs rounded-full">
                    {s.priceRange}
                  </span>
                )}
              </div>
              <h4 className="font-black text-[#1F2937] text-lg">{s.title}</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed font-normal font-['Tajawal']">{s.description}</p>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
              <button
                onClick={() => handleStartEdit(s)}
                className="px-4 py-2 bg-[#F8F9FC] hover:bg-slate-200 text-[#1F2937] font-bold text-xs rounded-xl flex items-center gap-1 border border-[#E5E7EB] transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span>تعديل</span>
              </button>
              <button
                onClick={() => handleDelete(s.id, s.title)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-1 border border-rose-200 transition"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
