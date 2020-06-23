import { resolve } from 'path';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';

export default async function getSourceDefinition(
  variables: string[],
): Promise<string> {
  const pathTemplate = resolve(__dirname, '..', 'views', 'envTypeTemplate.hbs');
  const sourceTemplate = await fs.readFile(pathTemplate, {
    encoding: 'utf8',
  });

  const source = Handlebars.compile(sourceTemplate)({
    variables,
  });

  return source;
}
