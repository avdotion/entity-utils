export type UnionToIntersection<U> =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type DeepReadonly<T> = keyof T extends never
    ? T
    : { readonly [k in keyof T]: DeepReadonly<T[k]> };

export type SubUnit<X, Y> = Exclude<keyof X, keyof Y> extends never ? X : never;

export type TSUnwrapGeneric<Typing> = string extends never ? never : Typing;
