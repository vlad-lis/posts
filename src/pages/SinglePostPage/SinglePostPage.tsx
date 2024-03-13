import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../../components/PostDetails/PostDetails';
import { TPost, TUserInfo, getPost, getUser } from '../../utils/api';
import styles from './SinglePostPage.module.scss';

const SinglePostPage = (): ReactElement => {
  const { postId } = useParams<{ postId: string }>();
  const [loadingError, setLoadingError] = useState<string>('');
  const [loadedPost, setLoadedPost] = useState<TPost | null>(null);
  const [postAuthor, setPostAuthor] = useState<TUserInfo | null>(null);

  // load post and user data
  useEffect(() => {
    if (!postId) {
      setLoadingError('Error fetching data: corrupt post ID');
      return;
    }

    const loadPost = async () => {
      try {
        const postRes = await getPost(postId);

        if (postRes.success && postRes.data) {
          setLoadedPost(postRes.data);

          const { userId } = postRes.data;
          const userRes = await getUser(userId);

          if (userRes.success && userRes.data) {
            setPostAuthor(userRes.data);
          }
        }
      } catch (err) {
        setLoadingError(`An error occurred while fetching data: ${err}`);
      } finally {
        console.log('done');
      }
    };

    loadPost();
  }, [postId]);

  return (
    <main className={styles.singlepost}>
      <PostDetails
        title={loadedPost?.title}
        body={loadedPost?.body}
        author={postAuthor?.name}
      />
      <p>{loadingError}</p>
    </main>
  );
};

export default SinglePostPage;
