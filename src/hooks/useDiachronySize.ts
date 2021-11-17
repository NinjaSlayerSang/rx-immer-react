import { useEffect, useState } from 'react';

export interface WithUseDiachronySize {
  useDiachronySize(): number;
}

export function injectUseDiachronySize(instance) {
  if (instance.size$) {
    instance.useDiachronySize = function () {
      const [size, setSize] = useState(this.size$?.getValue());

      useEffect(() => {
        const subscription = this.size$.subscribe(setSize);
        return () => {
          subscription.unsubscribe();
        };
      }, [this]);

      return size;
    };
  }
  return instance;
}
