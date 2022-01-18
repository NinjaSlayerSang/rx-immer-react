import type { Path, Plain } from 'rx-immer';

import { WithUseBind } from './useBind';
import { WithUseQuery } from './useQuery';
import { WithUseTwoWayBind } from './useTwoWayBind';
import { WithUseDiachronySize } from './useDiachronySize';
import { WithUseRoamStatus } from './useRoamStatus';

export type PlainWithHooks<T> = Plain<T> &
  WithUseBind<T> &
  WithUseQuery &
  WithUseTwoWayBind<T> &
  Partial<WithUseRoamStatus> &
  Partial<WithUseDiachronySize>;

type Sub<C, S = void, R = C> = {
  sub<T = any>(relativePath: Path): Sub<PlainWithHooks<T>, Sub<C, S, R>, R>;

  sup(): S;

  root(): Sub<R>;
} & C;

export type RxImmerWithHooks<T> = Sub<PlainWithHooks<T>>;
