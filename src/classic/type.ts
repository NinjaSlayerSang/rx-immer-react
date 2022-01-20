import type { ComponentClass, FunctionComponent } from 'react';

export type ReactComponent<P> = ComponentClass<P> | FunctionComponent<P>;
