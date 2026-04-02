/**
 * Build orchestration for UK Rail Boards card and demo.
 * 
 * This script handles the complete build pipeline with sequential dependencies:
 * 1. Copies Handlebars runtime from node_modules
 * 2. Compiles SCSS to CSS (see separate build:css task)
 * 3. Precompiles Handlebars templates and bundles JavaScript with esbuild
 * 
 * The handlebarsPrecompilePlugin intercepts .hbs imports and converts them to
 * precompiled JavaScript functions, enabling template rendering without runtime compilation.
 * 
 * Build targets: 'all' (card + demo), 'card' (production), 'demo' (development)
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import esbuild from "esbuild";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const demoDir = path.join(__dirname, "demo");
const demoHtmlSourcePath = path.join(__dirname, "src", "demo", "index.htm");
const fontsDir = path.join(__dirname, "src", "fonts");
const hacsManifestPath = path.join(__dirname, "hacs.json");

/**
 * esbuild plugin that precompiles Handlebars templates (.hbs files) into JavaScript.
 * Converts template source into precompiled template functions that can be rendered
 * without requiring the Handlebars compiler at runtime.
 */
const handlebarsPrecompilePlugin = {
    name: "handlebars-precompile",
    setup(build) {
        build.onLoad({ filter: /\.hbs$/ }, async (args) => {
            const source = await fs.readFile(args.path, "utf8");
            const precompiled = Handlebars.precompile(source);

            return {
                contents: `import Handlebars from "handlebars/runtime";\nexport default Handlebars.template(${precompiled});`,
                loader: "js"
            };
        });
    }
};

const buildTarget = process.argv[2] || "all";

if (!["all", "demo", "card"].includes(buildTarget)) {
    throw new Error(`Unknown build target: ${buildTarget}`);
}

async function syncReleaseRoot() {
    await fs.copyFile(hacsManifestPath, path.join(distDir, "hacs.json"));

    const fontDestDir = path.join(distDir, "fonts");
    await fs.mkdir(fontDestDir, { recursive: true });

    const fontFiles = await fs.readdir(fontsDir, { withFileTypes: true });
    for (const fontFile of fontFiles) {
        if (!fontFile.isFile()) continue;

        await fs.copyFile(
            path.join(fontsDir, fontFile.name),
            path.join(fontDestDir, fontFile.name)
        );
    }
}

async function syncDemoHtml() {
    const source = await fs.readFile(demoHtmlSourcePath, "utf8");
    const output = source
        .replaceAll("../styles/fonts.css", "../src/styles/fonts.css")
        .replaceAll("../styles/site.css", "../src/styles/site.css");

    await fs.writeFile(path.join(demoDir, "index.htm"), output, "utf8");
}

if (buildTarget === "all" || buildTarget === "demo") {
    await fs.mkdir(demoDir, { recursive: true });
    await syncDemoHtml();

    await esbuild.build({
        entryPoints: [path.join(__dirname, "src", "demo", "main.js")],
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "es2020",
        outfile: path.join(demoDir, "demo.js"),
        plugins: [handlebarsPrecompilePlugin]
    });

    console.log("Synced demo/index.htm");
    console.log("Built demo/demo.js");
}

if (buildTarget === "all" || buildTarget === "card") {
    await fs.rm(distDir, { recursive: true, force: true });
    await fs.mkdir(distDir, { recursive: true });

    await esbuild.build({
        entryPoints: [path.join(__dirname, "src", "lovelace", "ukrailboards-card.js")],
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "es2020",
        outfile: path.join(distDir, "ukrailboards-card.js"),
        plugins: [handlebarsPrecompilePlugin],
        loader: {
            ".css": "text"
        }
    });

    await syncReleaseRoot();

    console.log("Built dist/ukrailboards-card.js");
    console.log("Synced dist package root assets");
}
