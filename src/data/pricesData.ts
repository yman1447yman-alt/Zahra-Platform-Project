export interface PriceItem {
  id: number;
  sectionName: string;
  serviceName: string;
  price: string;
}

export const initialPrices: PriceItem[] = [
  // ملفات الأداء والتقويم
  { id: 1, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف أداء المعلم", price: "144" },
  { id: 2, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف أداء المعلمة", price: "144" },
  { id: 3, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف مدير المدرسة", price: "240" },
  { id: 4, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف وكيل المدرسة", price: "200" },
  { id: 5, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف المساعد الإداري", price: "144" },
  { id: 6, sectionName: "ملفات الأداء والتقويم", serviceName: "تحليل وقياس الأداء", price: "160" },
  { id: 7, sectionName: "ملفات الأداء والتقويم", serviceName: "تحليل نتائج مهاراتي", price: "200" },
  { id: 8, sectionName: "ملفات الأداء والتقويم", serviceName: "تحليل النتائج الدراسية", price: "176" },
  { id: 9, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف التحصيل الدراسي", price: "200" },
  { id: 10, sectionName: "ملفات الأداء والتقويم", serviceName: "التقويم الذاتي", price: "200" },
  { id: 11, sectionName: "ملفات الأداء والتقويم", serviceName: "مؤشرات الأداء (KPIs)", price: "160" },
  { id: 12, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف الجودة والتميز", price: "280" },
  { id: 13, sectionName: "ملفات الأداء والتقويم", serviceName: "ملف الاعتماد المدرسي", price: "400" },

  // الخدمات الإدارية والتنظيمية
  { id: 14, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "السجلات الإدارية", price: "200" },
  { id: 15, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "سجلات المتابعة اليومية", price: "120" },
  { id: 16, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "سجلات الحضور والانصراف", price: "120" },
  { id: 17, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "سجلات التأخر الصباحي", price: "100" },
  { id: 18, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "سجلات المناوبة", price: "120" },
  { id: 19, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "الجداول المدرسية", price: "160" },
  { id: 20, sectionName: "الخدمات الإدارية والتنظيمية", serviceName: "جداول الاختبارات", price: "120" },
];