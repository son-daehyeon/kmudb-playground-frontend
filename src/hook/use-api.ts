import { ReactNode, useState } from 'react';

import { ExternalToast, toast } from 'sonner';

type PromiseData = Omit<ExternalToast, 'description'> & {
  loading: string;
  success: string | ReactNode;
  finally?: () => void | Promise<void>;
};

export function useApi(): [
  boolean,
  (func: () => Promise<unknown>, catchError?: boolean) => void,
  manual: (value: boolean) => void,
] {
  const [isPending, setPending] = useState(false);

  async function start(func: () => Promise<unknown>, catchError: boolean = true) {
    setPending(true);
    if (catchError) {
      func()
        .catch((e) => e.message !== 'Failed to fetch' && toast.error(e.message))
        .finally(() => setPending(false));
    } else {
      func().finally(() => setPending(false));
    }
  }

  return [isPending, start, setPending];
}

export function useApiWithToast(): [
  boolean,
  (func: () => Promise<unknown>, data: PromiseData) => void,
  manual: (value: boolean) => void,
] {
  const [isPending, setPending] = useState(false);

  async function start(func: () => Promise<unknown>, data: PromiseData) {
    setPending(true);
    toast
      .promise(func, {
        error: (e) => e.message,
        ...data,
      })
      .unwrap()
      .finally(() => setPending(false));
  }

  return [isPending, start, setPending];
}
