import type { RxImmer } from 'rx-immer';

import type { RxImmerWithHooks } from './type';
import { injectUseBind } from './useBind';
import { injectUseTwoWayBind } from './useTwoWayBind';
import { injectUseDiachronySize } from './useDiachronySize';
import { injectUseRoamStatus } from './useRoamStatus';

export function injectHooks<T>(instance: RxImmer<T>) {
  let injected = instance;

  injected = injectUseBind(injected);
  injected = injectUseTwoWayBind(injected);
  injected = injectUseRoamStatus(injected);
  injected = injectUseDiachronySize(injected);

  return injected as RxImmerWithHooks<T>;
}
