import type { StateOf } from '../types';
export declare const constructSelectors: <EK extends string, EId extends string, E extends {
    readonly id: string;
    readonly entity: string;
}>(entityKey: EK) => {
    selectEntityById: (state: { readonly [key in EK]: Record<EId, E>; }, { id }: {
        id: EId;
    }) => E;
    selectEntitiesByIds: (state: { readonly [key in EK]: Record<EId, E>; }, { ids }: {
        ids: EId[];
    }) => E[];
};
