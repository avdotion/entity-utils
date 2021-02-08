import b from 'benny';
import * as normalizr from 'normalizr';
import {declareSchema, normalize} from 'entity-utils';

import {version} from '../package.json';

const REPORT_FORMAT = 'chart.html';
const DEFAULT_SAVE_CONFIG = {folder: 'results'};

const plainDataMock = {
    id: 12345,
    foo: 'foo',
    bar: 'bar',
    baz: 'baz',
    qux: 'qux',
};

b.suite(
    'Normalize plain structure',

    b.add('normalize', () => {
        const fooSchema = declareSchema()('foo' as const);

        normalize(fooSchema)(plainDataMock);
    }),

    b.add('normalizr', () => {
        const fooSchema = new normalizr.schema.Entity('foo');

        normalizr.normalize(plainDataMock, fooSchema);
    }),

    b.cycle(),
    b.complete(),
    b.save({...DEFAULT_SAVE_CONFIG, file: 'plain', version}),
    b.save({...DEFAULT_SAVE_CONFIG, file: 'plain', format: REPORT_FORMAT}),
);

const commentMock = {
    post: {
        user: {
            id: 2,
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'Shanna@melissa.tv',
            address: {
                street: 'Victor Plains',
                suite: 'Suite 879',
                city: 'Wisokyburgh',
                zipcode: '90566-7771',
                geo: {
                    lat: '-43.9509',
                    lng: '-34.4618',
                }
            },
            phone: '010-692-6593 x09125',
            website: 'anastasia.net',
            company: {
                name: 'Deckow-Crist',
                catchPhrase: 'Proactive didactic contingency',
                bs: 'synergize scalable supply-chains',
            }
        },
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
};

b.suite(
    'Normalize nested structure',

    b.add('normalize', () => {
        const userSchema = declareSchema()('user' as const);
        const postSchema = declareSchema()(
            'post' as const,
            // @ts-expect-error No typings
            {
                userId: userSchema,
            },
            ({user, ...entity}) => ({
                ...entity,
                userId: user,
            })
        );
        const commentSchema = declareSchema()(
            'comment' as const,
            // @ts-expect-error No typings
            {
                postId: postSchema,
            },
            ({post, ...entity}) => ({
                ...entity,
                postId: post,
            })
        );

        normalize(commentSchema)(commentMock);
    }),

    b.add('normalizr', () => {
        const userSchema = new normalizr.schema.Entity('user');
        const postSchema = new normalizr.schema.Entity(
            'post',
            {
                userId: userSchema,
            },
            {
                processStrategy: ({user, ...entity}) => ({
                    ...entity,
                    userId: user,
                }),
            }
        );
        const commentSchema = new normalizr.schema.Entity(
            'comment',
            {
                postId: postSchema,
            },
            {
                processStrategy: ({post, ...entity}) => ({
                    ...entity,
                    postId: post,
                }),
            }
        );

        normalizr.normalize(commentMock, commentSchema);
    }),

    b.cycle(),
    b.complete(),
    b.save({...DEFAULT_SAVE_CONFIG, file: 'nested', version}),
    b.save({...DEFAULT_SAVE_CONFIG, file: 'nested', format: REPORT_FORMAT}),
);
