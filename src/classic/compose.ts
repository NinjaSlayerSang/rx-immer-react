import type { Objectish, Path, RxImmer } from 'rx-immer';
import { Component, ComponentClass, createElement } from 'react';

import type { ReactComponent } from './type';

export function compose<
  K extends string = 'data',
  I extends string = 'instance'
>(
  observe: Record<string, Path> = {},
  query: Record<string, string> = {},
  injectedPropKey: K = 'data' as K,
  instancePropKey: I = 'instance' as I
): <T extends Objectish, P extends { [key in I]: RxImmer<T> }>(
  Wrapped: ReactComponent<P>
) => ComponentClass<Omit<P, K>> {
  return function <T extends Objectish, P extends { [key in I]: RxImmer<T> }>(
    Wrapped
  ): ComponentClass<Omit<P, K>> {
    return class extends Component<P> {
      private disposeBag: (() => void)[] = [];

      constructor(props) {
        super(props);

        this.state = {
          ...Object.entries(observe).reduce(
            (state, [key, path]) => ({
              ...state,
              [key]: this.props[instancePropKey].value(path),
            }),
            {}
          ),
          ...Object.entries(query).reduce(
            (state, [key, path]) => ({
              ...state,
              [key]: this.props[instancePropKey].find(path),
            }),
            {}
          ),
        };
      }

      componentDidMount() {
        this.disposeBag = [
          ...Object.entries(observe).map(([key, path]) => {
            const subscription = this.props[instancePropKey]
              .observe(path)
              .subscribe((value) => {
                this.setState({ [key]: value });
              });
            return () => {
              subscription.unsubscribe();
            };
          }),
          ...Object.entries(query).map(([key, path]) => {
            const subscription = this.props[instancePropKey]
              .query(path)
              .subscribe((value) => {
                this.setState({ [key]: value });
              });
            return () => {
              subscription.unsubscribe();
            };
          }),
        ];
      }

      componentWillUnmount() {
        this.disposeBag.forEach((f) => {
          f();
        });

        this.disposeBag = [];
      }

      render() {
        const { children, ...rest } = this.props;

        return createElement(
          Wrapped,
          { ...rest, [injectedPropKey]: this.state },
          children
        );
      }
    };
  };
}
