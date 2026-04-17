import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");
const distDir = path.join(rootDir, "dist");

const requiredPaths = [
    path.join(distDir, "hacs.json"),
    path.join(distDir, "ukrailboards-card.js"),
    path.join(distDir, "fonts"),
    path.join(distDir, "custom_components", "ukrailboards_nationalrail", "manifest.json")
];

async function ensureExists(targetPath) {
    try {
        await fs.access(targetPath);
    } catch {
        throw new Error(`Missing required release artifact: ${path.relative(rootDir, targetPath)}`);
    }
}

async function main() {
    for (const targetPath of requiredPaths) {
        await ensureExists(targetPath);
    }

    const hacs = JSON.parse(await fs.readFile(path.join(distDir, "hacs.json"), "utf8"));
    const integrationManifestPath = path.join(distDir, "custom_components", "ukrailboards_nationalrail", "manifest.json");
    const integrationManifest = JSON.parse(await fs.readFile(integrationManifestPath, "utf8"));

    const sharedHomeAssistantVersion = hacs.homeassistant;
    if (!sharedHomeAssistantVersion) {
        throw new Error("hacs.json must define a homeassistant minimum version.");
    }

    if (integrationManifest.homeassistant !== sharedHomeAssistantVersion) {
        throw new Error(
            `Home Assistant minimum version mismatch: hacs.json=${sharedHomeAssistantVersion}, ` +
            `integration manifest=${integrationManifest.homeassistant || "<missing>"}`
        );
    }

    if (integrationManifest.domain === "nationalrail") {
        throw new Error("Bundled integration domain must differ from legacy 'nationalrail'.");
    }

    console.log("Bundle validation passed:");
    console.log(`- Shared Home Assistant min version: ${sharedHomeAssistantVersion}`);
    console.log(`- Bundled integration domain: ${integrationManifest.domain}`);
    console.log("- Required package artifacts are present");

    const releaseTag = process.env.GITHUB_REF_NAME || "";
    if (releaseTag.startsWith("v") && integrationManifest.version === "0.0.0-dev") {
        throw new Error(
            `Integration manifest version is still '0.0.0-dev' for release tag '${releaseTag}'. ` +
            "Run the version-stamp step before building."
        );
    }

    if (integrationManifest.version) {
        console.log(`- Bundled integration version: ${integrationManifest.version}`);
    }
}

main().catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
});
