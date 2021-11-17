import { useEffect, useState } from 'react';

export interface WithUseRoamStatus {
  useRoamStatus(): [number, number];
}

export function injectUseRoamStatus(instance) {
  if (instance.roamStatus$) {
    instance.useRoamStatus = function () {
      const [roamStatus, setRoamStatus] = useState(this.roamStatus$.getValue());

      useEffect(() => {
        const subscription = this.roamStatus$.subscribe(setRoamStatus);
        return () => {
          subscription.unsubscribe();
        };
      }, [this]);

      return roamStatus;
    };
  }
  return instance;
}
