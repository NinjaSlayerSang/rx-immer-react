import type { Objectish, RxImmer } from 'rx-immer';
import type { ReactPluginsExt } from './plugins/const';

export type RxImmerReact<
  T extends Objectish = any,
  E extends {} = {}
> = RxImmer<T, ReactPluginsExt<T> & E>;
