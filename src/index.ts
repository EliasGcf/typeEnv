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

      if (config === 'js' || config === 'ts') {
        this.log(
          chalk.greenBright(
            `\n⚡ You will increase this setting in your '${config}config.json' file!\n`,
          ),
        );
        this.log(await showConfig(config));
        return;
      }

      const envFile = await fs.readFile(`${file}`, { encoding: 'utf8' });
      const parsedEnv = dotenv.parse(envFile);
      const variablesEnvFile = Object.keys(parsedEnv);

      if (variablesEnvFile.length === 0) {
        this.log(chalk.redBright(`\n❌ Your file '${file}' is empty!\n`));
        this.log(chalk.white(`Example in your file: NAME_VARIABLE=VALUE\n`));
        return;
      }

      if (!show) {
        this.log(
          chalk.greenBright(
            '\n⛏  Creating the type definition for your .env file!',
          ),
        );
      }

      const pathTemplate = resolve(__dirname, 'views', 'envTypeTemplate.hbs');
      const sourceTemplate = await fs.readFile(pathTemplate, {
        encoding: 'utf8',
      });

      const source = Handlebars.compile(sourceTemplate)({
        variables: variablesEnvFile,
      });

      if (show) {
        this.log(chalk.greenBright('\n✔  Show declare of your variables!\n'));
        this.log(chalk.yellow(source));
        return;
      }

      await fs.mkdir(`${path}`, { recursive: true });
      await fs.writeFile(`${path}/env.d.ts`, source);

      this.log(chalk.greenBright('\n🚀 Done!\n'));
    } catch (err) {
      if (err.code !== 'EEXIT') {
        this.warn(err.message);
      }
    }
  }
}

export = TypeEnv;
