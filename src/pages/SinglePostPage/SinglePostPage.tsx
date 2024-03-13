import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../../components/PostDetails/PostDetails';
import { TPost, getPost } from '../../utils/api';

const SinglePostPage = (): ReactElement => {
  const { postId } = useParams<{ postId: string }>();
  const [loadingError, setLoadingError] = useState<string>('');
  const [loadedPost, setLoadedPost] = useState<TPost | undefined>(undefined);

  // load post data
  useEffect(() => {
    if (!postId) {
      setLoadingError('Error fetching data: corrupt post ID');
      return;
    }

    const loadPost = async () => {
      try {
        const res = await getPost(postId);
        console.log(res.data);
        if (res.success && res.data) {
          setLoadedPost(res.data);
        } else if (res.status) {
          setLoadingError(`Error fetching post data: ${res.status}`);
        } else {
          setLoadingError('Something went wrong');
        }
      } finally {
        console.log('done');
      }
    };

    loadPost();
  }, [postId]);

  return (
    <main>
      <PostDetails />
      <p>{loadingError}</p>
    </main>
  );
};

export default SinglePostPage;
