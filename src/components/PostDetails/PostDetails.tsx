import { ReactElement } from 'react';
import styles from './PostDetails.module.scss';

type TPostDetailsrops = {
  title: string | undefined;
  body: string | undefined;
  author: string | undefined;
};

const PostDetails = ({
  title,
  body,
  author,
}: TPostDetailsrops): ReactElement => {
  return (
    <section className={styles.post}>
      <h3 className={styles.post__heading}>
        <span className={styles.post__title}>{title}</span>
        <br />
        By {author}
      </h3>
      <p className={styles.post__body}>{body}</p>
    </section>
  );
};

export default PostDetails;
