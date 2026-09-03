import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import {
  equipmentItems,
  heroBadges,
  matkapitalSteps,
  navLinks,
  organizationInfo,
  pricing,
  services,
  siteConfig,
  specialists,
  topBarLinks,
} from "../src/data/content";
import { providerNav, educationNavIds } from "../src/data/providerNav";
import { providerSeedBlocks } from "../src/data/providerSeed";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function uploadFile(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
  alt: string,
) {
  if (!fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : ext === ".pdf"
          ? "application/pdf"
          : ext === ".txt"
            ? "text/plain"
            : "image/jpeg";

  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: {
      data,
      mimetype: mime,
      name: filename,
      size: data.length,
    },
  });
  return doc.id;
}

async function main() {
  const payload = await getPayload({ config });

  const email = process.env.ADMIN_EMAIL || "admin@lisaba.ru";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (!existingUsers.docs.length) {
    await payload.create({
      collection: "users",
      data: { email, password },
    });
    console.log("Admin user created:", email);
  } else {
    console.log("Admin user already exists");
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      ...siteConfig,
      heroBadges: heroBadges.map((b) => ({ id: b.id, label: b.label, icon: b.icon })),
      aboutTitle: "Пространство, где каждый ребёнок раскрывает свой потенциал",
      aboutLead:
        "Центр «ЛИСАБА» — это команда специалистов, объединённых миссией помочь детям с особенностями развития обрести уверенность, навыки саморегуляции и радость от познания мира.",
      aboutBody:
        "Мы работаем в тесном контакте с родителями, обеспечивая прозрачность процесса и измеримые результаты на каждом этапе.",
      aboutStats: [
        { value: "10+", label: "лет опыта" },
        { value: "500+", label: "семей" },
        { value: "ИППСУ", label: "доступен" },
      ],
      aboutValues: [
        {
          icon: "microscope",
          title: "Научный подход",
          description: "Современные методы работы, подтверждённые научными исследованиями.",
        },
        {
          icon: "heart",
          title: "Эмпатия и забота",
          description:
            "Мы понимаем переживания родителей и создаём атмосферу принятия для каждого ребёнка.",
        },
        {
          icon: "award",
          title: "Лицензия и опыт",
          description:
            "Образовательная лицензия, сертифицированные специалисты, более 10 лет практики.",
        },
        {
          icon: "sparkles",
          title: "Индивидуальность",
          description:
            "Программа разрабатывается персонально — с учётом диагностики, возраста и целей семьи.",
        },
      ],
    },
  });
  console.log("site-settings OK");

  await payload.updateGlobal({
    slug: "organization",
    data: {
      fullName: organizationInfo.fullName,
      shortName: organizationInfo.shortName,
      legalAddress: organizationInfo.legalAddress,
      postalAddress: organizationInfo.postalAddress,
      innKpp: organizationInfo.innKpp,
      bank: organizationInfo.bank,
      bik: organizationInfo.bik,
      checkingAccount: organizationInfo.checkingAccount,
      correspondentAccount: organizationInfo.correspondentAccount,
      registrationDate: organizationInfo.registrationDate,
      founder: organizationInfo.founder,
      branches: organizationInfo.branches,
      phones: organizationInfo.phones,
      email: organizationInfo.email,
      semiStationary: {
        title: organizationInfo.semiStationary.title,
        address: organizationInfo.semiStationary.address,
        transport: organizationInfo.semiStationary.transport,
        schedule: organizationInfo.semiStationary.schedule.map((line) => ({ line })),
      },
      homeServices: {
        title: organizationInfo.homeServices.title,
        addresses: organizationInfo.homeServices.addresses.map((a) => ({
          address: a.address,
          transport: a.transport,
        })),
        schedule: organizationInfo.homeServices.schedule.map((line) => ({ line })),
      },
    },
  });
  console.log("organization OK");

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      topBarLinks: topBarLinks.map((l) => ({ href: l.href, label: l.label })),
      navLinks: navLinks.map((l) => ({ href: l.href, label: l.label })),
    },
  });
  console.log("navigation OK");

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      layout: [
        { blockType: "hero" },
        { blockType: "about" },
        { blockType: "video" },
        { blockType: "services" },
        { blockType: "equipment" },
        { blockType: "pricing" },
        { blockType: "matkapital" },
        { blockType: "team" },
        { blockType: "reviews" },
        { blockType: "contact" },
      ],
    },
  });
  console.log("homepage OK");

  const existingServices = await payload.find({ collection: "services", limit: 1 });
  if (!existingServices.docs.length) {
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await payload.create({
        collection: "services",
        data: {
          title: s.title,
          slug: s.id,
          icon: s.icon,
          summary: s.summary,
          details: s.details,
          priceFrom: s.priceFrom,
          published: true,
          sortOrder: i + 1,
          symptoms: s.symptoms.map((text) => ({ text })),
          sections: s.sections?.map((sec) => ({
            title: sec.title,
            paragraphs: sec.paragraphs?.map((text) => ({ text })),
            items: sec.items?.map((text) => ({ text })),
          })),
        },
      });
    }
    console.log("services seeded");
  }

  const existingPricing = await payload.find({ collection: "pricing-items", limit: 1 });
  if (!existingPricing.docs.length) {
    for (let i = 0; i < pricing.length; i++) {
      const p = pricing[i];
      await payload.create({
        collection: "pricing-items",
        data: {
          name: p.name,
          category: p.category,
          duration: p.duration,
          price: p.price,
          sortOrder: i + 1,
        },
      });
    }
    console.log("pricing seeded");
  }

  const existingEq = await payload.find({ collection: "equipment-items", limit: 1 });
  if (!existingEq.docs.length) {
    for (let i = 0; i < equipmentItems.length; i++) {
      const e = equipmentItems[i];
      await payload.create({
        collection: "equipment-items",
        data: {
          title: e.title,
          description: e.description,
          icon: e.icon,
          sortOrder: i + 1,
        },
      });
    }
    console.log("equipment seeded");
  }

  const existingMk = await payload.find({ collection: "matkapital-steps", limit: 1 });
  if (!existingMk.docs.length) {
    for (const step of matkapitalSteps) {
      await payload.create({
        collection: "matkapital-steps",
        data: {
          title: step.title,
          description: step.description,
          sortOrder: step.step,
        },
      });
    }
    console.log("matkapital seeded");
  }

  const existingSpec = await payload.find({ collection: "specialists", limit: 1 });
  if (!existingSpec.docs.length) {
    for (let i = 0; i < specialists.length; i++) {
      const s = specialists[i];
      const photoPath = path.join(root, "public", s.image.replace(/^\//, ""));
      const photoId = await uploadFile(payload, photoPath, s.name);
      await payload.create({
        collection: "specialists",
        data: {
          name: s.name,
          role: s.role,
          bio: s.bio,
          photo: photoId || undefined,
          sortOrder: i + 1,
        },
      });
    }
    console.log("specialists seeded");
  }

  const existingReviews = await payload.find({ collection: "reviews", limit: 1 });
  if (!existingReviews.docs.length) {
    for (let i = 1; i <= 13; i++) {
      const name = `review-${String(i).padStart(2, "0")}.jpg`;
      const filePath = path.join(root, "public", "reviews", name);
      const imageId = await uploadFile(payload, filePath, `Отзыв родителя ${i}`);
      if (!imageId) continue;
      await payload.create({
        collection: "reviews",
        data: {
          type: "image",
          name: `Отзыв родителя ${i}`,
          image: imageId,
          status: "published",
          source: "admin",
        },
      });
    }
    console.log("review images seeded");
  }

  const existingProvider = await payload.find({ collection: "provider-sections", limit: 1 });
  if (!existingProvider.docs.length) {
    const edu = new Set(educationNavIds as readonly string[]);
    for (let i = 0; i < providerNav.length; i++) {
      const item = providerNav[i];
      const isEdu = edu.has(item.id);
      const finalScope = item.id === "osnovnye" || isEdu ? "both" : "social";

      await payload.create({
        collection: "provider-sections",
        data: {
          title: item.title,
          slug: item.id,
          scope: finalScope,
          sortOrder: i + 1,
          blocks: providerSeedBlocks[item.id] || [],
        },
      });
    }
    console.log("provider-sections seeded");
  }

  const existingPages = await payload.find({ collection: "pages", limit: 1 });
  if (!existingPages.docs.length) {
    await payload.create({
      collection: "pages",
      data: {
        title: "Специалистам",
        slug: "specialistam",
        eyebrow: "Партнёрам",
        excerpt: "Сотрудничество и профессиональное развитие для специалистов",
        description: "Приглашаем коллег к сотрудничеству, стажировкам и профессиональному обмену опытом.",
        body: `Если вы логопед, дефектолог, психолог, нейропсихолог или специалист по сенсорной интеграции — будем рады знакомству. В центре «ЛИСАБА» можно обсудить совместную практику, направление семей и участие в образовательных мероприятиях.

- Стажировки и обмен опытом
- Совместные программы для семей
- Консультации по сенсорной интеграции и смежным направлениям

Напишите на ${siteConfig.email} или позвоните ${siteConfig.phone} — расскажем о форматах сотрудничества.`,
        published: true,
      },
    });
    await payload.create({
      collection: "pages",
      data: {
        title: "Благотворителям",
        slug: "blagotvoritelyam",
        eyebrow: "Поддержка",
        excerpt: "Поддержка центра: как помочь детям и семьям",
        description: "Вы можете помочь детям с особенностями развития получить занятия и поддержку специалистов.",
        body: `Центр «ЛИСАБА» открыт к сотрудничеству с частными благотворителями, фондами и компаниями. Поддержка помогает семьям оплачивать диагностику и курсы занятий, развивать оборудование сенсорного зала и расширять доступность помощи.

- Целевая помощь конкретным программам и семьям
- Поддержка оснащения сенсорно-динамического зала
- Партнёрские и корпоративные инициативы

Чтобы обсудить формат помощи, свяжитесь с нами: ${siteConfig.phone}, ${siteConfig.email}.`,
        published: true,
      },
    });
    console.log("pages seeded");
  }

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
