import { ReactElement, useEffect, useState } from 'react';
import { TPost, getPosts } from '../../utils/api';

const AllPosts = (): ReactElement => {
  const [loadedPosts, setLoadedPosts] = useState<TPost[]>([]);
  const [loadingError, setLoadingError] = useState<string>('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getPosts();
        if (res.success && res.data) {
          setLoadedPosts(res.data);
        } else if (res.status) {
          setLoadingError(`Error fetching data: ${res.status}`);
        } else {
          setLoadingError('Something went wrong');
        }
      } finally {
        console.log('done');
      }
    };

    loadPosts();
  }, []);

  return (
    <main>
      <p>ALL POSTS PAGE</p>
      <ul>
        {loadedPosts.map((post) => {
          return (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </li>
          );
        })}
      </ul>
      <p>{loadingError}</p>
    </main>
  );
};

export default AllPosts;
