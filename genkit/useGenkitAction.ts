import { useCallback, useMemo, useRef, useState } from 'react';
import type { GenkitHttpMethod, GenkitActionRequest, GenkitActionResult } from './client';
import { invokeGenkitAction } from './client';

export type GenkitActionStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseGenkitActionOptions<TInput, TData> {
  /**
   * Defaults to `POST`. Set to `GET` for read-only actions.
   */
  method?: GenkitHttpMethod;
  /** Input used when `run` is called without overriding arguments. */
  defaultInput?: TInput;
  /**
   * Optional transform that runs before the response is stored. Useful for
   * normalising structured Genkit responses.
   */
  transform?: (data: unknown) => TData;
}

export interface UseGenkitActionState<TData> {
  status: GenkitActionStatus;
  data?: TData;
  error?: string;
  lastUpdatedAt?: number;
  requestId: number;
}

export interface UseGenkitAction<TInput, TData> extends UseGenkitActionState<TData> {
  run: (input?: TInput) => Promise<GenkitActionResult<TData>>;
  reset: () => void;
}

const defaultTransform = <TData,>(value: unknown): TData => value as TData;

export const useGenkitAction = <TInput = unknown, TData = unknown>(
  action: GenkitActionRequest['action'],
  options: UseGenkitActionOptions<TInput, TData> = {}
): UseGenkitAction<TInput, TData> => {
  const { method = 'POST', defaultInput, transform = defaultTransform<TData> } = options;
  const [state, setState] = useState<UseGenkitActionState<TData>>({
    status: 'idle',
    requestId: 0,
  });
  const abortController = useRef<AbortController | null>(null);

  const run = useCallback(
    async (inputOverride?: TInput) => {
      abortController.current?.abort();
      const controller = new AbortController();
      abortController.current = controller;
      const requestId = state.requestId + 1;
      setState({ status: 'loading', requestId });

      const result = await invokeGenkitAction<TData, TInput>({
        action,
        method,
        input: inputOverride ?? defaultInput,
        signal: controller.signal,
      });

      if (controller.signal.aborted) {
        return result;
      }

      if (result.ok) {
        setState({
          status: 'success',
          data: transform(result.data),
          requestId,
          lastUpdatedAt: Date.now(),
        });
      } else {
        setState({
          status: 'error',
          error: result.error,
          requestId,
          lastUpdatedAt: Date.now(),
        });
      }

      return result;
    },
    [action, method, defaultInput, transform, state.requestId]
  );

  const reset = useCallback(() => {
    abortController.current?.abort();
    abortController.current = null;
    setState({ status: 'idle', requestId: 0 });
  }, []);

  return useMemo(
    () => ({
      ...state,
      run,
      reset,
    }),
    [state, run, reset]
  );
};
