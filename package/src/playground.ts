import {declareSchema, EntityOf, normalize} from '.';

export type DenormalizedUser = {
    id: number,
    name: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
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
    company: Company,
}>;

export const userSchema = declareSchema<UserId, User, DenormalizedUser>()(UserCollectionKey);

const normalizeUser = normalize(userSchema);
const rawData = {} as unknown as DenormalizedUser;

normalizeUser(rawData);


