import { ReactElement, useEffect, useState } from 'react';
import { TPost, getPosts } from '../../utils/api';
import { POSTS_PER_PAGE } from '../../utils/constants';
import PostListItem from '../../components/PostListItem/PostListItem';

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
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <main>
      <h1>ALL POSTS PAGE</h1>
      <ul>
        {displayedPosts.map((post) => {
          return (
            <li key={post.id}>
              <PostListItem id={post.id} title={post.title} body={post.body} />
            </li>
          );
        })}
      </ul>
      <p>{loadingError}</p>
      <div>
        <button type='button' onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type='button'
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default AllPosts;
