import type { CollectionOf } from '../types';
export declare const updateCollection: <EId extends string, E extends {
    readonly id: string;
    readonly entity: string;
}>(initialCollection: Record<EId, E>, updatesCollection: Record<EId, E>) => Record<EId, E>;
