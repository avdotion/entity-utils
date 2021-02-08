import type { SubUnit, TSUnwrapGeneric, UnionToIntersection } from '../types/utils';
import type { EntityIdLike, EntityKeyLike, EntityLike, PrenormalizedEntityLike, SingleDenormalizedDataLike, StateOf } from '../types';
export declare type SingleSelfReference = {
    __selfReference: true;
};
export declare type SelfReference = SingleSelfReference | [SingleSelfReference];
export declare type SingleDefinedSchema<EK extends EntityKeyLike, EId extends EntityIdLike, E extends EntityLike, DE extends SingleDenormalizedDataLike, R extends ReferencesLike, PE extends PrenormalizedEntityLike> = TSUnwrapGeneric<{
    __typings: {
        entityKey: EK;
        entityId: EId;
        entity: E;
        denormalizedEntity: DE;
        prenormalizedEntity: PE;
        state: StateOf<EK, EId, E> & ExtractStateFromReferences<R>;
    };
    __schema: true;
    references: SubUnit<R, E>;
    processStrategy: (denormalizedEntity: DE) => SubUnit<PE, E>;
    entityKey: EK;
    inheritedEntitiesKeys: Set<EntityKeyLike>;
    mergeStrategy: (stored: E, current: E) => E;
}>;
export declare type SingleDefinedSchemaLike = {
    __typings: {
        entityKey: EntityKeyLike;
        entityId: EntityIdLike;
        entity: EntityLike;
        denormalizedEntity: SingleDenormalizedDataLike;
        prenormalizedEntity: PrenormalizedEntityLike;
        state: unknown;
    };
    __schema: true;
    references: Record<string, SchemaLike>;
    processStrategy: (data: any) => PrenormalizedEntityLike;
    entityKey: EntityKeyLike;
    inheritedEntitiesKeys: Set<EntityKeyLike>;
    mergeStrategy: (stored: any, current: any) => EntityLike;
};
export declare type DefinedSchemaLike = SingleDefinedSchemaLike | [SingleDefinedSchemaLike];
export declare type SingleSchemaLike = SingleDefinedSchemaLike | SingleSelfReference;
export declare type SchemaLike = DefinedSchemaLike | SelfReference;
export declare type ReferencesLike = Record<string, SchemaLike>;
export declare type GetTypingsFromSDS<S extends SingleDefinedSchemaLike> = S['__typings'];
export declare type GetStateFromSDS<S extends SingleDefinedSchemaLike> = GetTypingsFromSDS<S>['state'];
declare type FilterSingleDefinedSchema<R extends SingleSchemaLike> = R extends SingleDefinedSchemaLike ? R : never;
export declare type SchemaToSingleSchema<Schema extends SchemaLike> = Schema extends (infer SingleSchema)[] ? SingleSchema : Schema;
declare type GetSchemasUnionFromReferences<R extends ReferencesLike> = R[keyof R];
declare type ExtractStateFromReferences<R extends ReferencesLike> = UnionToIntersection<GetStateFromSDS<FilterSingleDefinedSchema<SchemaToSingleSchema<GetSchemasUnionFromReferences<R>>>>>;
export {};
