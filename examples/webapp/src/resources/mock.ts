import {DenormalizedPost} from '../entities/post';

export const MOCK: Record<number, DenormalizedPost> = {
    1: {
        id: 1,
        title: 'Post 1',
        content: 'Post 1 body',
        comments: {
            1: {
                id: 1,
                postId: 1,
                body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
                upVotes: 100,
                author: {
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
                            lat: '43.9509',
                            lng: '34.4618',
                        }
                    },
                    phone: '010-692-6593 x09125',
                    website: 'anastasia.net',
                    company: {
                        name: 'Deckow-Crist',
                        catchPhrase: 'Proactive didactic contingency',
                        bs: 'synergize scalable supply-chains',
                    },
                },
                publicationTs: 1578614500,
            },
            2: {
                id: 2,
                postId: 1,
                body: 'est natus enim nihil est dolore omnis voluptatem numquam\\net omnis occaecati quod ullam at\\nvoluptatem error expedita pariatur\\nnihil sint nostrum voluptatem reiciendis et',
                upVotes: -100,
                author: {
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
                        }
                    },
                    phone: '1-770-736-8031 x56442',
                    website: 'hildegard.org',
                    company: {
                        name: 'Romaguera-Crona',
                        catchPhrase: 'Multi-layered client-server neural-net',
                        bs: 'harness real-time e-markets',
                    }
                },
                publicationTs: 1578614700,
            },
        },
        author: {
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
                }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets',
            }
        },
        relatedPosts: [],
        publicationTs: 1578614400,
    },
    2: {
        id: 2,
        title: 'Post 1',
        content: 'Post 1 body',
        comments: {},
        author: {
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
                    lat: '43.9509',
                    lng: '34.4618',
                }
            },
            phone: '010-692-6593 x09125',
            website: 'anastasia.net',
            company: {
                name: 'Deckow-Crist',
                catchPhrase: 'Proactive didactic contingency',
                bs: 'synergize scalable supply-chains',
            },
        },
        relatedPosts: [],
        publicationTs: 1578615400,
    },
    3: {
        id: 3,
        title: 'Post 3',
        content: 'Post 3 body',
        comments: {},
        author: {
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
                    lat: '43.9509',
                    lng: '34.4618',
                }
            },
            phone: '010-692-6593 x09125',
            website: 'anastasia.net',
            company: {
                name: 'Deckow-Crist',
                catchPhrase: 'Proactive didactic contingency',
                bs: 'synergize scalable supply-chains',
            },
        },
        relatedPosts: [],
        publicationTs: 1578616400,
    },
    4: {
        id: 4,
        title: 'Post 4',
        content: 'Post 4 body',
        comments: {},
        author: {
            id: 3,
            name: 'Clementine Bauch',
            username: 'Samantha',
            email: 'Nathan@yesenia.net',
            address: {
                street: 'Douglas Extension',
                suite: 'Suite 847',
                city: 'McKenziehaven',
                zipcode: '59590-4157',
                geo: {
                    lat: '-68.6102',
                    lng: '-47.0653',
                }
            },
            phone: '1-463-123-4447',
            website: 'ramiro.info',
            company: {
                name: 'Romaguera-Jacobson',
                catchPhrase: 'Face to face bifurcated interface',
                bs: 'e-enable strategic applications',
            }
        },
        relatedPosts: [],
        publicationTs: 1578617400,
    },
    5: {
        id: 5,
        title: 'Post 5',
        content: 'Post 5 body',
        comments: {},
        author: {
            id: 4,
            name: 'Patricia Lebsack',
            username: 'Karianne',
            email: 'Julianne.OConner@kory.org',
            address: {
                street: 'Hoeger Mall',
                suite: 'Apt. 692',
                city: 'South Elvis',
                zipcode: '53919-4257',
                geo: {
                    lat: '29.4572',
                    lng: '-164.2990',
                }
            },
            phone: '493-170-9623 x156',
            website: 'kale.biz',
            company: {
                name: 'Robel-Corkery',
                catchPhrase: 'Multi-tiered zero tolerance productivity',
                bs: 'transition cutting-edge web services',
            }
        },
        relatedPosts: {
            1: {
                id: 1,
                title: 'Post 1',
                content: 'Post 1 body',
                comments: {
                    1: {
                        id: 1,
                        postId: 1,
                        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
                        upVotes: 100,
                        author: {
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
                                    lat: '43.9509',
                                    lng: '34.4618',
                                }
                            },
                            phone: '010-692-6593 x09125',
                            website: 'anastasia.net',
                            company: {
                                name: 'Deckow-Crist',
                                catchPhrase: 'Proactive didactic contingency',
                                bs: 'synergize scalable supply-chains',
                            },
                        },
                        publicationTs: 1578614500,
                    },
                    2: {
                        id: 2,
                        postId: 1,
                        body: 'est natus enim nihil est dolore omnis voluptatem numquam\\net omnis occaecati quod ullam at\\nvoluptatem error expedita pariatur\\nnihil sint nostrum voluptatem reiciendis et',
                        upVotes: -100,
                        author: {
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
                                }
                            },
                            phone: '1-770-736-8031 x56442',
                            website: 'hildegard.org',
                            company: {
                                name: 'Romaguera-Crona',
                                catchPhrase: 'Multi-layered client-server neural-net',
                                bs: 'harness real-time e-markets',
                            }
                        },
                        publicationTs: 1578614700,
                    },
                },
                author: {
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
                        }
                    },
                    phone: '1-770-736-8031 x56442',
                    website: 'hildegard.org',
                    company: {
                        name: 'Romaguera-Crona',
                        catchPhrase: 'Multi-layered client-server neural-net',
                        bs: 'harness real-time e-markets',
                    }
                },
                relatedPosts: [],
                publicationTs: 1578614400,
            },
            2: {
                id: 2,
                title: 'Post 1',
                content: 'Post 1 body',
                comments: {},
                author: {
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
                            lat: '43.9509',
                            lng: '34.4618',
                        }
                    },
                    phone: '010-692-6593 x09125',
                    website: 'anastasia.net',
                    company: {
                        name: 'Deckow-Crist',
                        catchPhrase: 'Proactive didactic contingency',
                        bs: 'synergize scalable supply-chains',
                    },
                },
                relatedPosts: [],
                publicationTs: 1578615400,
            },
        },
        publicationTs: 1578618400,
    },
};
