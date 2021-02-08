import type {CollectionLike, StateLike} from '../types';
import {updateCollection} from '../updateCollection';

export const updateState = <IS extends StateLike, US extends StateLike>(
    initialState: IS,
    updatesState: US
): IS & US => {
    const updatedState = {...initialState};

    for (const entityKey in updatedState) {
        if (!Object.prototype.hasOwnProperty.call(updatedState, entityKey)) {
            continue;
        }

        if (entityKey in initialState) {
            // @ts-expect-error Expected!
            updatedState[entityKey] = updateCollection(
                initialState[entityKey],
                updatesState[entityKey]
            ) as CollectionLike;
        } else {
            // @ts-expect-error Expected!
            updatedState[entityKey] = updatesState[entityKey];
        }
    }

    return updatedState as never;
};
