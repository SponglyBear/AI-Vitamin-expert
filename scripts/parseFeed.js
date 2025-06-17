import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

async function run() {
  const url = 'https://affiliate.gymbeam.sk/datafeed.xml';
  const res = await fetch(url);
  const xml = await res.text();
  const parsed = await parseStringPromise(xml);

  const items = parsed?.SHOP?.SHOPITEM ?? [];
  const vitamins = items
    .filter((item) => /vitamin/i.test(item?.CATEGORY?.[0] || '') || /vitamin/i.test(item?.PRODUCTNAME?.[0] || ''))
    .map((item) => ({
      id: item?.ITEM_ID?.[0],
      name: item?.PRODUCTNAME?.[0],
      url: item?.URL?.[0],
      price: item?.PRICE_VAT?.[0],
      description: item?.DESCRIPTION?.[0],
    }));

  const outPath = path.join(__dirname, '..', 'public', 'vitamins.json');
  fs.writeFileSync(outPath, JSON.stringify(vitamins, null, 2));
  console.log(`Saved ${vitamins.length} vitamins to ${outPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
