```typescript
import {EntityOf, StateOf, constructGetters} from 'entity-utils';

const PhotoKey = 'photo' as const;
type PhotoId = string;
type Photo = EntityOf<typeof PhotoKey, PhotoId, {
    id: PhotoId,
    entity: typeof PhotoKey,
    caption: string,
    src: string,
    width: number,
    height: number,
}>;

const photoGetter = constructGetters<Photo>()({
    caption: entity => entity.caption,
    source: entity => entity.src,
    ratio: entity => entity.width / entity.height,
});

const myPhotoState: StateOf<typeof PhotoKey, PhotoId, Photo> = {
    [PhotoKey]: {
        1: {
            id: '1',
            entity: 'photo',
            caption: 'The photo of mine',
            src: 'https://my.photo',
            width: 200,
            height: 100,
        },
    },
};
const myPhoto = myPhotoState.photo['1'];

photoGetter.caption(myPhoto); // string
photoGetter.source(myPhoto); // string
photoGetter.ratio(myPhoto); // number
```
