import type {TSUnwrapGeneric} from '../types/utils';
import type {
    DefinedSchemaLike,
    GetStateFromSDS,
    GetTypingsFromSDS,
    SchemaToSingleSchema,
    SingleDefinedSchemaLike,
} from '../schema/types';

type GetDenormalizedEntityFromSDS<S extends SingleDefinedSchemaLike> = GetTypingsFromSDS<S>['denormalizedEntity'];
export type DefinedSchemaInput<S extends DefinedSchemaLike> = S extends SingleDefinedSchemaLike
    ? GetDenormalizedEntityFromSDS<S>
    : GetDenormalizedEntityFromSDS<SchemaToSingleSchema<S>>[]

type GetEntityIdFromSDS<S extends SingleDefinedSchemaLike> = Readonly<GetTypingsFromSDS<S>['entityId']>;
type ExtractResultFromDefinedSchema<S extends DefinedSchemaLike> = TSUnwrapGeneric<GetEntityIdFromSDS<SchemaToSingleSchema<S>>[]>;

type ExtractStateFromDefinedSchema<S extends DefinedSchemaLike> = TSUnwrapGeneric<GetStateFromSDS<SchemaToSingleSchema<S>>>

export type NormalizeReturnType<S extends DefinedSchemaLike> = TSUnwrapGeneric<{
    readonly result: ExtractResultFromDefinedSchema<S>,
    collections: ExtractStateFromDefinedSchema<S>,
}>;
