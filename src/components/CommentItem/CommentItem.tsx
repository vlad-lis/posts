import { ReactElement } from 'react';
import styles from './CommentItem.module.scss';

type TCommentProps = {
  email: string;
  body: string;
};

const CommentItem = ({ email, body }: TCommentProps): ReactElement => {
  return (
    <div className={styles.comment}>
      <p className={styles.comment__text}>
        By <span className={styles.comment__email}>{email}</span>
      </p>
      <p className={styles.comment__text}>{body}</p>
    </div>
  );
};

export default CommentItem;
