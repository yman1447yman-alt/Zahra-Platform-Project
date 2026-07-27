import { db } from "@/db";
import { categories, works, services, settings, testimonials, faqs } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export async function ensureSeeded() {
  try {
    // 1. Settings - default or auto-update to Al-Zahra Platform
    const existingSettings = await db.select().from(settings).where(eq(settings.key, "general"));
    if (existingSettings.length === 0) {
      await db.insert(settings).values({
        key: "general",
        siteTitle: "منصة الزهراء للخدمات التعليمية والحلول الذكية",
        heroTitle: "كل ما تحتاجه من خدمات تعليمية وإدارية وتصميمية... في مكان واحد.",
        heroSubtitle: "منصة الزهراء تقدم حلولاً احترافية للمعلمين والمعلمات والطلاب والمؤسسات التعليمية، بجودة عالية، وتسليم سريع، واهتمام بأدق التفاصيل.",
        aboutText: "نحن في منصة الزهراء نسعى لريادة حلول التحول العالي في القطاع التعليمي عبر توفير خدمات التصميم والإدارة والتحليل المحكم للمعلمين والمعلمات والمؤسسات الأكاديمية.",
        whatsappNumber: "966538950445",
        whatsappMessagePrefix: "السلام عليكم، أرغب في طلب هذا النموذج من موقعكم: ",
        contactEmail: "info@al-zahra-edu.sa",
        footerDescription: "منصة الزهراء للخدمات التعليمية والحلول الذكية. حلول تعليمية وإدارية وتصميمية متكاملة.",
        statsProjects: "500+",
        statsClients: "98%",
        statsYears: "100%",
      });
    } else if (!existingSettings[0].siteTitle.includes("الزهراء")) {
      // Auto-migrate old branding to Al-Zahra
      await db.update(settings).set({
        siteTitle: "منصة الزهراء للخدمات التعليمية والحلول الذكية",
        heroTitle: "كل ما تحتاجه من خدمات تعليمية وإدارية وتصميمية... في مكان واحد.",
        heroSubtitle: "منصة الزهراء تقدم حلولاً احترافية للمعلمين والمعلمات والطلاب والمؤسسات التعليمية، بجودة عالية، وتسليم سريع، واهتمام بأدق التفاصيل.",
        whatsappNumber: "966538950445",
        whatsappMessagePrefix: "السلام عليكم، أرغب في طلب هذا النموذج من موقعكم: ",
        footerDescription: "منصة الزهراء للخدمات التعليمية والحلول الذكية. حلول تعليمية وإدارية وتصميمية متكاملة.",
      }).where(eq(settings.key, "general"));
    }

    // 2. Categories (11 main categories)
    const catCount = await db.select({ value: count() }).from(categories);
    let seededCatMap: Record<string, number> = {};

    if (catCount[0].value === 0) {
      const defaultCategories = [
        { name: "ملفات الإنجاز", slug: "achievement-files", description: "ملفات إنجاز احترافية ومبتكرة للمعلم والطالب والقيادة المدرسية", sortOrder: 1 },
        { name: "ملفات نافس", slug: "nafas-files", description: "حقائب واستعداد واختبارات محاكاة لاختبارات نافس الوطنية", sortOrder: 2 },
        { name: "الخطط التشغيلية", slug: "operational-plans", description: "خطط سنوية واستراتيجية مبنية على مؤشرات الأداء والتقويم", sortOrder: 3 },
        { name: "أوراق العمل", slug: "worksheets", description: "أوراق عمل تشخيصية وتفاعلية لجميع المراحل الدراسية", sortOrder: 4 },
        { name: "الاختبارات", slug: "exams", description: "نماذج اختبارات قياس ونماذج إجابة نموذجية ومحكمة", sortOrder: 5 },
        { name: "العروض التقديمية", slug: "presentations", description: "تصاميم PowerPoint وعروض تقديمية تفاعلية ومؤنقة", sortOrder: 6 },
        { name: "التصميمات", slug: "designs", description: "تصميم منشورات وإنفوجرافيك وهويات بصرية متكاملة", sortOrder: 7 },
        { name: "ملفات الجودة", slug: "quality-files", description: "شواهد ومعايير الجودة والتميز المؤسسي المدرسي", sortOrder: 8 },
        { name: "التقويم الخارجي", slug: "external-evaluation", description: "حقائب وسجلات الاستعداد الشامل لجودة التقويم الخارجي والداخلي", sortOrder: 9 },
        { name: "الشهادات", slug: "certificates", description: "شهادات شكر وتقدير واعتزاز بتصميمات زجاجية وفاخرة", sortOrder: 10 },
        { name: "الوسائل التعليمية", slug: "educational-aids", description: "بطاقات ووسائل وأدوات تعليمية رقمية ومطبوعة مبتكرة", sortOrder: 11 },
      ];

      for (const cat of defaultCategories) {
        const res = await db.insert(categories).values(cat).returning();
        seededCatMap[cat.name] = res[0].id;
      }
    } else {
      const existing = await db.select().from(categories);
      existing.forEach((c) => {
        seededCatMap[c.name] = c.id;
      });
    }

    // 3. Services (23 Services required by Prompt)
    const srvCount = await db.select({ value: count() }).from(services);
    if (srvCount[0].value < 10) {
      // If there are only a few old services, let's reset or add the complete 23 set
      await db.delete(services); // clean re-insert all 23 structured services
      const all23Services = [
        { title: "الخطط التشغيلية", description: "إعداد خطط تشغيلية واستراتيجية محكمة متوافقة مع مؤشرات أداء التقويم المدرسي المعتمد.", iconName: "Target", sortOrder: 1 },
        { title: "ملفات الإنجاز", description: "تصميم وتنظيم ملفات إنجاز احترافية رقمية ومطبوعة للمعلمين والمعلمات والطلاب.", iconName: "FolderCheck", sortOrder: 2 },
        { title: "ملفات نافس", description: "تجهيز حقائب واختبارات محاكاة وخطط علاجية وتدريبية لاختبارات نافس الوطنية.", iconName: "Award", sortOrder: 3 },
        { title: "سد الفاقد التعليمي", description: "خطط حقائب سد الفاقد التعليمي وأنشطة التعزيز التشخيصي لمعالجة المهارات.", iconName: "TrendingUp", sortOrder: 4 },
        { title: "التحاضير", description: "إعداد تحاضير وخطط درس يومية وأسبوعية وفق أحدث الاستراتيجيات وطرق التدريس.", iconName: "BookOpen", sortOrder: 5 },
        { title: "الاختبارات", description: "بناء أسئلة ونماذج اختبارات ومقاييس تحصيلية مع جداول المواصفات ونماذج الإجابة.", iconName: "FileText", sortOrder: 6 },
        { title: "أوراق العمل", description: "تصميم أوراق عمل مبتكرة وجذابة بصيغ PDF و Word قابلة للتعديل والطباعة الفورية.", iconName: "Edit3", sortOrder: 7 },
        { title: "تحليل النتائج", description: "إحصاءات ورسوم بيانية وتقارير مخرجات تحليل نتائج الاختبارات وتحسين نواتج التعلم.", iconName: "PieChart", sortOrder: 8 },
        { title: "تحليل المحتوى", description: "تحليل محتوى المقررات واستخراج الأهداف السلوكیة والمهارات والقيم المستهَدَفة.", iconName: "Layers", sortOrder: 9 },
        { title: "العروض التقديمية", description: "تصميم شرائح PowerPoint احترافية ومؤشرات انتقال حركية لاجتماعات الدروس والمناسبة.", iconName: "Presentation", sortOrder: 10 },
        { title: "الوسائل التعليمية", description: "ابتكار وتصميم لوحات وشجرة مفاهيم وألعاب وبطاقات تعليمية ذكية للفصل.", iconName: "Sparkles", sortOrder: 11 },
        { title: "ملفات الجودة", description: "تنظيم وترتيب مؤشرات وشواهد معايير الجودة والاعتماد المدرسي والتميز الإداري.", iconName: "ShieldCheck", sortOrder: 12 },
        { title: "التقويم الخارجي", description: "ملفات وحقائب الاستعداد لزيارات هيئة التقويم الخارجي وفرز الشواهد الإلكترونية.", iconName: "CheckCircle2", sortOrder: 13 },
        { title: "التقويم الذاتي", description: "سجلات ونماذج تقييم وتقويم الأداء الذاتي للمدارس والكوادر الإدارية والتعليمية.", iconName: "UserCheck", sortOrder: 14 },
        { title: "سجلات المتابعة", description: "تصميم جداول وسجلات متابعة الغياب والتطبيقات اليومية ومستوى الانضباط المتميز.", iconName: "ClipboardList", sortOrder: 15 },
        { title: "سجلات النشاط", description: "تنظيم فعاليات وسجلات ومشرفي الأنشطة الطلابية والمبادرات الصفية واللاصفية.", iconName: "Users", sortOrder: 16 },
        { title: "ملفات العمل التطوعي", description: "توثيق وتنسيق حقائب المبادرات والفرص التطوعية للمعلمين والطلاب وساعات العمل.", iconName: "Heart", sortOrder: 17 },
        { title: "التصميم الاحترافي", description: "خدمات تصميم رقمي وجرافيك استثنائية لكافة احتياجات المدارس والفاليات والملتقيات.", iconName: "Palette", sortOrder: 18 },
        { title: "تصميم PDF", description: "تحويل الملازم والكتب والنصوص إلى تصميمات PDF تفاعلية وأنيقة وعالية الدقة للطباعة.", iconName: "FileText", sortOrder: 19 },
        { title: "تصميم PowerPoint", description: "قوالب بوربوينت فاخرة بهوية المدرسة وتنسيق احترافي يناسب المحاضرات العصرية.", iconName: "Layout", sortOrder: 20 },
        { title: "الهوية البصرية", description: "ابتكار شعارات وألوان وهوية بصرية متكاملة للمدارس والمبادرات الترفيهية والمدرسية.", iconName: "Star", sortOrder: 21 },
        { title: "الإنفوجرافيك", description: "تلخيص المعلومات والتقارير والإحصائيات إلى إنفوجرافيك بصري ذكي وجذاب وسهل الفهم.", iconName: "BarChart3", sortOrder: 22 },
        { title: "تصميم منشورات التواصل الاجتماعي", description: "تصميم بوستات وتغريدات وإعلانات سوشيال ميديا فاخرة تبرز إنجازات وتفوق المدرسة.", iconName: "Share2", sortOrder: 23 },
      ];
      await db.insert(services).values(all23Services);
    }

    // 4. Portfolio works
    const workCount = await db.select({ value: count() }).from(works);
    if (workCount[0].value === 0) {
      await db.insert(works).values([
        {
          title: "ملف إنجاز المعلم والمعلمة الشامل (إصدار الزهراء الياقوتي)",
          description: "ملف إنجاز متكامل ومتقن للغاية يحتوي على الفلسفة التعليمية، الرؤية والرسالة، السيرة الذاتية، شواهد التطوير التمهن، ونماذج أوراق العمل وفق متطلبات الوزارة المحدثة. مصمم بأسلوب Glassmorphism الأنيق.",
          categoryId: seededCatMap["ملفات الإنجاز"] || 1,
          categoryName: "ملفات الإنجاز",
          price: "89 ريال",
          coverImage: "/images/portfolio-cover-1.jpg",
          galleryImages: JSON.stringify(["/images/portfolio-cover-1.jpg", "/images/presentation-cover.png", "/images/nafas-cover-2.jpg"]),
          pdfUrl: "/sample.pdf",
          isFeatured: true,
          orderCount: 84,
        },
        {
          title: "حقيبة محاكاة واستعداد اختبار نافس الوطني (المرحلة الابتدائية والمتوسطة)",
          description: "باقة شاملة تتضمن اختبارات محاكاة فعلية في القراءة والرياضيات والعلوم، مع نماذج تحليل النتائج التلقائية وتشخيص مواطن الضعف واقتراح الخطط العلاجية المتناغمة.",
          categoryId: seededCatMap["ملفات نافس"] || 2,
          categoryName: "ملفات نافس",
          price: "120 ريال",
          coverImage: "/images/nafas-cover-2.jpg",
          galleryImages: JSON.stringify(["/images/nafas-cover-2.jpg", "/images/portfolio-cover-1.jpg"]),
          pdfUrl: "/sample.pdf",
          isFeatured: true,
          orderCount: 95,
        },
        {
          title: "الخطة التشغيلية الاستراتيجية السنوية (وفق معايير التقويم المدرسي)",
          description: "خطة تشغيلية متميزة تحتوي على الأهداف الاستراتيجية، برامج التنفيذ، مؤشرات الأداء المستخرجة من هيئة تقويم التعليم، ومسار المتابعة الإداري الدقيق.",
          categoryId: seededCatMap["الخطط التشغيلية"] || 3,
          categoryName: "الخطط التشغيلية",
          price: "150 ريال",
          coverImage: "/images/operational-plan-3.jpg",
          galleryImages: JSON.stringify(["/images/operational-plan-3.jpg", "/images/presentation-cover.png"]),
          pdfUrl: "/sample.pdf",
          isFeatured: true,
          orderCount: 67,
        },
        {
          title: "حقيبة تنظيم شواهد ومؤشرات التقويم المدرسي الخارجي والداخلي",
          description: "مجلدات إلكترونية ومستندات مرتبة ومبنية لتغطية جميع شواهد معايير القيادة المدرسية، التعلُّم والتعليم، نواتج التعلُّم والبيئة المدرسية بجودة فائقة.",
          categoryId: seededCatMap["التقويم الخارجي"] || 9,
          categoryName: "التقويم الخارجي",
          price: "180 ريال",
          coverImage: "/images/presentation-cover.png",
          galleryImages: JSON.stringify(["/images/presentation-cover.png", "/images/operational-plan-3.jpg"]),
          pdfUrl: "/sample.pdf",
          isFeatured: true,
          orderCount: 52,
        },
        {
          title: "باقة أوراق العمل التفاعلية واختبارات التشخيص وسد الفاقد",
          description: "نماذج أوراق عمل متنوعة وأنشطة صفية تفاعلية محفزة للطلاب، جاهزة للطباعة والتعديل بصيغة Word و PDF مع مفاتيح حلول نموذجية ومختصرة.",
          categoryId: seededCatMap["أوراق العمل"] || 4,
          categoryName: "أوراق العمل",
          price: "65 ريال",
          coverImage: "/images/nafas-cover-2.jpg",
          galleryImages: JSON.stringify(["/images/nafas-cover-2.jpg"]),
          pdfUrl: "/sample.pdf",
          isFeatured: false,
          orderCount: 39,
        },
        {
          title: "عرض بوربوينت فاخر لاجتماعات مجلس الآباء وشرف التميز المدرسي",
          description: "قالب عرض تقديمي (PowerPoint) مصمم بأسلوب الألوان الهادئة والعصرية، يحتوي على رسومات بيانية وأنظمة انتقال ناعمة لعرض إنجازات وتوجهات المدرسة.",
          categoryId: seededCatMap["العروض التقديمية"] || 6,
          categoryName: "العروض التقديمية",
          price: "75 ريال",
          coverImage: "/images/presentation-cover.png",
          galleryImages: JSON.stringify(["/images/presentation-cover.png", "/images/portfolio-cover-1.jpg"]),
          pdfUrl: "/sample.pdf",
          isFeatured: false,
          orderCount: 41,
        },
      ]);
    }

    // 5. Testimonials
    const tstCount = await db.select({ value: count() }).from(testimonials);
    if (tstCount[0].value === 0) {
      await db.insert(testimonials).values([
        {
          clientName: "أ. عبد الرزاق الشهراني",
          clientRole: "مدير مجمع تعليمي - الرياض",
          content: "تعاملت مع منصة الزهراء لتنفيذ الخطة التشغيلية وملفات شواهد التقويم الخارجي، النتيجة كانت مذهلة ومبهرة للمشرفين التربويين! الدقة والأناقة في التصميم وسرعة الاستجابة عبر الواتساب لا مثيل لها.",
          rating: 5,
          avatar: "/images/portfolio-cover-1.jpg",
        },
        {
          clientName: "أ. نورة الغامدي",
          clientRole: "معلمة لغة عربية - جدة",
          content: "ملف الإنجاز وأوراق عمل سد الفاقد التعليمي وفرت علي أسابيع من الجهد. الألوان هادئة والتقسيم رائع جداً، وتم تسليم الطلب في وقت قياسي باحترافية عالية.",
          rating: 5,
          avatar: "/images/nafas-cover-2.jpg",
        },
        {
          clientName: "د. طارق المالكي",
          clientRole: "وكيل شؤون طلاب ومشرف جودة - الدمام",
          content: "المنصة الأفضل على الإطلاق في المملكة لتقديم الخدمة الأكاديمية والحلول الذكية. تصاميمهم بمستوى وكالات عالمية والخدمة فورية وباهتمام بأدق التفاصيل.",
          rating: 5,
          avatar: "/images/presentation-cover.png",
        },
      ]);
    }

    // 6. FAQs
    const faqCount = await db.select({ value: count() }).from(faqs);
    if (faqCount[0].value === 0) {
      await db.insert(faqs).values([
        {
          question: "كيف أقوم بطلب نموذج أو خدمة من منصة الزهراء؟",
          answer: "بمجرد الضغط على زر «اطلب هذا النموذج» أو «تواصل عبر واتساب»، سيتم تحويلك مباشرة إلى محادثة الواتساب الرسمية على الرقم (+966 53 895 0445) مع رسالة جاهزة باسم طلبك. سيقوم الدعم الفني بالرد الفوري وإرسال الملف أو الاتفاق على المطلوب.",
          sortOrder: 1,
        },
        {
          question: "هل الملفات والنماذج قابلة للتعديل والطباعة؟",
          answer: "نعم وبكل تأكيد! جميع النماذج والخطط يتم إرسالها بالصيغة المعتمدة والقابلة للتعديل بسهولة (Word، PowerPoint، Excel، أو ملفات PDF تفاعلية وعالية الجودة للطباعة الفورية).",
          sortOrder: 2,
        },
        {
          question: "كم تستغرق مدة تسليم الأعمال أو التصميمات المخصصة؟",
          answer: "النماذج والملفات الجاهزة المعروضة في المعرض تُسلّم فوراً بعد تأكيد الطلب خلال دقائق. أما الخدمات المخصصة (مثل تصميم الهوية، التحاضير الخاصة، أو الخطط المقفلة) فيتم إنجازها وتسليمها في غضون 24 إلى 48 ساعة كحد أقصى بأعلى جودة.",
          sortOrder: 3,
        },
        {
          question: "هل تضمنون مطابقة الأعمال لمعايير تقويم التعليم والوزارة الحديثة؟",
          answer: "نعم 100%. فريقنا يتكون من نخبة من الخبراء الأكاديميين والمستشارين والمصممين، ونراقب دوماً أحدث التحديثات ومؤشرات الأداء الصادرة عن وزارة التعليم وهيئة التقويم لضمان تفوق مدرستك أو ملفك المهني.",
          sortOrder: 4,
        },
        {
          question: "ما هي طرق الدفع المعتمدة لدى منصة الزهراء؟",
          answer: "نوفر جميع وسائل الدفع المعتمدة والآمنة في المملكة العربية السعودية (تحويل بنكي مباشر، مدى Mada، Apple Pay، STC Pay). يتم التنسيق وتزويدك بفواتير وسجلات واضحة عبر المحادثة الأمنة في الواتساب.",
          sortOrder: 5,
        },
      ]);
    }
  } catch (error) {
    console.error("Error during Al-Zahra database seeding:", error);
  }
}
