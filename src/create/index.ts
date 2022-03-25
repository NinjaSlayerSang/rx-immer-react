import { create as protoCreate, Objectish, Plugin } from 'rx-immer';

import type { RxImmerReact } from './../type';
import { reactPlugins, ReactPluginsExt } from '../plugins/const';

export function create<T extends Objectish, E extends {} = {}>(
  initial: T,
  plugins: Plugin[] = []
): RxImmerReact<T, E> {
  return protoCreate<T, ReactPluginsExt<T> & E>(
    initial,
    reactPlugins.concat(plugins)
  );
}
