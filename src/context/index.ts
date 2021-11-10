import { Config, create, DeepPartial, Objectish } from 'rx-immer';
import { createContext } from 'react';

import { injectHooks, RxImmerWithHooks } from '../hooks';

export function createRxImmerContext<T extends Objectish>(
  initial: T,
  config?: DeepPartial<Config>
) {
  let rxImmer = create<T>(initial, config);

  rxImmer = injectHooks(rxImmer);

  return createContext(rxImmer as RxImmerWithHooks<T>);
}
