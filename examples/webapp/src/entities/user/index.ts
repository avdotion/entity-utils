import {EntityOf, StateOf} from 'entity-utils';

export type DenormalizedUser = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        },
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    },
};

type Address = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string,
    },
};

type Company = {
    name: string,
    catchPhrase: string,
    bs: string,
};

export const UserCollectionKey = 'user' as const;
export type UserId = string;
export type User = EntityOf<typeof UserCollectionKey, UserId, {
    id: UserId,
    entity: typeof UserCollectionKey,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company,
}>;
export type UserState = StateOf<typeof UserCollectionKey, UserId, User>;
