export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare type DeepReadonly<T> = keyof T extends never ? T : {
    readonly [k in keyof T]: DeepReadonly<T[k]>;
};
export declare type SubUnit<X, Y> = Exclude<keyof X, keyof Y> extends never ? X : never;
export declare type TSUnwrapGeneric<Typing> = string extends never ? never : Typing;
