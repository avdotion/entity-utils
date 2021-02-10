# entity-utils

_The utilities set which suggests a way your application prepares to be scaled._

## Features

* 🦆 A full set of typings for an entity maintenance
* 🪒 Normalizer and schemas creator
* 🔬 Getters constructor
* 🔍 Selectors constructor
* 🔨 Mutation utils

## The way of entity life

### Preparing an entity

Each entity is prepared and has a strict structure and callback (schema) with instruction on how to transform an unknown object to it.

```typescript
import {declareSchema, EntityOf} from 'entity-utils';

const PhotoKey = 'photo' as const;
type PhotoId = string
type Photo = EntityOf<typeof PhotoKey, PhotoId, {
    id: PhotoId,
    entity: typeof PhotoKey,
    caption: string,
    src: string,
    width: number,
    height: number,
}>;

type DenormalizedPhoto = {
    id: number,
    title: string,
    src: string,
    properties: {
        w: number,
        h: number,
    },
};

const photoSchema = declareSchema<PhotoId, Photo, DenormalizedPhoto>()(
    PhotoKey,
    {},
    denormalizedPhoto => {
        return {
            id: denormalizedPhoto.id,
            caption: denormalizedPhoto.title,
            src: denormalizedPhoto.src,
            width: denormalizedPhoto.properties.w,
            height: denormalizedPhoto.properties.h,
        };
    }
);
```

```typescript
import {declareSchema, EntityOf} from 'entity-utils';

const UserKey = 'user' as const;
type UserId = string
type User = EntityOf<typeof UserKey, UserId, {
    id: UserId,
    entity: typeof UserKey,
    firstName: string,
    lastName: string,
    avatarId: PhotoId,
}>;

type DenormalizedUser = {
    id: number,
    firstName: string,
    lastName: string,
    avatar: DenormalizedPhoto,
};

const userSchema = declareSchema<UserId, User, DenormalizedUser>()(
    UserKey,
    {
        avatarId: photoSchema,
    },
    denormalizedUser => {
        return {
            id: denormalizedUser.id,
            firstName: denormalizedUser.firstName,
            lastName: denormalizedUser.lastName,
            avatarId: denormalizedUser.avatar,
        };
    }
);
```

### Transforming an unknown data

Fetching a data, it normalizes into known format and store in the read-only mode.

```typescript
import {normalize} from 'entity-utils';

const fetchUser = (): Promise<DenormalizedUser> => Promise.resolve({
    id: 521,
    firstName: 'Alexander',
    lastName: 'Zubarev',
    avatar: {
        id: 1,
        title: 'photo of mine',
        src: 'http://localhost/my-photo.jpg',
        properties: {
            w: 100,
            h: 200,
        },
    },
});

const normalizeUser = normalize(userSchema);

(async () => {
    const denormalizedData = await fetchUser();
    const normalizedData = normalizeUser(denormalizedData);

    console.log(normalizedData);
    /**
     * {
     *     result: ['521'],
     *     collections: {
     *         user: {
     *             521: {
     *                 id: '521',
     *                 entity: 'user',
     *                 firstName: 'Alexander',
     *                 lastName: 'Zubarev',
     *                 avatarId: '1',
     *             },
     *         },
     *         photo: {
     *             1: {
     *                 id: '1',
     *                 entity: 'photo',
     *                 caption: 'photo of mine',
     *                 src: 'http://localhost/my-photo.jpg',
     *                 width: 100,
     *                 height: 200,
     *             },
     *         },
     *     },
     * }
     */
})();
```

The benefits of normalization an unknown data:

* It makes the data tree flat.
* It deduplicates particular entities instances of the data.
* It makes the data access easier.

[Read more about normalization and state shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
.

### Complete static typings

All utils are coming with complete typescript support.

![Example of normalized data typings](./docs/Normalized%20data%20typings.gif)

### Accessing and mutating data

Normalized data is read-only, and it is cannot be modified freely.

![An error example while modifying read-only data](./docs/Readonly%20entities.gif)

Getters, selectors, `updateCollection` (`updateState`) is a common and convenient way to access and modify read-only
entity collections.

Getter is a view to extract a property (or compute) from the original normalized object. Nevertheless, an extracted
property stays read-only. If typings of the original normalized data is changing, it is more convenient to modify only
the getter constructor, but not every piece of code where the modified property had been used manually.

```typescript
import {constructGetters} from 'entity-utils';

const photoGetter = constructGetters<Photo>()({
    caption: entity => entity.caption,
    source: entity => entity.src,
    ratio: entity => entity.width / entity.height,
});

photoGetter.id(myPhoto); // PhotoId
photoGetter.caption(myPhoto); // string
photoGetter.source(myPhoto); // string
photoGetter.ratio(myPhoto); // number
```

```typescript
import {constructSelectors} from 'entity-utils';

const {
    selectEntityById: selectPhotoById,
} = constructSelectors<typeof PhotoKey, PhotoId, Photo>(PhotoKey);

const state = {
    photo: {
        1: {
            id: '1',
            caption: 'photo of mine',
            src: 'http://localhost/my-photo.jpg',
            width: 100,
            height: 200,
        },
    },
};

selectPhotoById(state, {id: '1'});
/**
 * {
 *      id: '1',
 *      caption: 'photo of mine',
 *      src: 'http://localhost/my-photo.jpg',
 *      width: 100,
 *      height: 200,
 *  }
 */

selectPhotoById(state, {id: '2'}); // Runtime Error!
```

```typescript
import {updateCollection} from 'entity-utils';

const photoCollection = getState();
setState(updateCollection(photoCollection, updatedPhotoCollection));

state.collections.photo['1'].width = 5; // TS2540: Cannot assign to 'width' because it is a read-only property.
```

## Unlike `normalizr` and others

* Not the only a normalizer but complete utils set.
* An entity identifier is always a string.
* If a part of the data is missing, all keys of unused schemas will be in the `collections` object with an empty value.
* A normalized object comes with an `entity: 'key'` field.
* It is coming with great typescript support.

## postscriptum

The project was inspired by [normalizr](https://github.com/paularmstrong/normalizr).
