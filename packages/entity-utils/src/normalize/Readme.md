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
