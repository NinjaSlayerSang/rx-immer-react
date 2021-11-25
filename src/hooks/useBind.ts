import { assemblePath, Immutable, Path } from 'rx-immer';
import { useEffect, useState } from 'react';
import { get } from 'lodash';

export interface WithUseBind<T> {
  useBind(): Immutable<T>;
  useBind<V = any>(listenPath: Path): Immutable<V>;
}

export function useInstanceBind(instance, listenPath) {
  const [value, setValue] = useState(
    listenPath === undefined
      ? instance.value()
      : get(instance.value(), listenPath)
  );

  useEffect(() => {
    const subscription = instance.observe(listenPath).subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [instance, assemblePath(listenPath)]);

  return value;
}

export function injectUseBind(instance) {
  instance.useBind = function (listenPath) {
    return useInstanceBind(this, listenPath);
  };
  return instance;
}
