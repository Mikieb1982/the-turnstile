import { z } from 'zod';

export const GenerationPropSchema = z.object({
  name: z.string(),
  type: z.string().default('string'),
  description: z.string().optional()
});

export const CodeGenerationDetailsSchema = z.object({
  taskType: z.enum(['reactComponent', 'utilityFunction', 'plainText']).default('plainText'),
  fileName: z.string(),
  directory: z.string().default('src/agents'),
  description: z.string().optional(),
  componentName: z.string().optional(),
  props: z.array(GenerationPropSchema).optional(),
  content: z.string().optional()
});

export const WorkOrderSchema = z.object({
  agent: z.literal('CodeGeneratorAgent'),
  details: CodeGenerationDetailsSchema
});

export type CodeGenerationDetails = z.infer<typeof CodeGenerationDetailsSchema>;
export type WorkOrder = z.infer<typeof WorkOrderSchema>;
