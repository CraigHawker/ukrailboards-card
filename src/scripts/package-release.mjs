import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");
const outputDir = path.join(rootDir, "artifacts", "release-inspect");
const packageRootDir = path.join(outputDir, "package-root");
const distDir = path.join(rootDir, "dist");
const releaseArtifactPath = path.join(distDir, "ukrailboards-card.js");
const hacsManifestPath = path.join(distDir, "hacs.json");
const bundledIntegrationDir = path.join(distDir, "custom_components", "ukrailboards_nationalrail");

async function ensureFile(filePath) {
    try {
        await fs.access(filePath);
    } catch {
        throw new Error(`Required file not found: ${path.relative(rootDir, filePath)}`);
    }
}

async function ensureDir(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        throw new Error(`Required directory not found: ${path.relative(rootDir, dirPath)}`);
    }
}

async function sha256(filePath) {
    const buffer = await fs.readFile(filePath);
    return createHash("sha256").update(buffer).digest("hex");
}

async function listFiles(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true, recursive: true });
    return entries
        .filter((dirent) => dirent.isFile())
        .map((dirent) => path.relative(dirPath, path.join(dirent.parentPath, dirent.name)))
        .sort();
}

await ensureFile(releaseArtifactPath);
await ensureFile(hacsManifestPath);
await ensureDir(bundledIntegrationDir);
await ensureDir(distDir);
await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });
await fs.cp(distDir, packageRootDir, { recursive: true });

const stagedReleaseArtifactPath = path.join(packageRootDir, path.basename(releaseArtifactPath));
const packageFiles = await listFiles(packageRootDir);
const fileSummaries = [];
for (const relPath of packageFiles) {
    const filePath = path.join(packageRootDir, relPath);
    const stat = await fs.stat(filePath);
    fileSummaries.push({
        path: `package-root/${relPath.replaceAll(path.sep, "/")}`,
        bytes: stat.size,
        sha256: await sha256(filePath)
    });
}

const report = {
    generatedAt: new Date().toISOString(),
    packageRoot: {
        workflowMatches: [".github/workflows/release.yml"],
        directory: "package-root/",
        files: fileSummaries
    },
    notes: [
        "The package root contains hacs.json, ukrailboards-card.js, and the required font files together at the same level.",
        "The package root includes custom_components/ukrailboards_nationalrail for bundled integration delivery.",
        "The card resolves font files relative to the installed module URL by default, or the configured font_path if provided.",
        "The staged package-root directory mirrors the intended dist release layout for inspection."
    ]
};

await fs.writeFile(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`Staged release inspection output in ${path.relative(rootDir, outputDir)}`);
console.log("Package root files:");
for (const relPath of packageFiles) {
    console.log(`- package-root/${relPath.replaceAll(path.sep, "/")}`);
}