import type { TSUnwrapGeneric } from '../types/utils';
import type { DefinedSchemaLike, GetStateFromSDS, GetTypingsFromSDS, SchemaToSingleSchema, SingleDefinedSchemaLike } from '../schema/types';
declare type GetDenormalizedEntityFromSDS<S extends SingleDefinedSchemaLike> = GetTypingsFromSDS<S>['denormalizedEntity'];
export declare type DefinedSchemaInput<S extends DefinedSchemaLike> = S extends SingleDefinedSchemaLike ? GetDenormalizedEntityFromSDS<S> : GetDenormalizedEntityFromSDS<SchemaToSingleSchema<S>>[];
declare type GetEntityIdFromSDS<S extends SingleDefinedSchemaLike> = Readonly<GetTypingsFromSDS<S>['entityId']>;
declare type ExtractResultFromDefinedSchema<S extends DefinedSchemaLike> = TSUnwrapGeneric<GetEntityIdFromSDS<SchemaToSingleSchema<S>>[]>;
declare type ExtractStateFromDefinedSchema<S extends DefinedSchemaLike> = TSUnwrapGeneric<GetStateFromSDS<SchemaToSingleSchema<S>>>;
export declare type NormalizeReturnType<S extends DefinedSchemaLike> = TSUnwrapGeneric<{
    readonly result: ExtractResultFromDefinedSchema<S>;
    collections: ExtractStateFromDefinedSchema<S>;
}>;
export {};
