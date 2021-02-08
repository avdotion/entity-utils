import {declareSchema} from 'entity-utils';

import {DenormalizedUser, User, UserId, UserCollectionKey} from './types';

export const userSchema = declareSchema<UserId, User, DenormalizedUser>()(UserCollectionKey);
