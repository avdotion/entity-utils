import type {EntityOf, StateOf} from '../types';
import {Expect, Equal} from '../typingsTestUtils';
import {constructSelectors} from './index';

const FooCollectionKey = 'foo' as const;
type FooId = string;
type Foo = EntityOf<typeof FooCollectionKey, string, {
    id: FooId,
    entity: typeof FooCollectionKey,
    foo: string,
}>;
type FooState = StateOf<typeof FooCollectionKey, FooId, Foo>;

describe('constructSelectors', () => {
    test('works', () => {
        const foo123 = {
            id: '123',
            entity: FooCollectionKey,
            foo: 'bar',
        };
        const foo234 = {
            id: '234',
            entity: FooCollectionKey,
            foo: 'baz',
        };

        const state = {
            [FooCollectionKey]: {
                123: foo123,
                234: foo234,
            },
        };

        const {
            selectEntityById: selectFooById,
            selectEntitiesByIds: selectFoosByIds,
        } = constructSelectors<typeof FooCollectionKey, FooId, Foo>(FooCollectionKey);

        expect(selectFooById(state, {id: '234'})).toStrictEqual(foo234);

        const selected123 = selectFooById(state, {id: '123'});
        expect(selected123).toStrictEqual(foo123);
        Expect<Equal<typeof selected123, Foo>>();

        expect(selectFoosByIds(state, {ids: ['123']})).toStrictEqual([foo123]);
        expect(selectFoosByIds(state, {ids: ['234']})).toStrictEqual([foo234]);
        expect(selectFoosByIds(state, {ids: []})).toStrictEqual([]);

        const selected123and234 = selectFoosByIds(state, {ids: ['123', '234']});
        expect(selected123and234).toStrictEqual([foo123, foo234]);
        Expect<Equal<typeof selected123and234, Foo[]>>();
    });

    test('error boundary works', () => {
        const noKeyState = {
            [FooCollectionKey + 'Unknown']: {
                123: {
                    id: '123',
                    entity: FooCollectionKey + 'Unknown',
                },
            },
        } as unknown as FooState;

        const no234State = {
            [FooCollectionKey]: {
                123: {
                    id: '123',
                    entity: FooCollectionKey,
                    foo: 'bar',
                },
            },
        };

        const {
            selectEntityById: selectFooById,
            selectEntitiesByIds: selectFoosByIds,
        } = constructSelectors<typeof FooCollectionKey, FooId, Foo>(FooCollectionKey);

        expect(() => selectFooById(noKeyState, {id: '123'})).toThrow();
        expect(() => selectFooById(no234State, {id: '234'})).toThrow();

        expect(() => selectFoosByIds(noKeyState, {ids: ['123']})).toThrow();
        expect(() => selectFoosByIds(no234State, {ids: ['234']})).toThrow();
    });
});
