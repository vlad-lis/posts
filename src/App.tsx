import { Route, Routes } from 'react-router-dom';
import AllPosts from './pages/AllPosts/AllPosts';
import SinglePost from './pages/SinglePost/SinglePost';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AllPosts />} />
      <Route path='/posts/:postId' element={<SinglePost />} />
    </Routes>
  );
}

export default App;
