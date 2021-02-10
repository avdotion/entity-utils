import type {CollectionOf, EntityIdLike, EntityLike} from '../types';

export const updateCollection = <EId extends EntityIdLike, E extends EntityLike>(
    initialCollection: CollectionOf<EId, E>,
    updatesCollection: CollectionOf<EId, E>
): CollectionOf<EId, E> => {
    const updatedCollection = {...initialCollection};

    for (const collectionId in updatedCollection) {
        if (!Object.prototype.hasOwnProperty.call(updatedCollection, collectionId)) {
            continue;
        }

        if (collectionId in initialCollection) {
            updatedCollection[collectionId] = Object.assign(
                {},
                updatedCollection[collectionId],
                updatesCollection[collectionId]
            );
        } else {
            updatedCollection[collectionId] = updatesCollection[collectionId];
        }
    }

    return updatedCollection;
};
