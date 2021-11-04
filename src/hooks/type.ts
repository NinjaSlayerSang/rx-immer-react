import { RxImmer } from 'rx-immer';

import { WithUseBind } from './useBind';
import { WithUseTwoWayBind } from './useTwoWayBind';
import { WithUseDiachronySize } from './useDiachronySize';
import { WithUseRoamStatus } from './useRoamStatus';

export type RxImmerWithHooks<T> = RxImmer<T> &
  WithUseBind<T> &
  WithUseTwoWayBind &
  Partial<WithUseRoamStatus> &
  Partial<WithUseDiachronySize>;
