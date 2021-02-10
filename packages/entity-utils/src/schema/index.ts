import type {SubUnit} from '../types/utils';
import {EntityIdLike, EntityKeyLike, EntityLike, PrenormalizedEntityLike, SingleDenormalizedDataLike} from '../types';
import {
    DefinedSchemaLike,
    SelfReference,
    SingleDefinedSchemaLike,
    SingleSchemaLike,
    SingleSelfReference,
    SchemaLike,
    ReferencesLike,
    SingleDefinedSchema,
} from './types';

export const itselfSchema: SingleSelfReference = {__selfReference: true};
export const isSelfReference = (x: SingleSchemaLike): x is SingleSelfReference =>
    (x as SingleSelfReference).__selfReference;

export function schemaToSingleSchema<S extends DefinedSchemaLike>(schema: S): SingleDefinedSchemaLike;
export function schemaToSingleSchema<S extends SelfReference>(schema: S): SingleSelfReference;
export function schemaToSingleSchema<S extends SchemaLike>(schema: S): SingleSchemaLike;
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function schemaToSingleSchema(schema: any): any {
    return Array.isArray(schema) ? schema[0] : schema;
}

const defaultProcessStrategy = <T>(x: T): T => ({...x});
const defaultMergeStrategy = <T>() => (stored: T, current: T) => Object.assign({}, stored, current);

export const declareSchema = <
    EId extends EntityIdLike,
    E extends EntityLike,
    DE extends SingleDenormalizedDataLike,
>() => <
    EK extends EntityKeyLike,
    PE extends PrenormalizedEntityLike,
    // eslint-disable-next-line @typescript-eslint/ban-types
    R extends ReferencesLike = {}
>(
            entityKey: EK,
            references: SubUnit<R, E> = ({} as unknown as SubUnit<R, E> ),
            processStrategy: (denormalizedEntity: DE) => SubUnit<PE, E> = (defaultProcessStrategy as (denormalizedEntity: DE) => SubUnit<PE, E>),
            mergeStrategy: (stored: E, current: E) => E = defaultMergeStrategy<E>(),
        ): SingleDefinedSchema<EK, EId, E, DE, R, PE> => {
    /**
     * We save the path IDs when creating each schema.
     * In this way, you can restore all the collection names at any level in O(1) and initialize them.
     */
    const inheritedEntitiesKeys = new Set<EntityKeyLike>();

    const referenceSchemas = Object.values(references);
    referenceSchemas
        .forEach(referenceSchema => {
            const inheritedSchema = schemaToSingleSchema(referenceSchema);
            if (isSelfReference(inheritedSchema)) {
                return;
            }

            inheritedEntitiesKeys.add(inheritedSchema.entityKey);
            inheritedSchema.inheritedEntitiesKeys.forEach(entityKey => {
                inheritedEntitiesKeys.add(entityKey);
            });
        });

    return {
        __schema: true,
        references,
        processStrategy,
        entityKey,
        mergeStrategy,
        inheritedEntitiesKeys,
    } as SingleDefinedSchema<EK, EId, E, DE, R, PE>;
};
