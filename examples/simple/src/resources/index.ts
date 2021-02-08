import {DenormalizedPost} from '../entities/post';
import {MOCK} from './mock';

export const fetchPosts = (): Promise<Record<number, DenormalizedPost>> => Promise.resolve(MOCK);
