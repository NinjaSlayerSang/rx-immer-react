import { assemblePath } from 'rx-immer';
import { useEffect, useState } from 'react';

export function useInstanceBind(instance, listenPath) {
  const [value, setValue] = useState(instance.value(listenPath));

  useEffect(() => {
    const subscription = instance.observe(listenPath).subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [instance, assemblePath(listenPath)]);

  return value;
}
