import { Command, flags } from '@oclif/command';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { resolve } from 'path';

import showConfig from './utils/showConfig';

class TypeEnv extends Command {
  static description = 'create a .d.ts file to your .env file';

  static usage = '[OPTIONS]=value';

  static flags = {
    help: flags.help({ char: 'h' }),

    path: flags.string({
      char: 'p',
      description: 'change the path to your type definition',
      helpValue: 'src/@types',
      default: 'src/@types',
    }),

    file: flags.string({
      char: 'f',
      description: 'change the env file',
      helpValue: '.env.prod',
      default: '.env',
    }),

    show: flags.boolean({
      char: 's',
      description: 'not create the .d.ts file and show in terminal the results',
      default: false,
    }),

    config: flags.enum({
      char: 'c',
      options: ['ts', 'js'],
      description: 'show the config to put in (tsconfig.json|jsconfig.json)',
    }),

    version: flags.version({ char: 'v' }),
  };

  static examples = [
    '$ typeEnv --path=src/@types',
    '$ typeEnv --file .env.prod',
    '$ typeEnv -c ts',
  ];

  async run(): Promise<void> {
    try {
      const { flags: myFlags } = this.parse(TypeEnv);
      const { path, file, show, config } = myFlags;

      if (config) {
        this.log(
          chalk.green(`Put this config in your ${config}config.json:\n`),
        );
        this.log(await showConfig(config));
        return;
      }

      const envFile = await fs.readFile(`${file}`, { encoding: 'utf8' });
      const parsedEnv = dotenv.parse(envFile);
      const variables = Object.keys(parsedEnv);

      if (variables.length === 0) {
        throw Error(`Your '${file}' file is empty`);
      }

      if (!show) this.log(chalk.green('Creating the .d.ts for your env file'));

      const pathTemplate = resolve(__dirname, 'views', 'envTypeTemplate.hbs');
      const sourceTemplate = await fs.readFile(pathTemplate, {
        encoding: 'utf8',
      });

      const source = Handlebars.compile(sourceTemplate)({ variables });

      if (show) {
        this.log(source);
        return;
      }

      await fs.mkdir(`${path}`, { recursive: true });
      await fs.writeFile(`${path}/env.d.ts`, source);

      this.log(chalk.green('Finished 🚀'));
    } catch (err) {
      if (err.code !== 'EEXIT') {
        this.warn(err.message);
      }
    }
  }
}

export = TypeEnv;
