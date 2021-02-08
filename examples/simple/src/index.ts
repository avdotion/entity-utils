import {PostId, PostState, normalizePosts} from './entities/post';
import {CommentState} from './entities/comment';
import {UserState} from './entities/user';
import {fetchPosts} from './resources';

type State = {
    widgets: {
        root: {
            postsIds: PostId[],
        },
    },
} & PostState & CommentState & UserState;

(async (): Promise<State> => {
    const {result, collections} = await fetchPosts()
        .then(Object.values)
        .then(normalizePosts);

    const state = {
        widgets: {
            root: {
                postsIds: result,
            },
        },
        ...collections,
    };

    console.dir(state, {depth: 5});

    return state;
})();
