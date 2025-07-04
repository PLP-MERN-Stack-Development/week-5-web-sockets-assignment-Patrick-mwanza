import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { token, saveToken, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navbar token={token} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login saveToken={saveToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<PostForm token={token} />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
