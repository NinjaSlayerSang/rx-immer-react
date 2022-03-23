import { create, Objectish, Plugin, RxImmer } from 'rx-immer';
import {
  Context,
  createContext,
  createElement,
  ProviderExoticComponent,
  ProviderProps,
} from 'react';

import { presetReactPlugin, PresetReactPluginsExt } from '../plugins/const';

interface ConstantContext<T> extends Context<T> {
  Provider: ProviderExoticComponent<Omit<ProviderProps<T>, 'value'>>;
}

export function createRxImmerContext<
  T extends Objectish,
  E extends {} = {},
  R extends {} = {}
>(
  initial: T,
  handler?: (this: RxImmer<T>) => R,
  plugins: Plugin[] = []
): ConstantContext<RxImmer<T, PresetReactPluginsExt<T> & E>> & {
  Handler: R;
} {
  const rxImmer = create<T, PresetReactPluginsExt<T> & E>(
    initial,
    presetReactPlugin.concat(plugins)
  );

  const context = createContext(rxImmer);

  const Provider: any = ({ children }) =>
    createElement(context.Provider, { value: rxImmer }, children);

  return {
    ...context,
    Provider,
    Handler: handler?.call(rxImmer) ?? ({} as R),
  };
}
