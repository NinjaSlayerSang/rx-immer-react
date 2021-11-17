import { Config, create, DeepPartial, Objectish } from 'rx-immer';
import { useEffect, useRef } from 'react';

import type { RxImmerWithHooks } from './type';
import { injectHooks } from './inject';

export function useRxImmer<T extends Objectish>(
  initial: T,
  config?: DeepPartial<Config>
): RxImmerWithHooks<T> {
  const ref = useRef<any>();
  if (!ref.current) {
    ref.current = create(initial, config);

    ref.current = injectHooks(ref.current);
  }

  useEffect(() => {
    return () => {
      ref.current?.destroy();
    };
  }, []);

  return ref.current;
}
