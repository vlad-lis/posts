import { ReactElement } from 'react';
import styles from './PostListItem.module.scss';

type TPostListItemProps = {
  id: number;
  title: string;
  body: string;
};

const PostListItem = ({
  id,
  title,
  body,
}: TPostListItemProps): ReactElement => {
  return (
    <div className={styles.post}>
      <div className={styles['post__title-wrapper']}>
        <p className={styles.post__title}>#{id}</p>
        <h5 className={styles.post__title}>{title}</h5>
      </div>
      <p className={styles.post__body}>{body}</p>
    </div>
  );
};

export default PostListItem;
