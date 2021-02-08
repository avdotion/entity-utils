"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareSchema = exports.schemaToSingleSchema = exports.isSelfReference = exports.itselfSchema = void 0;
exports.itselfSchema = { __selfReference: true };
const isSelfReference = (x) => x.__selfReference;
exports.isSelfReference = isSelfReference;
function schemaToSingleSchema(schema) {
    return Array.isArray(schema) ? schema[0] : schema;
}
exports.schemaToSingleSchema = schemaToSingleSchema;
const defaultProcessStrategy = (x) => (Object.assign({}, x));
const defaultMergeStrategy = () => (stored, current) => Object.assign({}, stored, current);
const declareSchema = () => (entityKey, references = {}, processStrategy = defaultProcessStrategy, mergeStrategy = defaultMergeStrategy()) => {
    const inheritedEntitiesKeys = new Set();
    const referenceSchemas = Object.values(references);
    referenceSchemas
        .forEach(referenceSchema => {
        const inheritedSchema = schemaToSingleSchema(referenceSchema);
        if (exports.isSelfReference(inheritedSchema)) {
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
    };
};
exports.declareSchema = declareSchema;
