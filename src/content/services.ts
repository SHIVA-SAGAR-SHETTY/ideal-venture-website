import type { Localized } from "@/lib/i18n";

export type ServiceIcon =
  | "snowflake"
  | "warehouse"
  | "office"
  | "camp"
  | "villa"
  | "residential"
  | "refurb"
  | "infra"
  | "poultry"
  | "mep"
  | "fm";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: Localized;
  body: Localized;
};

/** Services listed in the 2022 Ideal Venture pre-qualification document. */
export const services: Service[] = [
  {
    id: "warehouses",
    icon: "warehouse",
    title: { en: "Warehouses & Factories", ar: "المستودعات والمصانع" },
    body: {
      en: "Pre-engineered (PEB) and hot-rolled steel warehouses, workshops and factory sheds — designed for fast delivery and long service life.",
      ar: "مستودعات وورش ومصانع بهياكل فولاذية مسبقة الهندسة ومدرفلة على الساخن، مصممة للتسليم السريع والعمر التشغيلي الطويل.",
    },
  },
  {
    id: "cold-storage",
    icon: "snowflake",
    title: { en: "Cold Storage Facilities", ar: "مرافق التخزين المبرد" },
    body: {
      en: "Insulated cold stores on PEB or hot-rolled steel structures, coordinated with refrigeration and MEP specialists from day one.",
      ar: "مخازن مبردة معزولة على هياكل فولاذية، بالتنسيق مع أخصائيي التبريد والأعمال الكهروميكانيكية منذ اليوم الأول.",
    },
  },
  {
    id: "offices",
    icon: "office",
    title: { en: "Office Buildings", ar: "المباني المكتبية" },
    body: {
      en: "G+M and multi-storey office blocks, showrooms and service buildings with clean façades and efficient layouts.",
      ar: "مبانٍ مكتبية وصالات عرض ومبانٍ خدمية بواجهات أنيقة وتصاميم عملية.",
    },
  },
  {
    id: "villas",
    icon: "villa",
    title: { en: "Private & Commercial Villas", ar: "الفلل الخاصة والتجارية" },
    body: {
      en: "Turnkey G, G+1 and B+G+1 villas, kitchen and service blocks, compound walls and swimming pools — built to the owner's vision.",
      ar: "فلل أرضية ودورين مع قبو بنظام تسليم المفتاح، مع المطابخ والملاحق وأسوار المجمع والمسابح، وفق رؤية المالك.",
    },
  },
  {
    id: "residential",
    icon: "residential",
    title: { en: "Residential Buildings", ar: "المباني السكنية" },
    body: {
      en: "Mid-rise residential and mixed-use buildings up to G+6, with parking and full authority approvals.",
      ar: "مبانٍ سكنية ومتعددة الاستخدامات حتى أرضي + ستة طوابق، مع المواقف وجميع الموافقات الرسمية.",
    },
  },
  {
    id: "labour-camps",
    icon: "camp",
    title: { en: "Labour Accommodation", ar: "سكن العمال" },
    body: {
      en: "Compliant labour camps and staff accommodation that meet municipality and free-zone welfare standards.",
      ar: "مجمعات سكن عمال مطابقة لمعايير البلدية والمناطق الحرة.",
    },
  },
  {
    id: "refurbishment",
    icon: "refurb",
    title: { en: "Refurbishment & Maintenance", ar: "التجديد والصيانة" },
    body: {
      en: "Upgrades, extensions and maintenance of villas, kitchen blocks, service blocks and commercial facilities.",
      ar: "تحديث وتوسعة وصيانة الفلل والمطابخ والملاحق الخدمية والمرافق التجارية.",
    },
  },
  {
    id: "infrastructure",
    icon: "infra",
    title: { en: "Substations & Filling Stations", ar: "المحطات الفرعية ومحطات الوقود" },
    body: {
      en: "Civil works for electrical substations, filling stations and site infrastructure including levelling and compaction.",
      ar: "الأعمال المدنية للمحطات الكهربائية الفرعية ومحطات الوقود والبنية التحتية للموقع بما في ذلك التسوية والدك.",
    },
  },
  {
    id: "poultry",
    icon: "poultry",
    title: { en: "Poultry Farm Projects", ar: "مشاريع مزارع الدواجن" },
    body: {
      en: "Poultry sheds with supply and installation of machinery and prefabricated equipment — delivered for the Ruler's Court.",
      ar: "حظائر دواجن مع توريد وتركيب المعدات والآلات الجاهزة — تم تنفيذها لصالح ديوان الحاكم.",
    },
  },
  {
    id: "mep",
    icon: "mep",
    title: { en: "In-house MEP", ar: "أعمال كهروميكانيكية داخلية" },
    body: {
      en: "Mechanical, electrical and plumbing delivered by our own team for tighter coordination and fewer handovers.",
      ar: "أعمال الميكانيكا والكهرباء والسباكة بفريقنا الخاص لتنسيق أدق وتسليم أسرع.",
    },
  },
  {
    id: "facility-management",
    icon: "fm",
    title: { en: "Facility Management", ar: "إدارة المرافق" },
    body: {
      en: "Ongoing maintenance and facility management that keeps buildings performing long after handover.",
      ar: "صيانة مستمرة وإدارة للمرافق تحافظ على كفاءة المباني بعد التسليم بوقت طويل.",
    },
  },
];
