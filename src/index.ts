import { Command, flags } from '@oclif/command';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { resolve } from 'path';

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

    version: flags.version({ char: 'v' }),
  };

  static examples = [
    '$ typeEnv --path=src/@types',
    '$ typeEnv --file .env.prod',
  ];

  async run(): Promise<void> {
    try {
      const { flags: myFlags } = this.parse(TypeEnv);
      const { path, file, show } = myFlags;

      const envFile = await fs.readFile(`${file}`, { encoding: 'utf8' });

      if (!show) this.log(chalk.green('Creating the .d.ts for your env file'));

      const parsedEnv = dotenv.parse(envFile);
      const variables = Object.keys(parsedEnv);

      const pathTemplate = resolve(__dirname, 'envTypeTemplate.hbs');
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
      this.warn(err.message);
    }
  }
}

export = TypeEnv;
