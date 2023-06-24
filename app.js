const express = require('express');
const { chromium } = require('playwright');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('https://purdyandfigg.com', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' });

  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': screenshot.length,
  });
  res.end(screenshot, 'binary');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
