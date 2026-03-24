import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import esbuild from "esbuild";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function contentTypeFromExtension(extension) {
    const ext = extension.toLowerCase();
    if (ext === ".woff2") return "font/woff2";
    if (ext === ".woff") return "font/woff";
    if (ext === ".ttf") return "font/ttf";
    if (ext === ".otf") return "font/otf";
    return "application/octet-stream";
}

async function toDataUrl(filePath) {
    const fileBuffer = await fs.readFile(filePath);
    const base64 = fileBuffer.toString("base64");
    const extension = path.extname(filePath);
    const contentType = contentTypeFromExtension(extension);
    return `data:${contentType};base64,${base64}`;
}

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

const cssAsTextWithEmbeddedFontsPlugin = {
    name: "css-as-text-with-embedded-fonts",
    setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
            let css = await fs.readFile(args.path, "utf8");

            const fontUrlPattern = /url\(["']?(\.\.\/font\/[^"')]+)["']?\)/g;
            const matches = Array.from(css.matchAll(fontUrlPattern));

            for (const match of matches) {
                const relativePath = match[1];
                const absolutePath = path.resolve(path.dirname(args.path), relativePath);
                const dataUrl = await toDataUrl(absolutePath);
                css = css.replace(match[0], `url("${dataUrl}")`);
            }

            return {
                contents: `export default ${JSON.stringify(css)};`,
                loader: "js"
            };
        });
    }
};

await fs.mkdir(path.join(__dirname, "dist"), { recursive: true });

await esbuild.build({
    entryPoints: [path.join(__dirname, "src", "demo", "main.js")],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2020",
    outfile: path.join(__dirname, "dist", "demo.js"),
    plugins: [handlebarsPrecompilePlugin]
});

await esbuild.build({
    entryPoints: [path.join(__dirname, "src", "lovelace", "nationalrailuk-card.js")],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2020",
    outfile: path.join(__dirname, "dist", "nationalrailuk-card.js"),
    plugins: [handlebarsPrecompilePlugin, cssAsTextWithEmbeddedFontsPlugin]
});

console.log("Built dist/demo.js");
console.log("Built dist/nationalrailuk-card.js");
