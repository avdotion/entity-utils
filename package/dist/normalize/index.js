"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
const schema_1 = require("../schema");
class NormalizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'An error occurred during normalization!';
    }
}
const normalize = (schema) => (inputData) => {
    if (schema == null) {
        throw new NormalizationError('No schema was provided!');
    }
    if (inputData == null || typeof inputData !== 'object') {
        throw new NormalizationError('No data was provided!');
    }
    const singleSchema = schema_1.schemaToSingleSchema(schema);
    if (schema_1.isSelfReference(singleSchema)) {
        throw new NormalizationError('Self reference can not be used on the top level!');
    }
    const state = { [singleSchema.entityKey]: {} };
    for (const entityKey of singleSchema.inheritedEntitiesKeys) {
        state[entityKey] = {};
    }
    const entitiesCache = new Set();
    if (Array.isArray(schema)) {
        if (!Array.isArray(inputData)) {
            throw new NormalizationError('Provided denormalized data is not iterable!');
        }
        const normalized = {
            result: inputData.map(element => constructResult(singleSchema, element, state, entitiesCache)),
            collections: state,
        };
        entitiesCache.clear();
        return normalized;
    }
    const normalized = {
        result: [
            constructResult(schema, inputData, state, entitiesCache)
        ],
        collections: state,
    };
    entitiesCache.clear();
    return normalized;
};
exports.normalize = normalize;
const idAttribute = (entity) => String(entity.id);
function constructResult(schema, data, state, entitiesCache) {
    const singleSchema = schema_1.schemaToSingleSchema(schema);
    if (Array.isArray(schema)) {
        if (!Array.isArray(data)) {
            throw new NormalizationError('Provided denormalized data is not iterable!');
        }
        return data.map(item => constructResult(singleSchema, item, state, entitiesCache));
    }
    const { processStrategy, entityKey, references, mergeStrategy } = singleSchema;
    const processedData = processStrategy(data);
    const id = idAttribute(processedData);
    const prenormalizedData = Object.assign(Object.assign({}, processedData), { id, entity: singleSchema.entityKey });
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
            if (schema_1.isSelfReference(schema_1.schemaToSingleSchema(inheritedSchema))) {
                prenormalizedData[propName] = constructResult(Array.isArray(inheritedSchema) ? [singleSchema] : singleSchema, prenormalizedData[propName], state, entitiesCache);
                continue;
            }
            prenormalizedData[propName] = constructResult(inheritedSchema, prenormalizedData[propName], state, entitiesCache);
        }
    }
    state[entityKey][id] = id in state[entityKey]
        ? mergeStrategy(state[entityKey][id], prenormalizedData)
        : prenormalizedData;
    return id;
}
