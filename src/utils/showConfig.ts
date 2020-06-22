import { promises as fs } from 'fs';
import { resolve } from 'path';

export default async function showConfig(config: string): Promise<string> {
  if (config === 'js') {
    const jsConfig = await fs.readFile(
      resolve(__dirname, '..', 'views', 'jsConfig.txt'),
      { encoding: 'utf8' },
    );
    return jsConfig;
  }
  const tsConfig = await fs.readFile(
    resolve(__dirname, '..', 'views', 'tsConfig.txt'),
    { encoding: 'utf8' },
  );
  return tsConfig;
}
