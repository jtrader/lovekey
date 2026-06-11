import { readdir, mkdir, stat } from "node:fs/promises";
import { join, relative, dirname, extname, basename } from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const ASSETS_DIR = join(ROOT, "src", "assets");
const OUTPUT_DIR = join(ROOT, "src", "assets", "optimized");
const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const MAX_IMAGE_WIDTH = 1600;
const WEBP_QUALITY = 78;
const AVIF_QUALITY = 50;

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "optimized") continue;
      files.push(...await walk(fullPath));
      continue;
    }

    if (entry.isFile() && SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
};

const analyse = async (filePath) => {
  const fileStat = await stat(filePath);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  return {
    filePath,
    relativePath: relative(ROOT, filePath),
    bytes: fileStat.size,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    format: metadata.format ?? extname(filePath).slice(1),
  };
};

const optimize = async (asset) => {
  const relativeAssetPath = relative(ASSETS_DIR, asset.filePath);
  const outputDir = join(OUTPUT_DIR, dirname(relativeAssetPath));
  const baseName = basename(relativeAssetPath, extname(relativeAssetPath));
  await mkdir(outputDir, { recursive: true });

  const pipeline = sharp(asset.filePath)
    .rotate()
    .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true });

  const webpPath = join(outputDir, `${baseName}.webp`);
  const avifPath = join(outputDir, `${baseName}.avif`);

  await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath);
  await pipeline.clone().avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(avifPath);

  const [webpStat, avifStat] = await Promise.all([stat(webpPath), stat(avifPath)]);

  return {
    source: asset.relativePath,
    sourceBytes: asset.bytes,
    width: asset.width,
    height: asset.height,
    webp: relative(ROOT, webpPath),
    webpBytes: webpStat.size,
    avif: relative(ROOT, avifPath),
    avifBytes: avifStat.size,
  };
};

const main = async () => {
  const mode = process.argv.includes("--audit") ? "audit" : "optimize";
  const sourceFiles = await walk(ASSETS_DIR);
  const assets = (await Promise.all(sourceFiles.map(analyse)))
    .sort((a, b) => b.bytes - a.bytes);

  console.log(`Found ${assets.length} raster images in src/assets`);
  console.table(
    assets.map((asset) => ({
      file: asset.relativePath,
      size: formatBytes(asset.bytes),
      dimensions: asset.width && asset.height ? `${asset.width}×${asset.height}` : "unknown",
      format: asset.format,
    }))
  );

  if (mode === "audit") return;

  const optimized = [];
  for (const asset of assets) {
    optimized.push(await optimize(asset));
  }

  console.log("\nOptimized outputs:");
  console.table(
    optimized.map((asset) => ({
      source: asset.source,
      sourceSize: formatBytes(asset.sourceBytes),
      webp: asset.webp,
      webpSize: formatBytes(asset.webpBytes),
      avif: asset.avif,
      avifSize: formatBytes(asset.avifBytes),
      webpSavings: `${Math.max(0, 100 - (asset.webpBytes / asset.sourceBytes) * 100).toFixed(1)}%`,
      avifSavings: `${Math.max(0, 100 - (asset.avifBytes / asset.sourceBytes) * 100).toFixed(1)}%`,
    }))
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
