import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../../components/PostDetails/PostDetails';
import {
  TComment,
  TPost,
  TUserInfo,
  getComments,
  getPost,
  getUser,
} from '../../utils/api';
import styles from './SinglePostPage.module.scss';
import CommentItem from '../../components/CommentItem/CommentItem';

const SinglePostPage = (): ReactElement => {
  const { postId } = useParams<{ postId: string }>();
  const [loadingError, setLoadingError] = useState<string>('');
  const [loadedPost, setLoadedPost] = useState<TPost | null>(null);
  const [postAuthor, setPostAuthor] = useState<TUserInfo | null>(null);
  const [postComments, setPostComments] = useState<TComment[]>([]);

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

          // get user info
          const { userId } = postRes.data;
          const userRes = await getUser(userId);

          if (userRes.success && userRes.data) {
            setPostAuthor(userRes.data);
          }

          // get post comments
          const commentsRes = await getComments(postId);

          if (commentsRes.success && commentsRes.data) {
            setPostComments(commentsRes.data);
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
      <h6 className={styles['singlepost__comments-title']}>Comments:</h6>
      <ul className={styles.singlepost__comments}>
        {postComments.map((comment) => {
          return (
            <li key={comment.id}>
              <CommentItem email={comment.email} body={comment.body} />
            </li>
          );
        })}
      </ul>
      <p>{loadingError}</p>
    </main>
  );
};

export default SinglePostPage;
