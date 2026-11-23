// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、大きさのちがう3つの星（明るい星ほど大きく描く）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <g><path d="M38 14 L45 31 L63 32 L49 43 L54 61 L38 51 L22 61 L27 43 L13 32 L31 31 Z" fill="#f6d77a"/><path d="M72 52 L75.5 60.5 L84.5 61 L77.5 66.5 L80 75.5 L72 70.5 L64 75.5 L66.5 66.5 L59.5 61 L68.5 60.5 Z" fill="#fffdf7"/><circle cx="30" cy="80" r="3" fill="#7fc4ef"/></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
