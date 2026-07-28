import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  categoryName: text("category_name").notNull(),
  price: text("price").notNull().default("99 ريال"),
  coverImage: text("cover_image").notNull(),
  galleryImages: text("gallery_images").notNull().default("[]"), // stored as JSON text array
  pdfUrl: text("pdf_url"), // Optional PDF for preview
  isFeatured: boolean("is_featured").notNull().default(true),
  orderCount: integer("order_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull().default("FileText"),
  priceRange: text("price_range").notNull().default("حسب المواصفات"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey().default("general"),
  siteTitle: text("site_title").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  aboutText: text("about_text").notNull(),
  whatsappNumber: text("whatsapp_number").notNull().default("966538950445"),
  whatsappMessagePrefix: text("whatsapp_message_prefix").notNull().default("مرحباً، أرغب في طلب هذا النموذج: "),
  contactEmail: text("contact_email").notNull().default("info@injaz-edu.sa"),
  footerDescription: text("footer_description").notNull(),
  statsProjects: text("stats_projects").notNull().default("450+"),
  statsClients: text("stats_clients").notNull().default("1,200+"),
  statsYears: text("stats_years").notNull().default("6+ سنوات"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientRole: text("client_role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  avatar: text("avatar").default("/images/avatar-default.png"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
