// Génère un PDF A4 à partir d'une fiche HTML.
// Usage : node render-pdf.js aventure.html aventure.pdf
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const path = require("path");

(async () => {
  const [, , inFile, outFile] = process.argv;
  if (!inFile || !outFile) { console.error("usage: node render-pdf.js <in.html> <out.pdf>"); process.exit(1); }
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const page = await browser.newPage();
  await page.goto("file://" + path.resolve(inFile), { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: outFile, format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("PDF écrit :", outFile);
})();
