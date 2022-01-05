import type { Immutable } from 'rx-immer';
import { useEffect, useState } from 'react';

export interface WithUseQuery {
  useQuery<V = any>(path: string): Immutable<V[]>;
}

export function useInstanceQuery(instance, path) {
  const [value, setValue] = useState(instance.find(path));

  useEffect(() => {
    const subscription = instance.query(path).subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [instance, path]);

  return value;
}

export function injectUseQuery(instance) {
  instance.useQuery = function (path) {
    return useInstanceQuery(this, path);
  };
  return instance;
}
