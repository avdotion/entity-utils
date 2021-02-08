import type {SubUnit, TSUnwrapGeneric, UnionToIntersection} from '../types/utils';
import type {
    EntityIdLike,
    EntityKeyLike,
    EntityLike,
    PrenormalizedEntityLike,
    SingleDenormalizedDataLike,
    StateOf
} from '../types';

export type SingleSelfReference = {__selfReference: true};
export type SelfReference = SingleSelfReference | [SingleSelfReference];

export type SingleDefinedSchema<
    EK extends EntityKeyLike,
    EId extends EntityIdLike,
    E extends EntityLike,
    DE extends SingleDenormalizedDataLike,
    R extends ReferencesLike,
    PE extends PrenormalizedEntityLike
    > = TSUnwrapGeneric<{
    __typings: {
        entityKey: EK,
        entityId: EId,
        entity: E,
        denormalizedEntity: DE,
        prenormalizedEntity: PE,
        state: StateOf<EK, EId, E> & ExtractStateFromReferences<R>,
    },

    __schema: true,
    references: SubUnit<R, E> ,
    processStrategy: (denormalizedEntity: DE) => SubUnit<PE, E>,
    entityKey: EK,
    inheritedEntitiesKeys: Set<EntityKeyLike>,
    mergeStrategy: (stored: E, current: E) => E
}>;
export type SingleDefinedSchemaLike = {
    __typings: {
        entityKey: EntityKeyLike,
        entityId: EntityIdLike,
        entity: EntityLike,
        denormalizedEntity: SingleDenormalizedDataLike,
        prenormalizedEntity: PrenormalizedEntityLike,
        state: unknown,
    },

    __schema: true,
    references: Record<string, SchemaLike>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processStrategy: (data: any) => PrenormalizedEntityLike,
    entityKey: EntityKeyLike,
    inheritedEntitiesKeys: Set<EntityKeyLike>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergeStrategy: (stored: any, current: any) => EntityLike
};
export type DefinedSchemaLike = SingleDefinedSchemaLike | [SingleDefinedSchemaLike];
export type SingleSchemaLike = SingleDefinedSchemaLike | SingleSelfReference;
export type SchemaLike = DefinedSchemaLike | SelfReference;

export type ReferencesLike = Record<string, SchemaLike>;

export type GetTypingsFromSDS<S extends SingleDefinedSchemaLike> = S['__typings'];

export type GetStateFromSDS<S extends SingleDefinedSchemaLike> = GetTypingsFromSDS<S>['state'];

type FilterSingleDefinedSchema<R extends SingleSchemaLike> = R extends SingleDefinedSchemaLike ? R : never;
export type SchemaToSingleSchema<Schema extends SchemaLike> = Schema extends (infer SingleSchema)[] ? SingleSchema : Schema;
type GetSchemasUnionFromReferences<R extends ReferencesLike> = R[keyof R];

type ExtractStateFromReferences<R extends ReferencesLike> = UnionToIntersection<
    GetStateFromSDS<
        FilterSingleDefinedSchema<
            SchemaToSingleSchema<
                GetSchemasUnionFromReferences<R>
                >
            >
        >
    >;
