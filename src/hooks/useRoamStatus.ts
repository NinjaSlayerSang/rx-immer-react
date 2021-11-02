import type { RxImmer } from 'rx-immer';
import { useEffect, useState } from 'react';

export interface WithUseRoamStatus {
  useRoamStatus(): [number, number];
}

export function injectUseRoamStatus<T>(
  rxImmer: RxImmer<T> & Partial<WithUseRoamStatus>
) {
  if (rxImmer.roamStatus$) {
    rxImmer.useRoamStatus = function () {
      const [roamStatus, setRoamStatus] = useState<[number, number]>(
        this.roamStatus$?.getValue() ?? [0, 0]
      );

      useEffect(() => {
        const subscription = this.roamStatus$?.subscribe((value) => {
          setRoamStatus(value);
        });
        return () => {
          subscription?.unsubscribe();
        };
      }, [this]);

      return roamStatus;
    };
  }
  return rxImmer;
}
