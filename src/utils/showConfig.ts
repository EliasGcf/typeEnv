import { Command } from '@oclif/command';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

type ConfigTypes = 'js' | 'ts';

interface Methods {
  log: Command['log'];
}

export default async function showConfig(
  config: ConfigTypes,
  methods: Methods,
): Promise<boolean> {
  methods.log(
    chalk.greenBright(
      `\n⚡ You will increase this setting in your '${config}config.json' file!\n`,
    ),
  );

  const contentFile = await fs.readFile(
    resolve(__dirname, '..', 'views', `${config}Config.txt`),
    {
      encoding: 'utf8',
    },
  );

  methods.log(`${chalk.yellow(contentFile)}\n`);
  return true;
}
