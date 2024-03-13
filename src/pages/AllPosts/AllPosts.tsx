import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TPost, getPosts } from '../../utils/api';
import { POSTS_PER_PAGE } from '../../utils/constants';
import PostListItem from '../../components/PostListItem/PostListItem';
import Pagination from '../../components/Pagination/Pagination';
import styles from './AllPosts.module.scss';

const AllPosts = (): ReactElement => {
  const [loadedPosts, setLoadedPosts] = useState<TPost[]>([]);
  const [loadingError, setLoadingError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // load initial posts
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

  // pagination vars
  const totalPages = Math.ceil(loadedPosts.length / POSTS_PER_PAGE);
  const lastDisplayedPostIndex = currentPage * POSTS_PER_PAGE;
  const firstDisplayedPostIndex = lastDisplayedPostIndex - POSTS_PER_PAGE;
  const displayedPosts = loadedPosts.slice(
    firstDisplayedPostIndex,
    lastDisplayedPostIndex
  );

  // pagination clicks
  const handlePrevPageClick = () => setCurrentPage(currentPage - 1);
  const handleNextPageClick = () => setCurrentPage(currentPage + 1);

  return (
    <main className={styles.allposts}>
      <h1 className={styles.allposts__title}>Post Feed Explorer</h1>
      <div className={styles.allposts__pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevClick={handlePrevPageClick}
          onNextClick={handleNextPageClick}
        />
      </div>
      <ul className={styles.allposts__list}>
        {displayedPosts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`} className={styles.allposts__post}>
                <PostListItem
                  id={post.id}
                  title={post.title}
                  body={post.body}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <p>{loadingError}</p>
    </main>
  );
};

export default AllPosts;
