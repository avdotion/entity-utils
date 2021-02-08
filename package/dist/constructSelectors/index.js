"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSelectors = void 0;
class SelectorError extends Error {
}
const constructSelectors = (entityKey) => {
    const selectEntityById = (state, { id }) => {
        if (!(entityKey in state)) {
            throw new SelectorError(`No collection with a key ${entityKey} in a state`);
        }
        if (!(id in state[entityKey])) {
            throw new SelectorError(`No item with a key ${id} in ${entityKey} collection`);
        }
        return state[entityKey][id];
    };
    const selectEntitiesByIds = (state, { ids }) => ids.map(id => selectEntityById(state, { id }));
    return { selectEntityById, selectEntitiesByIds };
};
exports.constructSelectors = constructSelectors;
