/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  equipmentItems as staticEquipment,
  heroBadges as staticBadges,
  matkapitalSteps as staticMatkapital,
  organizationInfo as staticOrg,
  pricing as staticPricing,
  reviewImages as staticReviews,
  services as staticServices,
  siteConfig as staticSite,
  specialists as staticSpecialists,
  topBarLinks as staticTopBar,
  navLinks as staticNav,
  type EquipmentItem,
  type PricingRow,
  type ServiceItem,
  type Specialist,
} from "@/data/content";
import { providerNav } from "@/data/providerNav";
import { mediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/cms/payload";

export type CmsSiteSettings = typeof staticSite & {
  heroBadges: typeof staticBadges;
  aboutTitle?: string;
  aboutLead?: string;
  aboutBody?: string;
  aboutStats?: { value: string; label: string }[];
  aboutValues?: { icon?: string; title: string; description: string }[];
};

export type ProviderBlock =
  | { blockType: "heading"; text: string }
  | { blockType: "paragraph"; text: string }
  | { blockType: "list"; items: string[] }
  | {
      blockType: "docs";
      items: { label: string; href?: string }[];
    }
  | {
      blockType: "card";
      title?: string;
      paragraphs?: string[];
      lists?: { heading?: string; items: string[] }[];
      docs?: { label: string; href?: string }[];
    };

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<CmsSiteSettings> {
  return safe(async () => {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "site-settings", depth: 1 })) as any;
    if (!doc?.name) return { ...staticSite, heroBadges: staticBadges };
    return {
      ...staticSite,
      name: doc.name || staticSite.name,
      fullName: doc.fullName || staticSite.fullName,
      phone: doc.phone || staticSite.phone,
      phoneHref: doc.phoneHref || staticSite.phoneHref,
      email: doc.email || staticSite.email,
      city: doc.city || staticSite.city,
      address: doc.address || staticSite.address,
      addressShort: doc.addressShort || staticSite.addressShort,
      website: doc.website || staticSite.website,
      vk: doc.vk || staticSite.vk,
      ok: doc.ok || staticSite.ok,
      telegram: doc.telegram || staticSite.telegram,
      youtube: doc.youtube || staticSite.youtube,
      maxBooking: doc.maxBooking || staticSite.maxBooking,
      socialProviderUrl: doc.socialProviderUrl || staticSite.socialProviderUrl,
      promoVideoId: doc.promoVideoId || staticSite.promoVideoId,
      specialistsPage: doc.specialistsPage || staticSite.specialistsPage,
      privacyPolicy: doc.privacyPolicy || staticSite.privacyPolicy,
      mapEmbedUrl: doc.mapEmbedUrl || staticSite.mapEmbedUrl,
      workingHours: doc.workingHours || staticSite.workingHours,
      orgEmail: doc.orgEmail || staticSite.orgEmail,
      rekvizityUrl: doc.rekvizityUrl || staticSite.rekvizityUrl,
      heroBadges:
        doc.heroBadges?.map((b: any) => ({
          id: b.id || b.label,
          label: b.label,
          icon: b.icon || "shield",
        })) || staticBadges,
      aboutTitle: doc.aboutTitle || undefined,
      aboutLead: doc.aboutLead || undefined,
      aboutBody: doc.aboutBody || undefined,
      aboutStats:
        doc.aboutStats?.map((s: any) => ({ value: s.value, label: s.label })) || undefined,
      aboutValues:
        doc.aboutValues?.map((v: any) => ({
          icon: v.icon || undefined,
          title: v.title,
          description: v.description,
        })) || undefined,
    };
  }, { ...staticSite, heroBadges: staticBadges });
}

