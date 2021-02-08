import {declareSchema} from 'entity-utils';

import {userSchema} from '../user/schema';
import {Comment, CommentCollectionKey, CommentId, DenormalizedComment} from '.';

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
