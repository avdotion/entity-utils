export declare const updateState: <IS extends {
    readonly [x: string]: Record<string, {
        readonly id: string;
        readonly entity: string;
    }>;
}, US extends {
    readonly [x: string]: Record<string, {
        readonly id: string;
        readonly entity: string;
    }>;
}>(initialState: IS, updatesState: US) => IS & US;
