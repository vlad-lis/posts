import { ReactElement } from 'react';

type TPostDetailsrops = {
  id: number;
  title: string;
  body: string;
};

const PostDetails = (): ReactElement => {
  return (
    <section>
      <p>post details</p>
    </section>
  );
};

export default PostDetails;
