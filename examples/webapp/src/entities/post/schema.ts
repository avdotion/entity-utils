import {declareSchema, itselfSchema} from 'entity-utils';

import {commentSchema} from '../comment/schema';
import {userSchema} from '../user/schema';
import {DenormalizedPost, Post, PostCollectionKey, PostId} from '.';

export const postSchema = declareSchema<PostId, Post, DenormalizedPost>()(
    PostCollectionKey,
    {
        commentsIds: [commentSchema],
        authorId: userSchema,
        relatedPostsIds: [itselfSchema],
    },
    entity => ({
        id: entity.id,
        title: entity.title,
        content: entity.content,
        commentsIds: Object.values(entity.comments),
        authorId: entity.author,
        relatedPostsIds: Object.values(entity.relatedPosts),
        publicationDate: new Date(entity.publicationTs),
    })
);
