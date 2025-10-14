import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { ai } from '../genkit.conf.js';
import { CodeGenerationDetailsSchema, type CodeGenerationDetails } from './schemas.js';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.env.PROJECT_ROOT
  ? path.resolve(process.env.PROJECT_ROOT)
  : path.resolve(moduleDir, '../../..');

function ensureSafePath(targetPath: string): void {
  const relative = path.relative(projectRoot, targetPath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Attempted to write outside of the project directory');
  }
}

function deriveComponentName(details: CodeGenerationDetails): string {
  if (details.componentName) {
    return details.componentName;
  }
  const withoutExt = details.fileName.replace(/\.[^.]+$/, '');
  const parts = withoutExt
    .split(/[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return parts.join('') || 'GeneratedComponent';
}

function createReactComponent(details: CodeGenerationDetails): string {
  const componentName = deriveComponentName(details);
  const propsInterfaceName = `${componentName}Props`;
  const props = details.props ?? [];

  const interfaceBody = props
    .map((prop) => `  ${prop.name}: ${prop.type};${prop.description ? ` // ${prop.description}` : ''}`)
    .join('\n');

  const propsInterface = props.length
    ? `export interface ${propsInterfaceName} {\n${interfaceBody}\n}\n\n`
    : '';

  const destructuredProps = props.length ? `{ ${props.map((prop) => prop.name).join(', ')} }` : 'props';
  const descriptionComment = details.description ? `// ${details.description}\n` : '';

  return (
    `${descriptionComment}import React from 'react';\n\n${propsInterface}export const ${componentName}: React.FC<${
      props.length ? propsInterfaceName : 'Record<string, unknown>'
    }> = (${destructuredProps}) => {\n  return (\n    <div className="generated-component">\n      <h2>${componentName}</h2>\n      <p>Replace this markup with your own implementation.</p>\n    </div>\n  );\n};\n`
  );
}

function createUtilityModule(details: CodeGenerationDetails): string {
  const functionName = details.fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[^A-Za-z0-9]+(.)?/g, (_, chr: string) => (chr ? chr.toUpperCase() : '')) || 'generatedUtility';

  const descriptionComment = details.description ? `// ${details.description}\n` : '';

  return `${descriptionComment}export function ${functionName}() {\n  // TODO: Implement this utility generated from the dispatcher flow.\n  return null;\n}\n`;
}

function createPlainText(details: CodeGenerationDetails): string {
  if (details.content) {
    return details.content;
  }
  return `# Generated Task\n\n${details.description ?? ''}\n`;
}

function buildFileContents(details: CodeGenerationDetails): string {
  switch (details.taskType) {
    case 'reactComponent':
      return createReactComponent(details);
    case 'utilityFunction':
      return createUtilityModule(details);
    case 'plainText':
    default:
      return createPlainText(details);
  }
}

const CodeGenerationResultSchema = CodeGenerationDetailsSchema.extend({
  status: z.literal('success'),
  filePath: z.string()
});

export const codeGeneratorFlow = ai.defineFlow(
  {
    name: 'codeGeneratorFlow',
    inputSchema: CodeGenerationDetailsSchema,
    outputSchema: CodeGenerationResultSchema
  },
  async (input) => {
    const details = CodeGenerationDetailsSchema.parse(input);

    if (details.fileName.includes('..')) {
      throw new Error('fileName cannot contain parent directory references');
    }

    const directory = path.resolve(projectRoot, details.directory ?? '.');
    const filePath = path.resolve(directory, details.fileName);

    ensureSafePath(directory);
    ensureSafePath(filePath);

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const fileContents = buildFileContents(details);
    await fs.writeFile(filePath, fileContents, 'utf8');

    const relativePath = path.relative(projectRoot, filePath);

    return CodeGenerationResultSchema.parse({
      ...details,
      status: 'success' as const,
      filePath: relativePath
    });
  }
);
