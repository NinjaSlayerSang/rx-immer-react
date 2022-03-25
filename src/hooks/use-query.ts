import { useEffect, useState } from 'react';

export function useInstanceQuery(instance, path) {
  const [value, setValue] = useState(instance.find(path));

  useEffect(() => {
    const subscription = instance.query(path).subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [instance, path]);

  return value;
}
