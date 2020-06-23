import { Command, flags } from '@oclif/command';
import chalk from 'chalk';

import showConfig from './utils/showConfig';
import getEnvVariables from './utils/getEnvVariables';
import getSourceDefinition from './utils/getSourceDefinition';
import createDefinitionFile from './utils/createDefinitionFile';

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
    const { flags: myFlags } = this.parse(TypeEnv);
    const { path, file, show, config } = myFlags;
    const configExt = config as 'ts' | 'js';

    if (config) {
      await showConfig(configExt, { log: this.log });
      return;
    }

    const variablesEnvFile = await getEnvVariables(file);

    if (variablesEnvFile.length === 0) {
      this.log(chalk.redBright(`\n❌  Your file '${file}' is empty!\n`));
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

    const source = await getSourceDefinition(variablesEnvFile);

    if (show) {
      this.log(chalk.greenBright('\n✔  Show declare of your variables!\n'));
      this.log(chalk.yellow(source));
      return;
    }

    await createDefinitionFile({ path, source });

    this.log(chalk.greenBright('\n🚀  Done!\n'));
  }
}

export = TypeEnv;
