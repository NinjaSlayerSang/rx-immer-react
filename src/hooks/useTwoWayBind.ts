import { assemblePath, Immutable, nothing, Path } from 'rx-immer';
import { Dispatch, useCallback } from 'react';

import { useInstanceBind } from './useBind';

type SetStateAction<S> = S | ((prevState: Immutable<S>) => S);
type StateActionTuple<S> = [Immutable<S>, Dispatch<SetStateAction<S>>];

export interface WithUseTwoWayBind<T> {
  useTwoWayBind(): StateActionTuple<T>;
  useTwoWayBind<V = any>(listenPath: Path): StateActionTuple<V>;
}

export function useInstanceTwoWayBind(instance, listenPath) {
  const value = useInstanceBind(instance, listenPath);

  const setValue = useCallback(
    (action) => {
      instance.commit(
        (wrapper) =>
          typeof action === 'function'
            ? action(wrapper)
            : action === undefined
            ? nothing
            : action,
        listenPath
      );
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
