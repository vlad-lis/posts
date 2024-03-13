import { ReactElement } from 'react';
import styles from './Pagination.module.scss';

type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
}: TPaginationProps): ReactElement => {
  return (
    <div className={styles.pagination}>
      <button
        type='button'
        className={styles.pagination__btn}
        onClick={onPrevClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className={styles.pagination__page}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        type='button'
        className={styles.pagination__btn}
        onClick={onNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
