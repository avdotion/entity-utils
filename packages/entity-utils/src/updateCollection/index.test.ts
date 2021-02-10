import {Equal, Expect} from '../typingsTestUtils';
import type {CollectionOf, EntityOf} from '../types';
import {updateCollection} from './index';

type FooId = string;
const FooKey = 'foo' as const;
type Foo = EntityOf<typeof FooKey, FooId, {id: string, entity: typeof FooKey, foo: string}>;

describe('updateCollection', () => {
    test('simply works', () => {
        const originalState: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'foo',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        };
        const updates: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
        };
        const updated = updateCollection(originalState, updates);

        expect(updated).toStrictEqual({
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        });


        expect(originalState === updated).toBe(false);
        expect(originalState['1'] === updated['1']).toBe(false);
        expect(originalState['2'] === updated['2']).toBe(false);
        expect(originalState['3'] === updated['3']).toBe(false);

        Expect<Equal<typeof originalState, typeof updated>>();
        Expect<Equal<typeof updates, typeof updated>>();
    });

    test('do not mutate original state', () => {
        const originalState: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'foo',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        };
        const updates: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
        };
        updateCollection(originalState, updates);

        expect(originalState).toStrictEqual({
            1: {
                id: '1',
                entity: FooKey,
                foo: 'foo',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        });
    });

    test('do not mutate updates', () => {
        const originalState: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'foo',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        };
        const updates: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
        };
        updateCollection(originalState, updates);

        expect(updates).toStrictEqual({
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
        });
    });

    test('', () => {
        const originalState: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'foo',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        };
        const updates: CollectionOf<FooId, Foo> = {
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
        };

        originalState['1'] = updates['1'];

        const updated = updateCollection(originalState, updates);

        expect(updated).toStrictEqual({
            1: {
                id: '1',
                entity: FooKey,
                foo: 'bar',
            },
            2: {
                id: '2',
                entity: FooKey,
                foo: 'baz',
            },
            3: {
                id: '2',
                entity: FooKey,
                foo: 'quz',
            },
        });
    });
});
