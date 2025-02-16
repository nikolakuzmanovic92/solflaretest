import { browser } from '@wdio/globals';
import fs from 'fs';
import path from 'path';

export const takeScreenshot = async (fileName: string): Promise<void> => {
  const screenshot = await browser.takeScreenshot();
  const screenshotDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }
  const filePath = path.join(screenshotDir, `${fileName}.png`);
  fs.writeFileSync(filePath, screenshot, 'base64');
};
