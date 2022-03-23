import { create, Objectish, Plugin, RxImmer } from 'rx-immer';
import { useEffect, useRef } from 'react';

import { presetReactPlugin, PresetReactPluginsExt } from '../plugins/const';

export function useRxImmer<T extends Objectish, E extends {} = {}>(
  initial: T,
  plugins: Plugin[] = []
): RxImmer<T, PresetReactPluginsExt<T> & E> {
  const ref = useRef<any>();
  if (!ref.current) {
    ref.current = create(initial, presetReactPlugin.concat(plugins));
  }

  useEffect(() => {
    return () => {
      ref.current?.destroy();
    };
  }, []);

  return ref.current;
}
