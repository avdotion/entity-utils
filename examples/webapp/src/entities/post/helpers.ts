import {normalize} from 'entity-utils';

import {postSchema} from './schema';

export const normalizePost = normalize(postSchema);
export const normalizePosts = normalize([postSchema]);
