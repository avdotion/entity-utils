import React, {useEffect, useState} from 'react';
import {Post, postGetters} from './entities/post';
import {selectPostsByIds} from './entities/post/selectors';

import {fetchPosts} from './resources';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts()
      .then(({result: postsIds, collections: state}) => selectPostsByIds(state, {ids: postsIds}))
      .then(posts => {
          setPosts(posts);
      })
      .finally(() => {
          setIsLoading(false);
      });
  }, []);

  return isLoading ? (
      <p>Not loaded!</p>
  ) : (
      <div>
        {posts.map(post => (
            <p key={postGetters.id(post)}>{postGetters.title(post)}</p>
        ))}
      </div>
  );
};

export default App;
