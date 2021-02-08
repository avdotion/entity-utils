import {Expect, Equal} from '../typingsTestUtils';
import {declareSchema, CollectionOf, itselfSchema, EntityOf} from '..';
import {normalize} from '.';

type DenormalizedTodo = {
    id: number,
    userId: number,
    title: string,
    completed: boolean,
};

const denormalizedTodos: DenormalizedTodo[] = [
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    },
    {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
    },
    {
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: true,
    },
];

const denormalizedTodo: DenormalizedTodo = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
};

const TodoKey = 'todo' as const;

type TodoId = string;
type Todo = EntityOf<typeof TodoKey, TodoId, {
    id: TodoId,
    entity: typeof TodoKey,
    userId: number,
    title: string,
    completed: boolean,
}>;
type TodoCollection = CollectionOf<TodoId, Todo>;

const LinkedTodoKey = 'linkedTodo' as const;
type LinkedTodoId = string;
type DenormalizedLinkedTodo = DenormalizedTodo & {linked: DenormalizedTodo[]};
type LinkedTodo = EntityOf<typeof LinkedTodoKey, LinkedTodoId, {
    id: LinkedTodoId,
    entity: typeof LinkedTodoKey,
    userId: number,
    title: string,
    completed: boolean,
    linked: LinkedTodoId[],
}>;
type LinkedTodoCollection = CollectionOf<LinkedTodoId, LinkedTodo>;

type DenormalizedUser = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        },
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    },
};

type DenormalizedAlbum = {
    user: DenormalizedUser,
    id: number,
    title: string,
};

type DenormalizedPicture = {
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
    album: DenormalizedAlbum,
};

const denormalizedPictures: DenormalizedPicture[] = [
    {
        album: {
            user: {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                address: {
                    street: 'Kulas Light',
                    suite: 'Apt. 556',
                    city: 'Gwenborough',
                    zipcode: '92998-3874',
                    geo: {
                        lat: '-37.3159',
                        lng: '81.1496',
                    },
                },
                phone: '1-770-736-8031 x56442',
                website: 'hildegard.org',
                company: {
                    name: 'Romaguera-Crona',
                    catchPhrase: 'Multi-layered client-server neural-net',
                    bs: 'harness real-time e-markets',
                },
            },
            id: 1,
            title: 'quidem molestiae enim',
        },
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    },
    {
        album: {
            user: {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                address: {
                    street: 'Kulas Light',
                    suite: 'Apt. 556',
                    city: 'Gwenborough',
                    zipcode: '92998-3874',
                    geo: {
                        lat: '-37.3159',
                        lng: '81.1496',
                    },
                },
                phone: '1-770-736-8031 x56442',
                website: 'hildegard.org',
                company: {
                    name: 'Romaguera-Crona',
                    catchPhrase: 'Multi-layered client-server neural-net',
                    bs: 'harness real-time e-markets',
                },
            },
            id: 1,
            title: 'quidem molestiae enim',
        },
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
    },
    {
        album: {
            user: {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                address: {
                    street: 'Kulas Light',
                    suite: 'Apt. 556',
                    city: 'Gwenborough',
                    zipcode: '92998-3874',
                    geo: {
                        lat: '-37.3159',
                        lng: '81.1496',
                    },
                },
                phone: '1-770-736-8031 x56442',
                website: 'hildegard.org',
                company: {
                    name: 'Romaguera-Crona',
                    catchPhrase: 'Multi-layered client-server neural-net',
                    bs: 'harness real-time e-markets',
                },
            },
            id: 1,
            title: 'quidem molestiae enim',
        },
        id: 3,
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: 'https://via.placeholder.com/600/24f355',
        thumbnailUrl: 'https://via.placeholder.com/150/24f355',
    },
    {
        album: {
            user: {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                address: {
                    street: 'Kulas Light',
                    suite: 'Apt. 556',
                    city: 'Gwenborough',
                    zipcode: '92998-3874',
                    geo: {
                        lat: '-37.3159',
                        lng: '81.1496',
                    },
                },
                phone: '1-770-736-8031 x56442',
                website: 'hildegard.org',
                company: {
                    name: 'Romaguera-Crona',
                    catchPhrase: 'Multi-layered client-server neural-net',
                    bs: 'harness real-time e-markets',
                },
            },
            id: 1,
            title: 'quidem molestiae enim',
        },
        id: 4,
        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        url: 'https://via.placeholder.com/600/d32776',
        thumbnailUrl: 'https://via.placeholder.com/150/d32776',
    },
    {
        album: {
            user: {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                address: {
                    street: 'Kulas Light',
                    suite: 'Apt. 556',
                    city: 'Gwenborough',
                    zipcode: '92998-3874',
                    geo: {
                        lat: '-37.3159',
                        lng: '81.1496',
                    },
                },
                phone: '1-770-736-8031 x56442',
                website: 'hildegard.org',
                company: {
                    name: 'Romaguera-Crona',
                    catchPhrase: 'Multi-layered client-server neural-net',
                    bs: 'harness real-time e-markets',
                },
            },
            id: 1,
            title: 'quidem molestiae enim',
        },
        id: 5,
        title: 'natus nisi omnis corporis facere molestiae rerum in',
        url: 'https://via.placeholder.com/600/f66b97',
        thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
    },
];

