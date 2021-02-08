import type { DeepReadonly, TSUnwrapGeneric } from './utils';
export declare type SingleDenormalizedDataLike = Record<string, unknown>;
export declare type DenormalizedDataLike = SingleDenormalizedDataLike | SingleDenormalizedDataLike[];
export declare type PrenormalizedEntityLike = SingleDenormalizedDataLike & {
    id: string | number;
};
export declare type EntityKeyLike = string;
export declare type EntityIdLike = string;
export declare type EntityOf<EK extends EntityKeyLike, EId extends EntityIdLike, EntityFields extends Record<string, unknown> & {
    id: EId;
    entity: EK;
}> = DeepReadonly<EntityFields>;
export declare type EntityLike = EntityOf<EntityKeyLike, EntityIdLike, {
    id: EntityIdLike;
    entity: EntityKeyLike;
}>;
export declare type CollectionOf<EId extends EntityIdLike, E extends EntityLike> = Record<EId, E>;
export declare type CollectionLike = CollectionOf<EntityKeyLike, EntityLike>;
export declare type StateOf<EK extends EntityKeyLike, EId extends EntityIdLike, E extends EntityLike> = TSUnwrapGeneric<{
    readonly [key in EK]: CollectionOf<EId, E>;
}>;
export declare type StateLike = StateOf<EntityKeyLike, EntityIdLike, EntityLike>;
