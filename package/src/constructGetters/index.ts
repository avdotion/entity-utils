import type {EntityLike} from '../types';

export const constructGetters = <E extends EntityLike>() =>
    <M extends Record<string, (e: E) => unknown>>(map: M): Readonly<{
        id: (entity: E) => E['id'],
        entity: (entity: E) => E['entity'],
    } & M> => Object.freeze({
        ...map,
        id: (entity: E) => entity.id,
        entity: (entity: E) => entity.entity,
    });
