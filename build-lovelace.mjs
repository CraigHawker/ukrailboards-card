import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import esbuild from "esbuild";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    plugins: [handlebarsPrecompilePlugin],
    loader: {
        ".css": "text"
    }
});

console.log("Built dist/demo.js");
console.log("Built dist/nationalrailuk-card.js");
