import type { Plugin } from 'rx-immer';

import {
  bindHooksPlugin,
  BindHooksPluginExt,
  queryHooksPlugin,
  QueryHooksPluginExt,
} from '.';

export type PresetReactPluginsExt<T> = BindHooksPluginExt<T> &
  QueryHooksPluginExt;

export const presetReactPlugin: Plugin[] = [bindHooksPlugin, queryHooksPlugin];
