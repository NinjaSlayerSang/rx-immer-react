import type { Plugin } from 'rx-immer';

import {
  bindHooksPlugin,
  BindHooksPluginExt,
  queryHooksPlugin,
  QueryHooksPluginExt,
} from '.';

export type ReactPluginsExt = BindHooksPluginExt & QueryHooksPluginExt;

export const reactPlugins: Plugin[] = [bindHooksPlugin, queryHooksPlugin];