export async function getOrganization() {
  return safe(async () => {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "organization", depth: 0 })) as any;
    if (!doc?.fullName) return staticOrg;
    return {
      fullName: doc.fullName || staticOrg.fullName,
      shortName: doc.shortName || staticOrg.shortName,
      legalAddress: doc.legalAddress || staticOrg.legalAddress,
      postalAddress: doc.postalAddress || staticOrg.postalAddress,
      innKpp: doc.innKpp || staticOrg.innKpp,
      bank: doc.bank || staticOrg.bank,
      bik: doc.bik || staticOrg.bik,
      checkingAccount: doc.checkingAccount || staticOrg.checkingAccount,
      correspondentAccount: doc.correspondentAccount || staticOrg.correspondentAccount,
      registrationDate: doc.registrationDate || staticOrg.registrationDate,
      founder: doc.founder || staticOrg.founder,
      branches: doc.branches || staticOrg.branches,
      phones: doc.phones || staticOrg.phones,
      email: doc.email || staticOrg.email,
      semiStationary: {
        title: doc.semiStationary?.title || staticOrg.semiStationary.title,
        address: doc.semiStationary?.address || staticOrg.semiStationary.address,
        transport: doc.semiStationary?.transport || staticOrg.semiStationary.transport,
        schedule:
          doc.semiStationary?.schedule?.map((s: any) => s.line).filter(Boolean) ||
          staticOrg.semiStationary.schedule,
      },
      homeServices: {
        title: doc.homeServices?.title || staticOrg.homeServices.title,
        addresses:
          doc.homeServices?.addresses?.map((a: any) => ({
            address: a.address,
            transport: a.transport || "",
          })) || staticOrg.homeServices.addresses,
        schedule:
          doc.homeServices?.schedule?.map((s: any) => s.line).filter(Boolean) ||
          staticOrg.homeServices.schedule,
      },
    };
  }, staticOrg);
}

export async function getNavigation() {
  return safe(async () => {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "navigation", depth: 0 })) as any;
    return {
      topBarLinks:
        doc.topBarLinks?.map((l: any) => ({ href: l.href, label: l.label })) || staticTopBar,
      navLinks: doc.navLinks?.map((l: any) => ({ href: l.href, label: l.label })) || staticNav,
    };
  }, { topBarLinks: staticTopBar, navLinks: staticNav });
}

export async function getHomepageLayout() {
  return safe(async () => {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "homepage", depth: 2 })) as any;
    if (!doc.layout?.length) {
      return defaultHomepageLayout();
    }
    return doc.layout;
  }, defaultHomepageLayout());
}

function defaultHomepageLayout() {
  return [
    { blockType: "hero" as const },
    { blockType: "about" as const },
    { blockType: "video" as const },
    { blockType: "services" as const },
    { blockType: "equipment" as const },
    { blockType: "pricing" as const },
    { blockType: "matkapital" as const },
    { blockType: "team" as const },
    { blockType: "reviews" as const },
    { blockType: "contact" as const },
  ];
}

export async function getServices(): Promise<ServiceItem[]> {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "services",
      where: { published: { equals: true } },
      sort: "sortOrder",
      limit: 100,
      depth: 0,
    });
    if (!docs.length) return staticServices;
    return (docs as any[]).map((d) => ({
      id: d.slug,
      title: d.title,
      icon: d.icon || "brain",
      summary: d.summary || "",
      details: d.details || "",
      symptoms: d.symptoms?.map((s: any) => s.text).filter(Boolean) as string[],
      priceFrom: d.priceFrom || "",
      sections: d.sections?.map((s: any) => ({
        title: s.title,
        paragraphs: s.paragraphs?.map((p: any) => p.text).filter(Boolean) as string[] | undefined,
        items: s.items?.map((i: any) => i.text).filter(Boolean) as string[] | undefined,
      })),
    }));
  }, staticServices);
}

export async function getSpecialists(): Promise<Specialist[]> {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "specialists",
      sort: "sortOrder",
      limit: 100,
      depth: 1,
    });
    if (!docs.length) return staticSpecialists;
    return (docs as any[]).map((d, i) => ({
      id: String(d.id),
      name: d.name,
      role: d.role,
      bio: d.bio || "",
      image: mediaUrl(d.photo) || staticSpecialists[i]?.image || "/specialists/ponomareva.jpg",
    }));
  }, staticSpecialists);
}

