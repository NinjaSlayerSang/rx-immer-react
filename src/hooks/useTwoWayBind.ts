import { assemblePath, Immutable, Path } from 'rx-immer';
import { Dispatch, useCallback } from 'react';

import { useInstanceBind } from './useBind';

type SetStateAction<S> = S | ((prevState: Immutable<S>) => S);

export interface WithUseTwoWayBind {
  useTwoWayBind<V = any>(
    listenPath: Path
  ): [Immutable<V>, Dispatch<SetStateAction<V>>];
}

export function useInstanceTwoWayBind(instance, listenPath) {
  const value = useInstanceBind(instance, listenPath);

  const setValue = useCallback(
    (action) => {
      instance.commitValue((wrapper) => {
        wrapper.value =
          typeof action === 'function' ? action(wrapper.value) : action;
      }, listenPath);
    },
    [instance, assemblePath(listenPath)]
  );

  return [value, setValue];
}

export function injectUseTwoWayBind(instance) {
  instance.useTwoWayBind = function (listenPath) {
    return useInstanceTwoWayBind(this, listenPath);
  };
  return instance;
}
