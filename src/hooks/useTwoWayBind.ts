import type { Immutable, Path, RxImmer } from 'rx-immer';
import { Dispatch, useCallback } from 'react';
import { get, toPath } from 'lodash';

import { useRxImmerBind } from './useBind';

type SetStateAction<S> = S | ((prevState: Immutable<S> | undefined) => S);

function isReducer<S>(
  action: SetStateAction<S>
): action is (prevState: Immutable<S> | undefined) => S {
  return typeof action === 'function';
}

export function useRxImmerTwoWayBind<T, V = any>(
  rxImmer: RxImmer<T>,
  listenPath: Path
): [Immutable<V> | undefined, Dispatch<SetStateAction<V>>] {
  const value = useRxImmerBind<T, V>(rxImmer, listenPath);

  const setValue = useCallback<Dispatch<SetStateAction<V>>>(
    (a) => {
      const paths = toPath(listenPath);
      if (paths.length) {
        const v = isReducer(a) ? a(get(rxImmer.value(), paths)) : a;
        const target = paths.pop();
        rxImmer.commit((draft) => {
          draft[target] = v;
        }, paths);
      }
    },
    [rxImmer, toPath(listenPath).join()]
  );

  return [value, setValue];
}

export interface WithUseTwoWayBind {
  useTwoWayBind<V = any>(
    listenPath: Path
  ): [Immutable<V> | undefined, Dispatch<SetStateAction<V>>];
}

export function injectUseTwoWayBind<T>(
  rxImmer: RxImmer<T> & Partial<WithUseTwoWayBind>
) {
  rxImmer.useTwoWayBind = function (listenPath: Path) {
    return useRxImmerTwoWayBind(this, listenPath);
  };
  return rxImmer as RxImmer<T> & WithUseTwoWayBind;
}
