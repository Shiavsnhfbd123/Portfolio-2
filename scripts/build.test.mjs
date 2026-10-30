import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFile(resolve(root, path));
const html = (await read("dist/index.html")).toString();

test("production HTML references real, relative local assets", async () => {
  const assets = [...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)].map(
    (m) => m[1],
  );
  assert.ok(
    assets.some((asset) => asset.endsWith(".js")),
    "Missing application bundle",
  );
  assert.ok(
    assets.some((asset) => asset.endsWith(".css")),
    "Missing stylesheet",
  );
  for (const asset of assets)
    assert.ok((await stat(resolve(root, "dist", asset))).isFile(), asset);
  assert.ok(!html.includes("%BASE_URL%"), "Unresolved Vite base URL");
});

test("deployed résumé is the unchanged PDF from public/", async () => {
  const source = await read("public/Shivansh_Aggarwal_Resume.pdf");
  const built = await read("dist/Shivansh_Aggarwal_Resume.pdf");
  assert.equal(source.subarray(0, 5).toString(), "%PDF-");
  const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
  assert.equal(hash(source), hash(built), "Résumé changed during build");
});

test("portrait and favicon ship with the production site", async () => {
  for (const asset of ["id.jpg", "favicon.svg"]) {
    assert.deepEqual(
      await read(`dist/${asset}`),
      await read(`public/${asset}`),
    );
  }
});

test("SEO metadata and structured data survive the build", () => {
  assert.match(html, /<html[^>]+lang="en"/);
  assert.match(html, /name="description"/);
  const structured = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(structured, "Missing structured data");
  assert.equal(JSON.parse(structured[1])["@type"], "Person");
});
