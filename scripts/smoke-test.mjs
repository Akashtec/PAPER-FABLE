import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const js = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");

assert.match(html, /<html lang="en">/, "HTML should declare its language");
assert.match(html, /<meta name="viewport"/, "page should have a responsive viewport");
assert.match(html, /<link rel="stylesheet" href="styles\.css">/, "stylesheet should be local");
assert.match(html, /<script src="app\.js" defer><\/script>/, "app script should be local");
assert.ok(existsSync("styles.css"), "styles.css should exist");
assert.ok(existsSync("app.js"), "app.js should exist");

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const referencedIds = new Set([
  ...js.matchAll(/document\.getElementById\("([^"]+)"\)/g),
  ...js.matchAll(/setText\("([^"]+)"/g),
].map((match) => match[1]));

for (const id of referencedIds) {
  assert.ok(ids.has(id), \`app.js references missing element id: \${id}\`);
}

for (const id of [
  "spark",
  "weather",
  "companion",
  "recipe-form",
  "copy-button",
  "reset-button",
  "story-title",
  "story-copy",
]) {
  assert.ok(ids.has(id), \`Expected interactive/story element is missing: \${id}\`);
}

assert.match(js, /addEventListener\("submit"/, "story form should be interactive");
assert.match(js, /addEventListener\("click"/, "copy/reset controls should be interactive");
assert.match(js, /replaceChildren\(\)/, "story content should be safely rebuilt with DOM nodes");
assert.match(css, /prefers-reduced-motion/, "reduced-motion preferences should be respected");
assert.match(css, /@media \(max-width:/, "layout should include small-screen styles");

console.log("Paper Fable smoke checks passed.");