const UserKey = 'user' as const;
type UserId = string;
type User = EntityOf<typeof UserKey, UserId, {
    id: UserId,
    entity: typeof UserKey,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        },
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    },
}>;
type UserCollection = CollectionOf<UserId, User>;

const AlbumKey = 'album' as const;
type AlbumId = string;
type Album = EntityOf<typeof AlbumKey, AlbumId, {
    id: AlbumId,
    entity: typeof AlbumKey,
    userId: UserId,
    title: string,
}>;
type AlbumCollection = CollectionOf<AlbumId, Album>;

const PictureKey = 'picture';
type PictureId = string;
type Picture = EntityOf<typeof PictureKey, PictureId, {
    id: PictureId,
    entity: typeof PictureKey,
    title: string,
    url: string,
    thumbnailUrl: string,
    albumId: AlbumId,
}>;
type PictureCollection = CollectionOf<PictureId, Picture>;

type DenormalizedPost = {
    user: DenormalizedUser,
    id: number,
    title: string,
    body: string,
};

const PostKey = 'post' as const;
type PostId = string;
type Post = EntityOf<typeof PostKey, PostId, {
    id: PostId,
    entity: typeof PostKey,
    title: string,
    body: string,
    userId: UserId,
}>;

type DenormalizedComment = {
    post: DenormalizedUser,
    id: number,
    name: string,
    email: string,
    body: string,
};

const CommentKey = 'comment' as const;
type CommentId = string;
type Comment = EntityOf<typeof CommentKey, CommentId, {
    id: CommentId,
    entity: typeof CommentKey,
    postId: PostId,
    name: string,
    email: string,
    body: string,
}>;

