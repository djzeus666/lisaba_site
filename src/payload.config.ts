import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { EquipmentItems } from "./collections/EquipmentItems";
import { Leads } from "./collections/Leads";
import { MatkapitalSteps } from "./collections/MatkapitalSteps";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { PricingItems } from "./collections/PricingItems";
import { ProviderSections } from "./collections/ProviderSections";
import { Reviews } from "./collections/Reviews";
import { Services } from "./collections/Services";
import { Specialists } from "./collections/Specialists";
import { Users } from "./collections/Users";
import { Homepage } from "./globals/Homepage";
import { Navigation } from "./globals/Navigation";
import { NotificationSettings } from "./globals/NotificationSettings";
import { Organization } from "./globals/Organization";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  "http://localhost:3000";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— ЛИСАБА",
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Specialists,
    PricingItems,
    EquipmentItems,
    MatkapitalSteps,
    Reviews,
    Leads,
    ProviderSections,
    Pages,
  ],
  globals: [SiteSettings, Organization, Navigation, Homepage, NotificationSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL,
  // Without csrf whitelist, cookie auth is rejected after login behind nginx/IP
  csrf: [
    serverURL,
    "http://109.73.203.62",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3080",
  ],
  cors: [
    serverURL,
    "http://109.73.203.62",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3080",
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./data/payload.db",
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 20000000,
    },
  },
});
