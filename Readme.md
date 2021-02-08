# entity-utils

_An utilities set to keep project fresh, designed especially for scaled applications._
 
## Features

* 🦆 A full set of typings for an entity maintenance
* 🪒 Normalizer and schemas creator
* 🔬 Getters constructor
* 🔍 Selectors constructor
* 🔨 Mutation utils

## The way of entity life

### Preparing an entity

Each entity is prepared and has a strict structure and callback (schema) with instruction how to transform an unknown object to it.
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
}>

type DenormalizedPhoto = {
    id: number,
    title: string,
    src: string,
    properties: {
        w: number,
        h: number,
    },
}

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

### Transforming an unknown data

Fetching a data, it normalizes into known format and store in the read-only mode.
```typescript
import {normalize} from 'entity-utils';

const normalizePhoto = normalize(photoSchema);

const fetchPhotoById = (): Promise<DenormalizedPhoto> => Promise.resolve({
    id: 1,
    title: 'photo of mine',
    src: 'http://localhost/my-photo.jpg',
    properties: {
        w: 100,
        h: 200,
    },
});

(async () => {
    const denormalizedData = await fetchPhotoById();
    const normalizedData = normalizePhoto(denormalizedData);
    
    console.log(normalizedData);
    /**
     * {
     *     result: ['1'],
     *     collections: {
     *         photo: {
     *             1: {
     *                 id: '1',
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

### Complete static typings
All utils are coming with a complete typescript support.
// PIC
// PIC
// PIC

### Accessing and mutating data
Getters, selectors, `updateCollection` (`updateState`) is a common and convenient way to access and modify read-only entity collections.
```typescript
import {constructGetters} from 'entity-utils';

const photoGetter = constructGetters<Photo>()({
    caption: entity => entity.caption,
    source: entity => entity.src,
    ratio: entity => entity.width / entity.height,
});

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

selectPhotoById(state, {id: '2'}); // Error!
```

```typescript
import {updateCollection} from 'entity-utils';

const photoCollection = getState();
setState(updateCollection(photoCollection, updatedPhotoCollection));

state.collections.photo['1'].width = 5; // TS Error!
```

## Unlike `normalizr` and similars

* Not the only a normalizer but a complete utils set. 
* An entity identifier is always a string.
* If a part of the data is missing, all keys of unused schemas will be in the `collections` object with an empty value.
* A normalized object comes with an `entity: 'key'` field.
* It is coming with a great typescript support.

## postscriptum

The project was inspired by [normalizr](https://github.com/paularmstrong/normalizr).
