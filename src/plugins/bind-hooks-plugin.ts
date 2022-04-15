import type { Immutable, Path } from 'rx-immer';
import type { Dispatch } from 'react';

import { useInstanceBind } from '../hooks/use-bind';
import { useInstanceTwoWayBind } from '../hooks/use-two-way-bind';

type SetStateAction<S> = S | ((prevState: Immutable<S>) => S);
type StateActionTuple<S> = [Immutable<S>, Dispatch<SetStateAction<S>>];

export interface BindHooksPluginExt {
  useBind<V = any>(listenPath?: Path): Immutable<V>;

  useTwoWayBind<V = any>(listenPath?: Path): StateActionTuple<V>;
}

export default {
  name: 'bind-hooks-plugin',
  generate(Cls) {
    return class extends Cls {
      useBind(listenPath) {
        return useInstanceBind(this, listenPath);
      }

      useTwoWayBind(listenPath) {
        return useInstanceTwoWayBind(this, listenPath);
      }
    };
  },
};
