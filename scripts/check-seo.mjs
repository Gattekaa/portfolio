import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const slugs = [
  "gatree",
  "dotnet",
  "ruby-on-rails",
  "react-native",
  "design-system",
];
const pages = ["pt", "en"].flatMap((lang) => [
  `/${lang}`,
  `/${lang}/curriculo`,
  ...slugs.map((slug) => `/${lang}/projetos/${slug}`),
]);
let count = 0;
for (const path of pages) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path} status`);
  const html = await response.text();
  assert.match(html, /<title>[^<]+<\/title>/, `${path} title`);
  assert.match(
    html,
    /name="description" content="[^"]+"/,
    `${path} description`,
  );
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path} one H1`);
  assert.match(
    html,
    new RegExp(`<html[^>]+lang="${path.startsWith("/pt") ? "pt-BR" : "en"}"`),
    `${path} document language`,
  );
  assert.match(html, /rel="canonical"/, `${path} canonical`);
  assert.match(
    html,
    /hrefLang="pt-BR"|hreflang="pt-BR"/,
    `${path} Portuguese alternate`,
  );
  assert.match(
    html,
    /hrefLang="en"|hreflang="en"/,
    `${path} English alternate`,
  );
  assert.match(html, /property="og:image"/, `${path} Open Graph image`);
  assert.doesNotMatch(
    html,
    /NOBE/i,
    `${path} confidential employer must not appear`,
  );
  assert.doesNotMatch(
    html,
    /Telecom|telecom\.png|\/projetos\/telecom/i,
    `${path} legacy work removed`,
  );
  const schemas = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  if (!path.endsWith("/curriculo"))
    assert.ok(schemas.length, `${path} structured data`);
  for (const [, schema] of schemas) assert.ok(JSON.parse(schema)["@context"]);
  count++;
}
const root = await fetch(base, { redirect: "manual" });
assert.equal(root.status, 308, "Permanent redirect to Portuguese");
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
for (const path of pages)
  assert.ok(sitemap.includes(path), `${path} in sitemap`);
assert.ok(
  !sitemap.includes("/projetos/telecom"),
  "Retired work must not be in sitemap",
);
assert.equal((await fetch(`${base}/pt/projetos/telecom`)).status, 404);
assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
assert.equal((await fetch(`${base}/og`)).status, 200);
assert.equal((await fetch(`${base}/pt/projetos/nonexistent`)).status, 404);
for (const path of [
  "/nao-existe",
  "/pt/nao-existe",
  "/en/missing",
  "/pt/projetos/nonexistent",
  "/en/projetos/nonexistent",
  "/fr",
]) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 404, `${path} preserves HTTP 404`);
  const html = await response.text();
  assert.match(html, /data-not-found="true"/, `${path} branded error page`);
  assert.match(html, /name="robots" content="[^"]*noindex/, `${path} noindex`);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${path} one error heading`,
  );
}
console.log(
  `SEO checks passed for ${count} pages: metadata, headings, languages, canonical URLs, hreflang, schemas, sitemap, robots, OG image, redirects and privacy.`,
);