export async function getPricing(): Promise<PricingRow[]> {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pricing-items",
      sort: "sortOrder",
      limit: 200,
      depth: 0,
    });
    if (!docs.length) return staticPricing;
    return (docs as any[]).map((d) => ({
      id: String(d.id),
      name: d.name,
      category: d.category as "diagnostics" | "classes",
      duration: d.duration || "",
      price: d.price,
    }));
  }, staticPricing);
}

export async function getEquipment(): Promise<EquipmentItem[]> {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "equipment-items",
      sort: "sortOrder",
      limit: 100,
      depth: 0,
    });
    if (!docs.length) return staticEquipment;
    return (docs as any[]).map((d) => ({
      id: String(d.id),
      title: d.title,
      description: d.description || "",
      icon: d.icon || "barrel",
    }));
  }, staticEquipment);
}

export async function getMatkapitalSteps() {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "matkapital-steps",
      sort: "sortOrder",
      limit: 50,
      depth: 0,
    });
    if (!docs.length) return staticMatkapital;
    return (docs as any[]).map((d, i) => ({
      step: i + 1,
      title: d.title,
      description: d.description || "",
    }));
  }, staticMatkapital);
}

export async function getPublishedReviews() {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "reviews",
      where: { status: { equals: "published" } },
      sort: "-createdAt",
      limit: 100,
      depth: 1,
    });
    if (!docs.length) {
      return {
        images: staticReviews,
        texts: [] as { id: string; name: string; text: string; rating?: number }[],
      };
    }
    const list = docs as any[];
    const images = list
      .filter((d) => d.type === "image")
      .map((d, i) => ({
        id: String(d.id),
        src: mediaUrl(d.image) || "",
        alt: d.name || `Отзыв ${i + 1}`,
      }))
      .filter((d) => d.src);
    const texts = list
      .filter((d) => d.type === "text" && d.text)
      .map((d) => ({
        id: String(d.id),
        name: d.name,
        text: d.text || "",
        rating: d.rating ?? undefined,
      }));
    return {
      images: images.length ? images : staticReviews,
      texts,
    };
  }, { images: staticReviews, texts: [] });
}

export async function getProviderSection(slug: string) {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "provider-sections",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    const doc = docs[0] as any;
    if (!doc) return null;
    return {
      title: doc.title,
      slug: doc.slug,
      scope: doc.scope,
      blocks: mapProviderBlocks(doc.blocks || []),
    };
  }, null);
}

export async function getProviderNav(scope: "social" | "education" = "social") {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "provider-sections",
      sort: "sortOrder",
      limit: 100,
      depth: 0,
    });
    if (!docs.length) return providerNav;
    return (docs as any[])
      .filter((d) => d.scope === "both" || d.scope === scope)
      .map((d) => ({ id: d.slug, title: d.title }));
  }, providerNav);
}

export async function getPageBySlug(slug: string) {
  return safe(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pages",
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
      limit: 1,
      depth: 0,
    });
    return (docs[0] as any) || null;
  }, null);
}

function mapProviderBlocks(blocks: any[]): ProviderBlock[] {
  return blocks.map((b) => {
    const type = String(b.blockType);
    if (type === "heading") return { blockType: "heading", text: String(b.text || "") };
    if (type === "paragraph") return { blockType: "paragraph", text: String(b.text || "") };
    if (type === "list") {
      const items = (b.items || []).map((i: any) => i.text || "").filter(Boolean);
      return { blockType: "list", items };
    }
    if (type === "docs") {
      const items = (b.items || []).map((i: any) => ({
        label: i.label || "",
        href: i.href || mediaUrl(i.file) || "#",
      }));
      return { blockType: "docs", items };
    }
    if (type === "card") {
      return {
        blockType: "card",
        title: b.title || undefined,
        paragraphs: (b.paragraphs || []).map((p: any) => p.text || "").filter(Boolean),
        lists: (b.lists || []).map((l: any) => ({
          heading: l.heading || undefined,
          items: (l.items || []).map((i: any) => i.text || "").filter(Boolean),
        })),
        docs: (b.docs || []).map((d: any) => ({
          label: d.label || "",
          href: d.href || "#",
        })),
      };
    }
    return { blockType: "paragraph", text: "" };
  });
}
