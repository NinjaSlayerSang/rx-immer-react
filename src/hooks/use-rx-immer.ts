import type { Objectish, Plugin } from 'rx-immer';
import { useEffect, useRef } from 'react';

import type { RxImmerReact } from '../type';
import { create } from '../create';

export function useRxImmer<T extends Objectish, E extends {} = {}>(
  initial: T,
  plugins: Plugin[] = []
): RxImmerReact<T, E> {
  const ref = useRef<RxImmerReact<T, E>>();
  if (!ref.current) {
    ref.current = create<T, E>(initial, plugins);
  }

  useEffect(() => {
    return () => {
      ref.current?.destroy();
    };
  }, []);

  return ref.current;
}
