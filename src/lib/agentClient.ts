const DEFAULT_API_BASE = 'http://localhost:3001';

const API_BASE_URL = import.meta.env.VITE_AGENT_API_URL ?? DEFAULT_API_BASE;

export interface DispatchResult {
  workOrder: {
    agent: string;
    details: {
      taskType: string;
      fileName: string;
      directory?: string;
      description?: string;
      componentName?: string;
      props?: Array<{ name: string; type: string; description?: string }>;
      content?: string;
    };
  };
  result: {
    status: string;
    filePath: string;
    [key: string]: unknown;
  };
}

export async function dispatchAgentCommand(command: string): Promise<DispatchResult> {
  const response = await fetch(`${API_BASE_URL}/api/dispatch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage = typeof errorBody.error === 'string' ? errorBody.error : 'Unable to dispatch command.';
    throw new Error(errorMessage);
  }

  return response.json();
}
