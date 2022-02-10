import type { Objectish, RxImmer } from 'rx-immer';
import type { ComponentClass, FunctionComponent } from 'react';

export type ReactComponent<P> = ComponentClass<P> | FunctionComponent<P>;

export interface ComposedProps<
  T extends Objectish = any,
  D extends Record<string, any> = Record<string, any>
> {
  instance: RxImmer<T>;
  data: D;
}
