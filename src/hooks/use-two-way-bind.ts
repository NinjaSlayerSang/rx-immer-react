import { assemblePath, nothing } from 'rx-immer';
import { useCallback } from 'react';

import { useInstanceBind } from './use-bind';

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
