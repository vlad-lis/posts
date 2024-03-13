import { ReactElement } from 'react';

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
    <>
      <p>{id}</p>
      <p>{title}</p>
      <p>{body}</p>
    </>
  );
};

export default PostListItem;
