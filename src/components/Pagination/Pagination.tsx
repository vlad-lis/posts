import { ReactElement } from 'react';

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
    <div>
      <button type='button' onClick={onPrevClick} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        type='button'
        onClick={onNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
