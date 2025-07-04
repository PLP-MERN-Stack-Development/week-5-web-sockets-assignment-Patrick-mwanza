import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{post.title}</h2>
          {post.image && <img src={`/uploads/${post.image}`} alt="" className="w-full max-h-64 object-cover mt-2" />}
          <p>{post.content.substring(0, 100)}...</p>
          <Link to={`/post/${post._id}`} className="text-blue-600 mt-2 inline-block">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
