import type {EntityIdLike, EntityKeyLike, EntityLike, StateOf} from '../types';

class SelectorError extends Error {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const constructSelectors = <EK extends EntityKeyLike, EId extends EntityIdLike, E extends EntityLike>(entityKey: EK) => {
    const selectEntityById = (state: StateOf<EK, EId, E>, {id}: {id: EId}): E => {
        if (!(entityKey in state)) {
            throw new SelectorError(`No collection with a key ${entityKey} in a state`);
        }

        if (!(id in state[entityKey])) {
            throw new SelectorError(`No item with a key ${id} in ${entityKey} collection`);
        }

        return state[entityKey][id];
    };
    const selectEntitiesByIds = (state: StateOf<EK, EId, E>, {ids}: {ids: EId[]}): E[] => ids.map(id => selectEntityById(state, {id}));

    return {selectEntityById, selectEntitiesByIds};
};
