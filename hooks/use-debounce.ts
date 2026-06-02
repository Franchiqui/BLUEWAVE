import { useEffect, useState } from 'react';

interface UseDebounceOptions {
  delay?: number;
  leading?: boolean;
}

export function useDebounce<T>(value: T, options: UseDebounceOptions = {}): T {
  const { delay = 300, leading = false } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLeading, setIsLeading] = useState<boolean>(false);

  useEffect(() => {
    if (leading && !isLeading) {
      setDebouncedValue(value);
      setIsLeading(true);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsLeading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, leading, isLeading]);

  return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  options: UseDebounceOptions = {}
): (...args: Parameters<T>) => void {
  const { delay = 300, leading = false } = options;
  const [lastCall, setLastCall] = useState<number>(0);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (leading && now - lastCall >= delay) {
      callback(...args);
      setLastCall(now);
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      callback(...args);
      setLastCall(Date.now());
    }, delay);

    setTimer(newTimer);
  };
}

export function useDebouncedEffect(
  effect: () => void | (() => void),
  deps: unknown[],
  options: UseDebounceOptions = {}
): void {
  const { delay = 300 } = options;
  const [debouncedDeps] = useDebounce(deps, { delay });

  useEffect(() => {
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDeps]);
}