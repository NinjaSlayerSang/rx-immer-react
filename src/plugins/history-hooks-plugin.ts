import { useEffect, useState } from 'react';

export interface HistoryHooksPluginExt {
  useRoamStatus(): [number, number];
}

export default {
  name: 'history-hooks-plugin',
  generate(Cls) {
    return class extends Cls {
      useRoamStatus() {
        const [roamStatus, setRoamStatus] = useState(
          this.roamStatus$.getValue()
        );

        useEffect(() => {
          const subscription = this.roamStatus$.subscribe(setRoamStatus);
          return () => {
            subscription.unsubscribe();
          };
        }, [this]);

        return roamStatus;
      }
    };
  },
};
