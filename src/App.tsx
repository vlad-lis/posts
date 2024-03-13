import { Route, Routes } from 'react-router-dom';
import AllPostsPage from './pages/AllPostsPage/AllPostsPage';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AllPostsPage />} />
      <Route path='/posts/:postId' element={<SinglePostPage />} />
    </Routes>
  );
}

export default App;
