import {EntityOf, StateOf} from 'entity-utils';

import {DenormalizedUser, UserId, UserState} from '../user';

export type DenormalizedComment = {
    id: number,
    postId: number,
    body: string,
    upVotes: number,
    author: DenormalizedUser,
    publicationTs: number,
};

export const CommentCollectionKey = 'comment' as const;
export type CommentId = string;
export type Comment = EntityOf<typeof CommentCollectionKey, CommentId, {
    id: CommentId,
    entity: typeof CommentCollectionKey,
    body: string,
    upVotes: number,
    userId: UserId,
    publicationDate: Date,
}>;
export type CommentState = StateOf<typeof CommentCollectionKey, CommentId, Comment> & UserState;
