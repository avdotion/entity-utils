import type {DeepReadonly, TSUnwrapGeneric} from './utils';

export type SingleDenormalizedDataLike = Record<string, unknown>;
export type DenormalizedDataLike = SingleDenormalizedDataLike | SingleDenormalizedDataLike[];
export type PrenormalizedEntityLike = SingleDenormalizedDataLike & {id: string | number};

export type EntityKeyLike = string;

export type EntityIdLike = string;

export type EntityOf<
    EK extends EntityKeyLike,
    EId extends EntityIdLike,
    EntityFields extends Record<string, unknown> & {id: EId, entity: EK}
> = DeepReadonly<EntityFields>;
export type EntityLike = EntityOf<EntityKeyLike, EntityIdLike, {id: EntityIdLike, entity: EntityKeyLike}>;

export type CollectionOf<EId extends EntityIdLike, E extends EntityLike> = Record<EId, E>;
export type CollectionLike = CollectionOf<EntityKeyLike, EntityLike>;

export type StateOf<EK extends EntityKeyLike, EId extends EntityIdLike, E extends EntityLike> = TSUnwrapGeneric<{
    readonly [key in EK]: CollectionOf<EId, E>
}>;
export type StateLike = StateOf<EntityKeyLike, EntityIdLike, EntityLike>;
