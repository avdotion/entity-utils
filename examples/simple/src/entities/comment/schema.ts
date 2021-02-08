import {declareSchema} from 'entity-utils';

import {userSchema} from '../user';
import {Comment, CommentCollectionKey, CommentId, DenormalizedComment} from './types';

export const commentSchema = declareSchema<CommentId, Comment, DenormalizedComment>()(
    CommentCollectionKey,
    {
        userId: userSchema,
    },
    entity => ({
        id: entity.id,
        body: entity.body,
        upVotes: entity.upVotes,
        userId: entity.author,
        publicationDate: new Date(entity.publicationTs),
    })
);
