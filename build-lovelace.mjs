import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import esbuild from "esbuild";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const demoDir = path.join(__dirname, "demo");
const fontsDir = path.join(__dirname, "fonts");
const hacsManifestPath = path.join(__dirname, "hacs.json");

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

    const fontFiles = await fs.readdir(fontsDir, { withFileTypes: true });
    for (const fontFile of fontFiles) {
        if (!fontFile.isFile()) continue;

        await fs.copyFile(
            path.join(fontsDir, fontFile.name),
            path.join(distDir, fontFile.name)
        );
    }
}

if (buildTarget === "all" || buildTarget === "demo") {
    await fs.mkdir(demoDir, { recursive: true });

    await esbuild.build({
        entryPoints: [path.join(__dirname, "src", "demo", "main.js")],
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "es2020",
        outfile: path.join(demoDir, "demo.js"),
        plugins: [handlebarsPrecompilePlugin]
    });

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
