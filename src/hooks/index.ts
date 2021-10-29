import type { Config, DeepPartial, Objectish, RxImmer } from 'rx-immer';
import { createRxImmer } from 'rx-immer';
import { useEffect, useRef } from 'react';

import type { WithUseBind } from './useBind';
import type { WithUseRoamStatus } from './useRoamStatus';
import type { WithUseDiachronySize } from './useDiachronySize';
import { injectUseBind, useRxImmerBind } from './useBind';
import { injectUseRoamStatus } from './useRoamStatus';
import { injectUseDiachronySize } from './useDiachronySize';

export {
  useRxImmerBind,
  injectUseBind,
  injectUseRoamStatus,
  injectUseDiachronySize,
};

export type RxImmerWithHooks<T> = RxImmer<T> &
  WithUseBind<T> &
  Partial<WithUseRoamStatus> &
  Partial<WithUseDiachronySize>;

export function useRxImmer<T extends Objectish>(
  initial: T,
  config?: DeepPartial<Config>
): RxImmerWithHooks<T> {
  const ref = useRef<RxImmer<T>>();
  if (!ref.current) {
    ref.current = createRxImmer(initial, config);

    ref.current = injectUseBind(ref.current);
    if (ref.current.roamStatus$) {
      ref.current = injectUseRoamStatus(ref.current);
    }
    if (ref.current.size$) {
      ref.current = injectUseDiachronySize(ref.current);
    }
  }

  useEffect(() => {
    return () => {
      ref.current?.destroy();
    };
  }, []);

  return ref.current as RxImmerWithHooks<T>;
}
