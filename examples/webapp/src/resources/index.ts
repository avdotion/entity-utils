import {normalizePosts} from '../entities/post/helpers';
import {MOCK} from './mock';

export const fetchPosts = () =>
    Promise.resolve(MOCK)
        .then(Object.values)
        .then(normalizePosts)
;
