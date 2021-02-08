```typescript
import {declareSchema} from './index';

const PhotoKey = 'photo' as const
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
        }
    }
)
```
