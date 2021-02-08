import type { SubUnit } from '../types/utils';
import { PrenormalizedEntityLike } from '../types';
import { DefinedSchemaLike, SelfReference, SingleDefinedSchemaLike, SingleSchemaLike, SingleSelfReference, SchemaLike, SingleDefinedSchema } from './types';
export declare const itselfSchema: SingleSelfReference;
export declare const isSelfReference: (x: SingleSchemaLike) => x is SingleSelfReference;
export declare function schemaToSingleSchema<S extends DefinedSchemaLike>(schema: S): SingleDefinedSchemaLike;
export declare function schemaToSingleSchema<S extends SelfReference>(schema: S): SingleSelfReference;
export declare function schemaToSingleSchema<S extends SchemaLike>(schema: S): SingleSchemaLike;
export declare const declareSchema: <EId extends string, E extends {
    readonly id: string;
    readonly entity: string;
}, DE extends Record<string, unknown>>() => <EK extends string, PE extends PrenormalizedEntityLike, R extends Record<string, SchemaLike> = {}>(entityKey: EK, references?: SubUnit<R, E>, processStrategy?: (denormalizedEntity: DE) => SubUnit<PE, E>, mergeStrategy?: (stored: E, current: E) => E) => {
    __typings: {
        entityKey: EK;
        entityId: EId;
        entity: E;
        denormalizedEntity: DE;
        prenormalizedEntity: PE;
        state: { readonly [key in EK]: Record<EId, E>; } & import("../types/utils").UnionToIntersection<import("./types").GetStateFromSDS<import("./types").SchemaToSingleSchema<R[keyof R]> extends SingleDefinedSchemaLike ? SingleDefinedSchemaLike & import("./types").SchemaToSingleSchema<R[keyof R]> : never>>;
    };
    __schema: true;
    references: SubUnit<R, E>;
    processStrategy: (denormalizedEntity: DE) => SubUnit<PE, E>;
    entityKey: EK;
    inheritedEntitiesKeys: Set<string>;
    mergeStrategy: (stored: E, current: E) => E;
};
