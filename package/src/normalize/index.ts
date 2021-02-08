import type {
    DenormalizedDataLike,
    EntityIdLike,
    EntityKeyLike,
    PrenormalizedEntityLike,
    SingleDenormalizedDataLike,
    StateLike
} from '../types';
import type {DefinedSchemaLike} from '../schema/types';
import {isSelfReference, schemaToSingleSchema} from '../schema';
import type {DefinedSchemaInput, NormalizeReturnType} from './types';

class NormalizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'An error occurred during normalization!';
    }
}

export const normalize = <S extends DefinedSchemaLike>(schema: S) => (
    inputData: DefinedSchemaInput<S>
): NormalizeReturnType<S> => {
    if (schema == null) {
        throw new NormalizationError('No schema was provided!');
    }
    if (inputData == null || typeof inputData !== 'object') {
        throw new NormalizationError('No data was provided!');
    }

    const singleSchema = schemaToSingleSchema(schema);
    if (isSelfReference(singleSchema)) {
        throw new NormalizationError('Self reference can not be used on the top level!');
    }

    // Providing defaults
    const state = {[singleSchema.entityKey]: {}};
    for (const entityKey of singleSchema.inheritedEntitiesKeys) {
        state[entityKey] = {};
    }

    const entitiesCache = new Set<DenormalizedDataLike>();

    if (Array.isArray(schema)) {
        if (!Array.isArray(inputData)) {
            throw new NormalizationError('Provided denormalized data is not iterable!');
        }

        const normalized = {
            result: inputData.map(element =>
                constructResult(singleSchema, element, state, entitiesCache)
            ),
            collections: state,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;

        entitiesCache.clear();

        return normalized;
    }

    const normalized = {
        result: [
            constructResult(schema, inputData as SingleDenormalizedDataLike, state, entitiesCache)
        ],
        collections: state,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    entitiesCache.clear();

    return normalized;
};

const idAttribute = <E extends PrenormalizedEntityLike>(entity: E) =>
    String(entity.id) as EntityIdLike;

function constructResult<
    Schema extends DefinedSchemaLike,
    DD extends SingleDenormalizedDataLike,
    State extends StateLike
>(schema: Schema, data: DD, state: State, entitiesCache: Set<DenormalizedDataLike>): EntityIdLike | EntityIdLike[] {
    const singleSchema = schemaToSingleSchema(schema);

    if (Array.isArray(schema)) {
        if (!Array.isArray(data)) {
            throw new NormalizationError('Provided denormalized data is not iterable!');
        }

        return data.map(item =>
            constructResult(singleSchema, item, state, entitiesCache)
        ) as EntityIdLike[];
    }

    const {processStrategy, entityKey, references, mergeStrategy} = singleSchema;

    const processedData = processStrategy(data);
    const id = idAttribute(processedData);
    const prenormalizedData = {
        ...processedData,
        id,
        entity: singleSchema.entityKey,
    } as ReturnType<typeof processStrategy> & {id: EntityIdLike, entity: EntityKeyLike};

    if (entitiesCache.has(data)) {
        return id;
    }
    entitiesCache.add(data);

    if (!(entityKey in state)) {
        throw new NormalizationError('Wrong schemas\' structure!');
    }

    for (const propName in references) {
        if (Object.hasOwnProperty.call(references, propName)) {
            const inheritedSchema = references[propName];

            if (!(propName in prenormalizedData)) {
                continue;
            }

            if (isSelfReference(schemaToSingleSchema(inheritedSchema))) {
                prenormalizedData[propName] = constructResult(
                    Array.isArray(inheritedSchema) ? [singleSchema] : singleSchema,
                    prenormalizedData[propName] as SingleDenormalizedDataLike,
                    state,
                    entitiesCache,
                );

                continue;
            }

            prenormalizedData[propName] = constructResult(
                inheritedSchema as DefinedSchemaLike,
                prenormalizedData[propName] as SingleDenormalizedDataLike,
                state,
                entitiesCache
            );
        }
    }

    state[entityKey][id] = id in state[entityKey]
        ? mergeStrategy(
            state[entityKey][id],
            prenormalizedData
        )
        : prenormalizedData
    ;

    return id;
}
