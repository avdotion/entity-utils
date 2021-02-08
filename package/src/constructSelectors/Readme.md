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
