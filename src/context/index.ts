import type { Objectish, Plugin } from 'rx-immer';
import {
  Context,
  createContext,
  createElement,
  ProviderExoticComponent,
  ProviderProps,
} from 'react';

import type { RxImmerReact } from '../type';
import { create } from '../create';

interface ConstantContext<S, R> extends Context<S> {
  Provider: ProviderExoticComponent<Omit<ProviderProps<S>, 'value'>>;
  Handler: R;
}

export function createRxImmerContext<
  T extends Objectish,
  E extends {} = {},
  R extends {} = {}
>(
  initial: T,
  handler?: (this: RxImmerReact<T, E>) => R,
  plugins: Plugin[] = []
): ConstantContext<RxImmerReact<T, E>, R> {
  const value = create<T, E>(initial, plugins);

  const context = createContext(value);

  const Provider: any = ({ children }) =>
    createElement(context.Provider, { value }, children);

  return {
    ...context,
    Provider,
    Handler: handler?.call(value) ?? ({} as R),
  };
}
