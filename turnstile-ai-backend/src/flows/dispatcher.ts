import { z } from 'zod';
import { ai } from '../genkit.conf.js';
import { CodeGenerationDetailsSchema, WorkOrderSchema, type CodeGenerationDetails, type WorkOrder } from './schemas.js';

const reactComponentRegex = /create\s+(?:a\s+)?react component(?:\s+(?:named|called))?\s+([A-Za-z0-9]+)/i;
const fileNameRegex = /save(?:\s+it)?\s+as\s+([A-Za-z0-9_.\-/]+)/i;
const directoryRegex = /(?:in|inside|within|under)\s+([A-Za-z0-9_./-]+\/?)/i;
const propsRegex = /with\s+props?\s+([^\.]+)/i;

function normaliseDirectory(directory: string | undefined): string | undefined {
  if (!directory) {
    return undefined;
  }
  const trimmed = directory.trim().replace(/^[./]+/, '');
  return trimmed.length ? trimmed : undefined;
}

function parseProps(rawProps: string | undefined): CodeGenerationDetails['props'] {
  if (!rawProps) {
    return undefined;
  }

  const entries = rawProps
    .split(/[,;]/)
    .map((prop) => prop.trim())
    .filter(Boolean)
    .map((prop) => {
      const [namePart, typePart] = prop.split(/[:=]/).map((part) => part.trim());
      const name = namePart
        .replace(/[^A-Za-z0-9_]/g, '')
        .replace(/^(.)/, (match) => match.toLowerCase());
      const type = typePart && typePart.length ? typePart : 'string';
      if (!name) {
        return undefined;
      }
      return { name, type } as const;
    })
    .filter((value): value is { name: string; type: string } => Boolean(value));

  return entries.length ? entries : undefined;
}

function buildReactComponentDetails(command: string, componentName: string): CodeGenerationDetails {
  const details: CodeGenerationDetails = {
    taskType: 'reactComponent',
    componentName,
    fileName: `${componentName}.tsx`,
    directory: 'src/components/generated',
    description: `Auto-generated React component for ${componentName}`
  };

  const fileMatch = command.match(fileNameRegex);
  if (fileMatch?.[1]) {
    details.fileName = fileMatch[1].trim();
  }

  const directoryMatch = command.match(directoryRegex);
  const directory = normaliseDirectory(directoryMatch?.[1]);
  if (directory) {
    details.directory = directory;
  }

  const propsMatch = command.match(propsRegex);
  const props = parseProps(propsMatch?.[1]);
  if (props) {
    details.props = props;
  }

  details.description = command;
  return details;
}

function buildFallbackDetails(command: string): CodeGenerationDetails {
  const safeName = command
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'generated-task';

  return {
    taskType: 'plainText',
    fileName: `${safeName}.txt`,
    directory: 'generated',
    description: command,
    content: `# Task\n\n${command}\n`
  };
}

export const dispatcherFlow = ai.defineFlow(
  {
    name: 'dispatcherFlow',
    inputSchema: z.string(),
    outputSchema: WorkOrderSchema
  },
  async (rawCommand): Promise<WorkOrder> => {
    const command = rawCommand.trim();

    if (!command.length) {
      throw new Error('Command must be a non-empty string');
    }

    const reactMatch = command.match(reactComponentRegex);
    if (reactMatch?.[1]) {
      const componentName = reactMatch[1].replace(/[^A-Za-z0-9]/g, '');
      const details = CodeGenerationDetailsSchema.parse(
        buildReactComponentDetails(command, componentName)
      );
      return {
        agent: 'CodeGeneratorAgent',
        details
      };
    }

    const details = CodeGenerationDetailsSchema.parse(buildFallbackDetails(command));
    return {
      agent: 'CodeGeneratorAgent',
      details
    };
  }
);
