import { Immutable } from 'rx-immer';

import { useInstanceQuery } from '../hooks/use-query';

export interface QueryHooksPluginExt {
  useQuery<V = any>(path: string): Immutable<V[]>;
}

export default {
  name: 'query-hooks-plugin',
  generate(Cls) {
    return class extends Cls {
      useQuery(path) {
        return useInstanceQuery(this, path);
      }
    };
  },
};
