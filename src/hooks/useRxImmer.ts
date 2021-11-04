import { Config, create, DeepPartial, Objectish, RxImmer } from 'rx-immer';
import { useEffect, useRef } from 'react';

import type { RxImmerWithHooks } from './type';
import { injectHooks } from './inject';

export function useRxImmer<T extends Objectish>(
  initial: T,
  config?: DeepPartial<Config>
) {
  const ref = useRef<RxImmer<T>>();
  if (!ref.current) {
    ref.current = create(initial, config);

    ref.current = injectHooks(ref.current);
  }

  useEffect(() => {
    return () => {
      ref.current?.destroy();
    };
  }, []);

  return ref.current as RxImmerWithHooks<T>;
}
