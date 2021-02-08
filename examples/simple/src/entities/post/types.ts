import {EntityOf, StateOf} from 'entity-utils';

import {DenormalizedUser, UserId} from '../user';
import {DenormalizedComment, CommentId} from '../comment';

export type DenormalizedPost = {
    id: number,
    title: string,
    content: string,
    comments: Record<number, DenormalizedComment>,
    author: DenormalizedUser,
    relatedPosts: Record<number, DenormalizedPost>,
    publicationTs: number,
};

export const PostCollectionKey = 'post' as const;
export type PostId = string;
export type Post = EntityOf<typeof PostCollectionKey, PostId, {
    id: PostId,
    entity: typeof PostCollectionKey,
    title: string,
    content: string,
    commentsIds: CommentId[],
    authorId: UserId,
    relatedPostsIds: PostId[],
    publicationDate: Date,
}>;
export type PostState = StateOf<typeof PostCollectionKey, PostId, Post>;
