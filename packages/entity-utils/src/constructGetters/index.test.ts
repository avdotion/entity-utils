import type {EntityOf, StateOf} from '../types';
import {Expect, Equal} from '../typingsTestUtils';
import {constructGetters} from './index';

type Coords =  Readonly<{
    lat: number,
    long: number,
}>;
type FlatCoords = [number, number];

const PhotoKey = 'photo' as const;
type PhotoId = string;
type Photo = EntityOf<typeof PhotoKey, PhotoId, {
    id: PhotoId,
    entity: typeof PhotoKey,
    caption: string,
    src: string,
    width: number,
    height: number,
    location: Coords,
}>;

describe('constructGetters', () => {
    test('unable to modify an getter factory instance', () => {
        const photoGetter = constructGetters<Photo>()({
            caption: entity => entity.caption,
        });

        // @ts-expect-error In case of ts absence
        expect(() => photoGetter['newField'] = 5).toThrowError();
    });

    test('getting from a plain entity', () => {
        const photoGetter = constructGetters<Photo>()({
            caption: entity => entity.caption,
            source: entity => entity.src,
            ratio: entity => entity.width / entity.height,
            coords: entity => entity.location,
            flatCoords: (entity): FlatCoords => [entity.location.lat, entity.location.long],
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
                    location: {
                        lat: 1234,
                        long: 2345,
                    },
                },
            },
        };
        const myPhoto = myPhotoState.photo['1'];

        const gotCaption = photoGetter.caption(myPhoto);
        expect(gotCaption).toBe(myPhoto.caption);
        Expect<Equal<typeof gotCaption, string>>();

        const gotSource = photoGetter.source(myPhoto);
        expect(gotSource).toBe(myPhoto.src);
        Expect<Equal<typeof gotSource, string>>();

        const gotRatio = photoGetter.ratio(myPhoto);
        expect(gotRatio).toBe(myPhoto.width / myPhoto.height);
        Expect<Equal<typeof gotRatio, number>>();

        const gotCoords = photoGetter.coords(myPhoto);
        expect(gotCoords).toBe(myPhoto.location);
        Expect<Equal<typeof gotCoords, Coords>>();

        const gotFlatCoords = photoGetter.flatCoords(myPhoto);
        expect(gotFlatCoords).toStrictEqual([myPhoto.location.lat, myPhoto.location.long]);
        Expect<Equal<typeof gotFlatCoords, FlatCoords>>();
    });

    test('getting id and entity', () => {
        const photoGetter = constructGetters<Photo>()({
            caption: entity => entity.caption,
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
                    location: {
                        lat: 1234,
                        long: 2345,
                    },
                },
            },
        };
        const myPhoto = myPhotoState.photo['1'];

        const gotId = photoGetter.id(myPhoto);
        expect(gotId).toBe(myPhoto.id);
        Expect<Equal<typeof gotId, PhotoId>>();

        const gotEntity = photoGetter.entity(myPhoto);
        expect(gotEntity).toBe(myPhoto.entity);
        Expect<Equal<typeof gotEntity, typeof PhotoKey>>();

        const gotCaption = photoGetter.caption(myPhoto);
        expect(gotCaption).toBe(myPhoto.caption);
        Expect<Equal<typeof gotCaption, string>>();
    });

    test('any mutation prohibition', () => {
        const photoGetter = constructGetters<Photo>()({
            coords: entity => entity.location,
            clearCoords: entity => ({...entity.location}),
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
                    location: {
                        lat: 1234,
                        long: 2345,
                    },
                },
            },
        };
        const myPhoto = myPhotoState.photo['1'];

        const coords = photoGetter.coords(myPhoto);
        // @ts-expect-error Mutating a readonly entity
        coords.lat = coords.lat + 1;
        expect(coords.lat).toBe(myPhoto.location.lat);

        const clearCoords = photoGetter.clearCoords(myPhoto);
        clearCoords.lat = clearCoords.lat + 1;
        expect(clearCoords.lat).not.toBe(myPhoto.location.lat);
    });
});
