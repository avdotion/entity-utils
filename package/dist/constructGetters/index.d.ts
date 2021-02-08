export declare const constructGetters: <E extends {
    readonly id: string;
    readonly entity: string;
}>() => <M extends Record<string, (e: E) => unknown>>(map: M) => Readonly<{
    id: (entity: E) => E["id"];
    entity: (entity: E) => E["entity"];
} & M>;
