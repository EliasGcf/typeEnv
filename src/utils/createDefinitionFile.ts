import { promises as fs } from 'fs';

interface CreateDefinitionFileDTO {
  path: string;
  source: string;
}

export default async function createDefinitionFile(
  data: CreateDefinitionFileDTO,
): Promise<void> {
  const { path, source } = data;

  await fs.mkdir(`${path}`, { recursive: true });
  await fs.writeFile(`${path}/env.d.ts`, source);
}
