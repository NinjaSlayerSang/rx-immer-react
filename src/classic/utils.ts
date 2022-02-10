// Because of the situation that TSDX haven't supported Typescript@4.x and some essential new features
// for generic type programming, that is, getting the last infered type from a generic tuple:
// 'semantic error TS1256: A rest element must be last in a tuple type.'
// the utility function 'compose' will not be included in the module but be remained in sources.

type AnyUnaryFunction = (p: any) => any;

type FirstFunctionParameterType<T extends AnyUnaryFunction[]> = T extends [
  (p: infer P) => any,
  ...unknown[]
]
  ? P
  : never;

type LastFunctionReturnType<T extends AnyUnaryFunction[]> = T extends [
  ...unknown[],
  (p: any) => infer R
]
  ? R
  : never;

export function compose<T extends AnyUnaryFunction[]>(
  ...fns: T
): (p: FirstFunctionParameterType<T>) => LastFunctionReturnType<T> {
  return fns.reduce(
    (p, c) => (v) => c(p(v)),
    (v) => v
  );
}
