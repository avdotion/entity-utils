import {normalize} from 'entity-utils';

import {userSchema} from './schema';

export const normalizeUser = normalize(userSchema);
export const normalizeUsers = normalize([userSchema]);
