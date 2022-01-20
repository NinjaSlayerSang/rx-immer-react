import { Config, create, DeepPartial, Objectish } from 'rx-immer';
import {
  Context,
  createContext,
  createElement,
  ProviderExoticComponent,
  ProviderProps,
} from 'react';

import { injectHooks, RxImmerWithHooks } from '../hooks';

interface WithInitialize<T, R = any> {
  init: (this: RxImmerWithHooks<T>) => R;
}

interface WithInitializedHandler<R> {
  Handler: R;
}

interface ConstantContext<T> extends Context<T> {
  Provider: ProviderExoticComponent<Omit<ProviderProps<T>, 'value'>>;
}

export function createRxImmerContext<T extends Objectish>(
  initial: T,
  config?: DeepPartial<Config>
): ConstantContext<RxImmerWithHooks<T>>;

export function createRxImmerContext<T extends Objectish, R = any>(
  initial: T,
  config?: DeepPartial<Config> & WithInitialize<T, R>
): ConstantContext<RxImmerWithHooks<T>> & WithInitializedHandler<R>;

export function createRxImmerContext<T, R>(
  initial: T,
  config?: DeepPartial<Config> & Partial<WithInitialize<T, R>>
) {
  const rxImmer = injectHooks(create<T>(initial, config));

  const context = createContext(rxImmer);

  const Provider: any = ({ children }) =>
    createElement(context.Provider, { value: rxImmer }, children);

  return {
    ...context,
    Provider,
    Handler: config?.init?.call(rxImmer),
  };
}
