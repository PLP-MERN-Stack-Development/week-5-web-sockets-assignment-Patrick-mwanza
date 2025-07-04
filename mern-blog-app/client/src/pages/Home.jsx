import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts();
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-teal-100 to-green-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold text-teal-700 mb-10 text-center">
        Latest Posts
      </h1>
      <div className="w-full max-w-4xl">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Home;
