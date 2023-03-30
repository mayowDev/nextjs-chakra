import fetch from "isomorphic-unfetch";
import Link from "next/link";

const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

const getUserPostsUrl = userId => `${postsUrl}?userId=${userId}`;
const getUserUrl = userId => `${usersUrl}/${userId}`;

const Post = ({ posts, user: { name, username, email, address:{suite, street, city, zipcode} } }) => (
  <div>
    <Link href="/">Back to home</Link>
    
    
    <h2>User ({name}) details </h2>
      <ul>
        <li> Username: {username}</li>
        <li> Email: {email}</li>
        <li> Address: {street}, {suite}, {city}, {zipcode}</li>

        <li></li>
      </ul>

    <h3>Posts by {name}</h3>
    <ul>
      {posts.map(post => (
        <li key={post.title}>
          <Link href={`/post/[id]`} as={`/post/${post.id}`}>
            
              {post.id} - {post.title}
          
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Post.getInitialProps = async ctx => {
  const { userId } = ctx.query;
  const postsResponse = await fetch(getUserPostsUrl(userId));
  const posts = await postsResponse.json();

  const userResponse = await fetch(getUserUrl(userId));
  const user = await userResponse.json();
  return { posts, user };
};

export default Post;
