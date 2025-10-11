import { buildGenkitUrl } from './config';

export type GenkitHttpMethod = 'GET' | 'POST';

export interface GenkitActionRequest<TInput = unknown> {
  /**
   * Path segment of the action endpoint. "actions/score" resolves to
   * `${baseUrl}/actions/score`.
   */
  action: string;
  /** Optional payload sent under the `input` key to match the Genkit REST API. */
  input?: TInput;
  /**
   * Defaults to `POST` because most actions expect a JSON body. `GET` is
   * supported for read-only actions that have been exposed that way.
   */
  method?: GenkitHttpMethod;
  /** Overrides the base URL for advanced setups. */
  baseUrl?: string;
  /** Provide an AbortSignal to cancel an in-flight request when switching actions. */
  signal?: AbortSignal;
  /** Merge additional headers with the defaults. */
  headers?: Record<string, string>;
}

export interface GenkitActionSuccess<TResponse> {
  ok: true;
  status: number;
  data: TResponse;
  raw: unknown;
}

export interface GenkitActionFailure {
  ok: false;
  status: number;
  error: string;
  raw: unknown;
}

export type GenkitActionResult<TResponse> =
  | GenkitActionSuccess<TResponse>
  | GenkitActionFailure;

const parseResponsePayload = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      console.warn('Failed to parse JSON response from Genkit action.', error);
      return null;
    }
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const normaliseSuccessPayload = <TResponse,>(payload: unknown): TResponse => {
  if (payload && typeof payload === 'object' && 'output' in (payload as Record<string, unknown>)) {
    return (payload as Record<string, unknown>).output as TResponse;
  }

  if (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>)) {
    return (payload as Record<string, unknown>).data as TResponse;
  }

  return payload as TResponse;
};

const extractErrorMessage = (payload: unknown, fallback: string): string => {
  if (typeof payload === 'string' && payload.trim().length > 0) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const candidates = ['error', 'message', 'detail'];
    for (const key of candidates) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }
  }

  return fallback;
};

export const invokeGenkitAction = async <TResponse, TInput = unknown>(
  request: GenkitActionRequest<TInput>
): Promise<GenkitActionResult<TResponse>> => {
  const { action, method = 'POST', input, baseUrl, signal, headers } = request;
  const targetUrl = `${(baseUrl ?? buildGenkitUrl(action)).replace(/\/$/, '')}`;

  const response = await fetch(targetUrl, {
    method,
    signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain;q=0.8, */*;q=0.5',
      ...headers,
    },
    body: method === 'GET' ? undefined : JSON.stringify({ input }),
  });

  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: extractErrorMessage(payload, 'Failed to execute Genkit action'),
      raw: payload,
    } satisfies GenkitActionFailure;
  }

  return {
    ok: true,
    status: response.status,
    data: normaliseSuccessPayload<TResponse>(payload),
    raw: payload,
  } satisfies GenkitActionSuccess<TResponse>;
};
