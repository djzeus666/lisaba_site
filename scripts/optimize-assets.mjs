import fs from "fs";
import path from "path";
import { createRequire } from "module";

// Use sharp if available; otherwise fall back note
const require = createRequire(import.meta.url);

const SRC = path.resolve("img/lisaba_site_img");
const OUT = path.resolve("public");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
  console.log("copy", path.relative(OUT, to));
}

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("sharp not installed — run: npm i -D sharp");
    process.exit(1);
  }

  async function optimize(src, dest, { width = 1400, quality = 80 } = {}) {
    ensureDir(path.dirname(dest));
    const ext = path.extname(dest).toLowerCase();
    let pipeline = sharp(src).rotate().resize({
      width,
      height: width,
      fit: "inside",
      withoutEnlargement: true,
    });
    if (ext === ".png") {
      await pipeline.png({ quality, compressionLevel: 8 }).toFile(dest);
    } else {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(dest);
    }
    const size = fs.statSync(dest).size;
    console.log("ok", path.relative(OUT, dest), Math.round(size / 1024) + "kb");
  }

  // Branding
  await optimize(
    path.join(SRC, "01_branding/logo.jpg"),
    path.join(OUT, "brand/logo-center.jpg"),
    { width: 600, quality: 90 },
  );

  // Team
  const teamMap = {
    ekaterina_ponomareva: "ponomareva",
    vera_dmitrieva: "dmitrieva",
    veronika_shnar: "shnar",
    ekaterina_adaeva: "adaeva",
    mikhail_rozhkov: "rozhkov",
    rinata_sanzhapova: "sanzhapova",
  };
  for (const [srcName, destName] of Object.entries(teamMap)) {
    await optimize(
      path.join(SRC, `02_team/${srcName}.jpg`),
      path.join(OUT, `specialists/${destName}.jpg`),
      { width: 900, quality: 82 },
    );
  }

  // Reviews
  for (let i = 1; i <= 13; i++) {
    await optimize(
      path.join(SRC, `03_reviews/${i}.jpg`),
      path.join(OUT, `reviews/review-${String(i).padStart(2, "0")}.jpg`),
      { width: 1000, quality: 82 },
    );
  }

  // Gallery — skip broken/dot filenames
  const galleryDir = path.join(SRC, "04_gallery");
  const galleryFiles = fs
    .readdirSync(galleryDir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("."))
    .sort();
  let gi = 1;
  for (const file of galleryFiles) {
    await optimize(
      path.join(galleryDir, file),
      path.join(OUT, `gallery/gallery-${String(gi).padStart(2, "0")}.jpg`),
      { width: 1600, quality: 78 },
    );
    gi++;
  }

  // Achievements PDFs
  const achDir = path.join(SRC, "05_achievements");
  for (const file of fs.readdirSync(achDir).filter((f) => f.endsWith(".pdf"))) {
    const safe = file
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "_")
      .replace(/_+/g, "_");
    copyFile(path.join(achDir, file), path.join(OUT, `achievements/${safe}`));
  }

  // Wooden equipment
  const woodDir = path.join(SRC, "06_wooden_equipment");
  for (const file of fs.readdirSync(woodDir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const base = path.basename(file, path.extname(file));
    await optimize(
      path.join(woodDir, file),
      path.join(OUT, `wooden/${base}.jpg`),
      { width: 1000, quality: 82 },
    );
  }

  // Sensory hall
  const hallDir = path.join(SRC, "07_sensory_dynamic_hall");
  for (const file of fs.readdirSync(hallDir).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    const base = path.basename(file, path.extname(file));
    await optimize(
      path.join(hallDir, file),
      path.join(OUT, `sensory-hall/${base}.jpg`),
      { width: 1400, quality: 78 },
    );
  }

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
