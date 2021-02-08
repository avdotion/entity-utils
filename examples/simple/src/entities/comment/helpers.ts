import {normalize} from 'entity-utils';

import {commentSchema} from './schema';

export const normalizeComment = normalize(commentSchema);
export const normalizeComments = normalize([commentSchema]);
