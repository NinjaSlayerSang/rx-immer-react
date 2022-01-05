import type { RxImmer } from 'rx-immer';

import type { RxImmerWithHooks } from './type';
import { injectUseBind } from './useBind';
import { injectUseQuery } from './useQuery';
import { injectUseTwoWayBind } from './useTwoWayBind';
import { injectUseDiachronySize } from './useDiachronySize';
import { injectUseRoamStatus } from './useRoamStatus';

export function injectHooks<T>(instance: RxImmer<T>): RxImmerWithHooks<T> {
  let injected: any = instance;

  injected = injectUseBind(injected);
  injected = injectUseQuery(injected);
  injected = injectUseTwoWayBind(injected);
  injected = injectUseRoamStatus(injected);
  injected = injectUseDiachronySize(injected);

  return injected;
}
