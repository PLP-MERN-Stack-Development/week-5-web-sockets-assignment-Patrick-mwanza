import { useEffect, useState } from 'react';
import { getPost } from '../services/api';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost(id);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100">
        <p className="text-lg text-gray-700 font-medium animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-red-600 mb-6">{post.title}</h1>

        {post.image && (
          <img
            src={`/uploads/${post.image}`}
            alt="Post"
            className="w-full rounded-lg mb-6 shadow-md object-cover max-h-96"
          />
        )}

        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;
