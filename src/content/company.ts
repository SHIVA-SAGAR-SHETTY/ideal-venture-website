import type { Localized } from "@/lib/i18n";

/**
 * Single source of truth for company facts.
 * Source: Dubai commercial license no. 1061311 (printed 13/06/2026).
 * Update this file when the license is renewed or contact details change.
 */
export const company = {
  name: { en: "Ideal Venture Building Contracting L.L.C", ar: "ايديال فينتشر لمقاولات البناء ش.ذ.م.م" } satisfies Localized,
  shortName: { en: "Ideal Venture", ar: "ايديال فينتشر" } satisfies Localized,
  initials: "IVBC",
  legacyName: { en: "Venture General Contracting LLC", ar: "فينتشر للمقاولات العامة ذ.م.م" } satisfies Localized,
  legacyFounded: 2005,
  founded: 2022,

  owner: {
    name: { en: "Pradeepa Kumar Shetty", ar: "براديبا كومار شيتي" } satisfies Localized,
    title: { en: "Founder & Managing Director", ar: "المؤسس والمدير العام" } satisfies Localized,
  },

  license: {
    number: "1061311",
    dcci: "400383",
    issued: "2022-05-12",
    expires: "2027-05-11",
    authority: { en: "Dubai Economy & Tourism (DET)", ar: "دائرة الاقتصاد والسياحة في دبي" } satisfies Localized,
    legalType: {
      en: "Limited Liability Company – Single Owner (LLC-SO)",
      ar: "شركة ذات مسؤولية محدودة – الشخص الواحد",
    } satisfies Localized,
    activity: { en: "Building Contracting", ar: "مقاولات البناء" } satisfies Localized,
    // TODO(owner): replace with the exact licence-search page (DET portals block access from outside the UAE, so this was not verified).
    verifyUrl: "https://www.dubaidet.gov.ae/",
  },

  contact: {
    phoneDisplay: "+971 50 554 6898",
    phoneHref: "tel:+971505546898",
    whatsapp: "971505546898",
    email: "pradeepklshetty@gmail.com",
    // TODO(owner): confirm the area name; the license lists "Industrial Area 1", Parcel 242-288.
    address: {
      en: "Office 220, Lootah Building, Al Qusais Industrial Area 1, Dubai, UAE",
      ar: "مكتب 220، مبنى لوتاه، القصيص الصناعية الأولى، دبي، الإمارات العربية المتحدة",
    } satisfies Localized,
    parcel: "242-288",
    mapQuery: "Al Qusais Industrial Area 1, Dubai",
  },

  /** Figures computed from the 2021 & 2022 pre-qualification documents. */
  stats: {
    builtUpSqft: 1_157_254, // sum of documented built-up areas
    projects: 50, // ~40 completed + ongoing listed across both PQs
    authorities: 5, // DM, Trakhees, HFZA, Sharjah Municipality, MBRHE
  },

  authorities: [
    { en: "Dubai Municipality", ar: "بلدية دبي" },
    { en: "Trakhees (Ports, Customs & Free Zone Corp.)", ar: "تراخيص (مؤسسة الموانئ والجمارك والمنطقة الحرة)" },
    { en: "Hamriyah Free Zone Authority", ar: "هيئة المنطقة الحرة بالحمرية" },
    { en: "Sharjah Municipality", ar: "بلدية الشارقة" },
    { en: "Mohammed Bin Rashid Housing Establishment", ar: "مؤسسة محمد بن راشد للإسكان" },
  ] satisfies Localized[],

  /** Corporate clients from the 2021 PQ. Private individuals are intentionally not listed. */
  clients: [
    "Lamprell Energy",
    "Cleveland Bridge",
    "Al Tayer Stocks",
    "AGE Group",
    "Liftek",
    "Global Village",
    "Al Safa Investment",
    "Ferrofab FZE",
    "GBMT",
    "Mubarak & Sons Transport",
    "Albwardy Damen",
    "Loops Automation",
    "Acme Building Materials",
    "Phocéenne Middle East",
    "Alpine Metals",
    "Star Steel",
  ],
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${company.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
