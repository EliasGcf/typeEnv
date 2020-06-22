import { promises as fs } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

type ConfigTypes = 'js' | 'ts';

export default async function showConfig(config: ConfigTypes): Promise<string> {
  const contentFile = await fs.readFile(
    resolve(__dirname, '..', 'views', `${config}Config.txt`),
    {
      encoding: 'utf8',
    },
  );

  return `${chalk.yellow(contentFile)}\n`;
}
