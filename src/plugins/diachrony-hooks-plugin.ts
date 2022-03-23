import { useEffect, useState } from 'react';

export interface DiachronyHooksPluginExt {
  useDiachronySize(): number;
}

export default {
  name: 'diachrony-hooks-plugin',
  generate(Cls) {
    return class extends Cls {
      useDiachronySize() {
        const [size, setSize] = useState(this.size$?.getValue());

        useEffect(() => {
          const subscription = this.size$.subscribe(setSize);
          return () => {
            subscription.unsubscribe();
          };
        }, [this]);

        return size;
      }
    };
  },
};
