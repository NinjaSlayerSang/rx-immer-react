import { Config, createRxImmer, Objectish } from 'rx-immer';
import { createContext } from 'react';

import { injectHooks, RxImmerWithHooks } from '../hooks';

export function createRxImmerContext<T extends Objectish>(
  initial: T,
  config?: Config
) {
  let rxImmer = createRxImmer<T>(initial, config);

  rxImmer = injectHooks(rxImmer);

  return createContext(rxImmer as RxImmerWithHooks<T>);
}
