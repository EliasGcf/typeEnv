import { CLIError } from '@oclif/errors';

import * as dotenv from 'dotenv';
import { promises as fs } from 'fs';

export default async function getEnvVariables(file: string): Promise<string[]> {
  try {
    const envFile = await fs.readFile(`${file}`, { encoding: 'utf8' });
    const parsedEnv = dotenv.parse(envFile);
    const variablesEnvFile = Object.keys(parsedEnv);

    return variablesEnvFile;
  } catch (err) {
    throw new CLIError(err.message);
  }
}
