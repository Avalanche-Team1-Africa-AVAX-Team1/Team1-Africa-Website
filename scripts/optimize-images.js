import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(PROJECT_ROOT, 'src', 'raw_assets');
const TARGET_DIR = path.join(PROJECT_ROOT, 'src', 'assets');

// Configuration
const MAX_WIDTH = 1920;
const QUALITY = 80;
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp']; // Skip SVGs, GIFs for now

async function main() {
    console.log('🚀 Starting Image Optimization Process...');
    console.log(`📂 Source: ${SOURCE_DIR}`);
    console.log(`📂 Target: ${TARGET_DIR}`);

    // 1. Ensure Raw Assets Directory Exists
    if (!fs.existsSync(SOURCE_DIR)) {
        console.log('✨ Creating src/raw_assets directory...');
        await fs.ensureDir(SOURCE_DIR);
    }

    // 2. Migration: Move existing assets to raw_assets if they aren't there
    // This allows us to keep a backup of high-res files
    console.log('📦 Checking for files to migrate to raw_assets...');
    await migrateFiles(TARGET_DIR, SOURCE_DIR);

    // 3. Optimization: Process files from raw_assets to assets
    console.log('🎨 Optimizing images...');
    await optimizeImages(SOURCE_DIR, TARGET_DIR);

    console.log('✅ Optimization Complete!');
}

async function migrateFiles(currentDir, backupDir) {
    // If target doesn't exist (fresh start), skip migration
    if (!fs.existsSync(currentDir)) return;

    const items = await fs.readdir(currentDir);

    for (const item of items) {
        const sourcePath = path.join(currentDir, item);
        const backupPath = path.join(backupDir, item);
        const stat = await fs.stat(sourcePath);

        if (stat.isDirectory()) {
            await fs.ensureDir(backupPath);
            await migrateFiles(sourcePath, backupPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            // Only move image files that we intend to optimize
            // We leave other files (like SVGs) in place, but copy images to raw_assets
            if (IMAGE_EXTENSIONS.includes(ext)) {
                if (!fs.existsSync(backupPath)) {
                    console.log(`   Moving original: ${item} -> raw_assets`);
                    await fs.move(sourcePath, backupPath);
                }
            }
        }
    }
}

async function optimizeImages(sourceDir, targetDir) {
    if (!fs.existsSync(sourceDir)) return;

    const items = await fs.readdir(sourceDir);

    for (const item of items) {
        const sourcePath = path.join(sourceDir, item);
        const targetPath = path.join(targetDir, item);
        const stat = await fs.stat(sourcePath);

        if (stat.isDirectory()) {
            await fs.ensureDir(targetPath);
            await optimizeImages(sourcePath, targetPath);
        } else {
            const ext = path.extname(item).toLowerCase();

            if (IMAGE_EXTENSIONS.includes(ext)) {
                // Process Image
                try {
                    const pipeline = sharp(sourcePath);
                    const metadata = await pipeline.metadata();

                    // Resize if too big
                    if (metadata.width > MAX_WIDTH) {
                        pipeline.resize(MAX_WIDTH);
                    }

                    // 1. Output Optimized Original Format
                    // Check output format based on extension
                    if (ext === '.png') {
                        await pipeline
                            .png({ quality: QUALITY, compressionLevel: 9 })
                            .toFile(targetPath);
                    } else if (ext === '.jpg' || ext === '.jpeg') {
                        await pipeline
                            .jpeg({ quality: QUALITY, mozjpeg: true })
                            .toFile(targetPath);
                    } else if (ext === '.webp') {
                        await pipeline
                            .webp({ quality: QUALITY })
                            .toFile(targetPath);
                    }

                    // 2. Output WebP Version (if original wasn't webp)
                    if (ext !== '.webp') {
                        const webpPath = targetPath.replace(ext, '.webp');
                        // Reset pipeline for new output or clone? sharp instances are mutable-ish but .toFile returns promise.
                        // Better to re-open or clone.
                        const webpPipeline = sharp(sourcePath);
                        if (metadata.width > MAX_WIDTH) {
                            webpPipeline.resize(MAX_WIDTH);
                        }
                        await webpPipeline
                            .webp({ quality: QUALITY })
                            .toFile(webpPath);
                    }

                    console.log(`   ✅ Optimized: ${item}`);

                } catch (err) {
                    console.error(`   ❌ Failed to optimize ${item}:`, err.message);
                    // If optimization fails, just copy the original back
                    if (!fs.existsSync(targetPath)) {
                        await fs.copy(sourcePath, targetPath);
                    }
                }
            } else {
                // Just copy non-image files if they aren't in target
                // Actually, since we MOVED images away, the target might be empty of images.
                // But we left SVGs there.
                // If we are in recursive, we might need to copy non-image files if they were in raw_assets?
                // Usually not needed if we only moved images OUT.
            }
        }
    }
}

main().catch(console.error);
