import type { Objectish, RxImmer } from 'rx-immer';
import { Context, createElement, FunctionComponent } from 'react';

import type { ReactComponent } from './type';

export function injectInstanceWithContext<
  T extends Objectish,
  I extends string = 'instance'
>(
  context: Context<RxImmer<T>>,
  instancePropKey: I = 'instance' as I
): <P extends { [key in I]: RxImmer<T> }>(
  Wrapped: ReactComponent<P>
) => FunctionComponent<Omit<P, I>> {
  return function <P extends { [key in I]: RxImmer<T> }>(
    Wrapped
  ): FunctionComponent<Omit<P, I>> {
    return function (props) {
      const { children, ...rest } = props;

      return createElement(
        context.Consumer,
        undefined,
        (instance) =>
          instance &&
          createElement(
            Wrapped,
            { ...rest, [instancePropKey]: instance },
            children
          )
      );
    };
  };
}
