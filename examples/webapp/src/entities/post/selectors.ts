import {constructSelectors} from 'entity-utils';
import {Post, PostCollectionKey, PostId} from '.';

export const {
    selectEntitiesByIds: selectPostsByIds,
} = constructSelectors<typeof PostCollectionKey, PostId, Post>(PostCollectionKey);