describe('normalize', () => {
    test('Basic single-entity normalization', () => {
        const todoSchema = declareSchema<TodoId, Todo, DenormalizedTodo>()(TodoKey);
        const normalizedData = normalize(todoSchema)(denormalizedTodo);

        expect(normalizedData).toStrictEqual({
            result: ['1'],
            collections: {
                todo: {
                    1: {
                        id: '1',
                        entity: TodoKey,
                        userId: 1,
                        title: 'delectus aut autem',
                        completed: false,
                    },
                },
            },
        });

        Expect<Equal<typeof normalizedData.result, TodoId[]>>();
        Expect<Equal<typeof normalizedData.collections.todo, TodoCollection>>();

        const title = normalizedData.collections.todo['1'].title;
        Expect<Equal<typeof title, string>>();

        // @ts-expect-error Restriction of a state mutations
        normalizedData.collections.todo = {};

        normalizedData.collections.todo['1'] = {
            id: '1',
            entity: TodoKey,
            userId: 1,
            title: 'delectus aut autem',
            completed: false,
        };
        // @ts-expect-error Restriction of a by-value modification
        normalizedData.collections.todo['1'].id = '2';
    });

    test('Basic single-entity normalization (array)', () => {
        const todoSchema = declareSchema<TodoId, Todo, DenormalizedTodo>()(TodoKey);
        const normalizedData = normalize([todoSchema])(denormalizedTodos);

        expect(normalizedData).toStrictEqual({
            result: ['2', '3', '4'],
            collections: {
                todo: {
                    2: {
                        id: '2',
                        entity: TodoKey,
                        userId: 1,
                        title: 'quis ut nam facilis et officia qui',
                        completed: false,
                    },
                    3: {
                        id: '3',
                        entity: TodoKey,
                        userId: 1,
                        title: 'fugiat veniam minus',
                        completed: false,
                    },
                    4: {
                        id: '4',
                        entity: TodoKey,
                        userId: 1,
                        title: 'et porro tempora',
                        completed: true,
                    },
                },
            },
        });

        Expect<Equal<typeof normalizedData.result, TodoId[]>>();
        Expect<Equal<typeof normalizedData.collections.todo, TodoCollection>>();
        Expect<Equal<typeof normalizedData.collections.todo['2'], Readonly<Todo>>>();
    });

    test('Cyclic schemas\' references', () => {
        const denormalizedData: DenormalizedLinkedTodo = {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            completed: true,
            linked: [],
        };
        denormalizedData.linked.push(denormalizedData);

        const linkedTodoSchema = declareSchema<
            LinkedTodoId,
            LinkedTodo,
            DenormalizedLinkedTodo
        >()(LinkedTodoKey, {linked: [itselfSchema]});

        const normalizedData = normalize(linkedTodoSchema)(denormalizedData);
        expect(normalizedData).toStrictEqual({
            result: ['1'],
            collections: {
                linkedTodo: {
                    1: {
                        id: '1',
                        entity: LinkedTodoKey,
                        userId: 1,
                        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                        completed: true,
                        linked: ['1'],
                    },
                },
            },
        });

        Expect<Equal<typeof normalizedData.result, LinkedTodoId[]>>();
        Expect<Equal<typeof normalizedData.collections.linkedTodo, LinkedTodoCollection>>();
    });

    test('Nested data', () => {
        const userSchema = declareSchema<UserId, User, DenormalizedUser>()(UserKey);
        const albumSchema = declareSchema<AlbumId, Album, DenormalizedAlbum>()(
            AlbumKey,
            {
                userId: userSchema,
            },
            ({ user, ...entity }: DenormalizedAlbum) => ({
                ...entity,
                userId: user,
            }),
        );
        const pictureSchema = declareSchema<PictureId, Picture, DenormalizedPicture>()(
            PictureKey,
            {
                albumId: albumSchema,
            },
            ({ album, ...entity }) => ({
                ...entity,
                albumId: album,
            })
        );

        const normalizedData = normalize([pictureSchema])(denormalizedPictures);

        expect(normalizedData).toStrictEqual({
            result: ['1', '2', '3', '4', '5'],
            collections: {
                user: {
                    1: {
                        id: '1',
                        entity: UserKey,
                        name: 'Leanne Graham',
                        username: 'Bret',
                        email: 'Sincere@april.biz',
                        address: {
                            street: 'Kulas Light',
                            suite: 'Apt. 556',
                            city: 'Gwenborough',
                            zipcode: '92998-3874',
                            geo: {
                                lat: '-37.3159',
                                lng: '81.1496',
                            },
                        },
                        phone: '1-770-736-8031 x56442',
                        website: 'hildegard.org',
                        company: {
                            name: 'Romaguera-Crona',
                            catchPhrase: 'Multi-layered client-server neural-net',
                            bs: 'harness real-time e-markets',
                        },
                    },
                },
                album: {
                    1: {
                        id: '1',
                        entity: AlbumKey,
                        userId: '1',
                        title: 'quidem molestiae enim',
                    },
                },
                picture: {
                    1: {
                        id: '1',
                        entity: PictureKey,
                        albumId: '1',
                        title: 'accusamus beatae ad facilis cum similique qui sunt',
                        url: 'https://via.placeholder.com/600/92c952',
                        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
                    },
                    2: {
                        id: '2',
                        entity: PictureKey,
                        albumId: '1',
                        title: 'reprehenderit est deserunt velit ipsam',
                        url: 'https://via.placeholder.com/600/771796',
                        thumbnailUrl: 'https://via.placeholder.com/150/771796',
                    },
                    3: {
                        id: '3',
                        entity: PictureKey,
                        albumId: '1',
                        title: 'officia porro iure quia iusto qui ipsa ut modi',
                        url: 'https://via.placeholder.com/600/24f355',
                        thumbnailUrl: 'https://via.placeholder.com/150/24f355',
                    },
                    4: {
                        id: '4',
                        entity: PictureKey,
                        albumId: '1',
                        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
                        url: 'https://via.placeholder.com/600/d32776',
                        thumbnailUrl: 'https://via.placeholder.com/150/d32776',
                    },
                    5: {
                        id: '5',
                        entity: PictureKey,
                        albumId: '1',
                        title: 'natus nisi omnis corporis facere molestiae rerum in',
                        url: 'https://via.placeholder.com/600/f66b97',
                        thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
                    },
                },
            },
        });

        Expect<Equal<typeof normalizedData.result, PictureId[]>>();
        Expect<Equal<typeof normalizedData.collections.picture, PictureCollection>>();
        Expect<Equal<typeof normalizedData.collections.album, AlbumCollection>>();
        Expect<Equal<typeof normalizedData.collections.user, UserCollection>>();
    });

    test('No schema provided', () => {
        // @ts-expect-error Expected error
        expect(() => normalize(null)({})).toThrowError();
    });

    test('No data provided', () => {
        const exampleSchema = declareSchema()('example' as const);

        [42, false, null, undefined].map((data) => {
            // @ts-expect-error Expected error
            expect(() => normalize(exampleSchema)(data)).toThrowError();
        });
    });

    test('Stubbing data absence', () => {
        const notUsedTwiceSchema = declareSchema()('notUsedTwice' as const);
        const notUsedSchema = declareSchema<any, any, any>()('notUsed' as const, {
            anyField: notUsedTwiceSchema,
        });
        const PhotoKey = 'photo' as const;
        const photoSchema = declareSchema<any, any, any>()(PhotoKey, {
            video: notUsedSchema,
        });

        const denormalizedData = {
            albumId: 1,
            id: 1,
            title: 'accusamus beatae ad facilis cum similique qui sunt',
            url: 'https://via.placeholder.com/600/92c952',
            thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        };

        const normalizedData = normalize(photoSchema)(denormalizedData);
        expect(normalizedData).toStrictEqual({
            result: ['1'],
            collections: {
                photo: {
                    1: {
                        id: '1',
                        entity: PhotoKey,
                        albumId: 1,
                        title: 'accusamus beatae ad facilis cum similique qui sunt',
                        url: 'https://via.placeholder.com/600/92c952',
                        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
                    },
                },
                notUsed: {},
                notUsedTwice: {},
            },
        });
    });

    test('No data mutation', () => {
        const denormalizedData = Object.freeze({
            post: Object.freeze({
                user: Object.freeze({
                    id: 1,
                    name: 'Leanne Graham',
                    username: 'Bret',
                    email: 'Sincere@april.biz',
                    address: Object.freeze({
                        street: 'Kulas Light',
                        suite: 'Apt. 556',
                        city: 'Gwenborough',
                        zipcode: '92998-3874',
                        geo: Object.freeze({
                            lat: '-37.3159',
                            lng: '81.1496',
                        }),
                    }),
                    phone: '1-770-736-8031 x56442',
                    website: 'hildegard.org',
                    company: Object.freeze({
                        name: 'Romaguera-Crona',
                        catchPhrase: 'Multi-layered client-server neural-net',
                        bs: 'harness real-time e-markets',
                    }),
                }),
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            }),
            id: 1,
            name: 'id labore ex et quam laborum',
            email: 'Eliseo@gardner.biz',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
        }) as unknown as DenormalizedComment;

        const userSchema = declareSchema<
            UserId,
            User,
            DenormalizedUser
        >()(UserKey);
        const postSchema = declareSchema<
            PostId,
            Post,
            DenormalizedPost
        >()(
            'post' as const,
            {
                userId: userSchema,
            },
            ({user, ...entity}) => ({
                ...entity,
                userId: user,
            }),
        );
        const commentSchema = declareSchema<
            CommentId,
            Comment,
            DenormalizedComment
        >()(
            'comment' as const,
            {
                postId: postSchema,
            },
            ({post, ...entity}) => ({
                ...entity,
                postId: post,
            }),
        );

        expect(() => normalize(commentSchema)(denormalizedData)).not.toThrowError();
    });

    test('Custom id attribute in denormalized state', () => {
        type DenormalizedBar = {
            bar_id: string,
            bar_name: string,
        };

        const BarKey = 'bar' as const;
        type BarId = string;
        type Bar = EntityOf<typeof BarKey, BarId, {
            id: BarId,
            entity: typeof BarKey,
            name: string,
        }>;

        type DenormalizedFoo = {
            foo_id: number,
            bar: DenormalizedBar,
        };

        const FooKey = 'foo' as const;
        type FooId = string;
        type Foo = EntityOf<typeof FooKey, FooId, {
            id: FooId,
            entity: typeof FooKey,
            barId: BarId,
        }>;

        const denormalizedData: DenormalizedFoo = {
            foo_id: 125,
            bar: {
                bar_id: '215',
                bar_name: 'bar',
            },
        };

        const barSchema = declareSchema<
            BarId,
            Bar,
            DenormalizedBar
        >()(
            BarKey,
            {},
            ({bar_id: id, bar_name: name}) => ({
                id,
                name,
            }),
        );

        const fooSchema = declareSchema<
            FooId,
            Foo,
            DenormalizedFoo
        >()(
            FooKey,
            {
                barId: barSchema,
            },
            ({foo_id: id, bar: barId}) => ({
                id,
                barId,
            }),
        );

        const normalizedData = normalize(fooSchema)(denormalizedData);

        expect(normalizedData).toStrictEqual({
            result: ['125'],
            collections: {
                foo: {
                    125: {
                        id: '125',
                        entity: FooKey,
                        barId: '215',
                    },
                },
                bar: {
                    215: {
                        id: '215',
                        entity: BarKey,
                        name: 'bar',
                    },
                },
            },
        });
    });

    test('Custom merge strategy', () => {
        type DenormalizedFoo = {
            id: number,
            bar: string,
        };

        const FooKey = 'foo' as const;
        type FooId = string;
        type Foo = EntityOf<typeof FooKey, FooId, {
            id: FooId,
            entity: typeof FooKey,
            bar: string,
        }>;

        type DenormalizedTop = {
            id: number,
            foo: DenormalizedFoo,
        };

        const TopKey = 'top' as const;
        type TopId = string;
        type Top = EntityOf<typeof TopKey, TopId, {
            id: TopId,
            entity: typeof TopKey,
            fooIds: FooId[],
        }>;

        const denormalizedData: DenormalizedTop[] = [
            {
                id: 1,
                foo: {
                    id: 1,
                    bar: 'baz',
                },
            },
            {
                id: 1,
                foo: {
                    id: 2,
                    bar: 'qux',
                },
            },
        ];

        const fooSchema = declareSchema<
            FooId,
            Foo,
            DenormalizedFoo
        >()(FooKey);
        const topSchema = declareSchema<
            TopId,
            Top,
            DenormalizedTop
        >()(
            TopKey,
            {
                fooIds: fooSchema,
            },
            ({foo, ...entity}) => ({
                ...entity,
                fooIds: foo,
            }),
            (entity1, entity2) => {
                return ({
                    ...entity1,
                    ...entity2,
                    fooIds: [...entity1.fooIds, ...entity2.fooIds],
                });
            },
        );

        const normalizedData = normalize([topSchema])(denormalizedData);
        expect(normalizedData).toStrictEqual({
            result: ['1', '1'],
            collections: {
                top: {
                    1: {
                        id: '1',
                        entity: TopKey,
                        fooIds: ['1', '2'],
                    },
                },
                foo: {
                    1: {
                        id: '1',
                        entity: FooKey,
                        bar: 'baz',
                    },
                    2: {
                        id: '2',
                        entity: FooKey,
                        bar: 'qux',
                    },
                },
            },
        });
    });
});
