import React,{useState} from 'react'
import { useRouter } from 'next/navigation';

import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import inputnStyles from '../../styles/Input.module.css'


const users = `https://jsonplaceholder.typicode.com/users`;
const getUser = id => `${users}/${id}`;

const Post = ({post: { id, title, body }, user}) =>{
  const router = useRouter()
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(body)

  const handleEditPost = (id)=> {
    const localPosts = JSON.parse(localStorage.getItem("posts")) ;   

    const newPost = {
      id,
      title: newTitle,
      body: newDescription,
      userId: user.id,
    }
    for (var i in localPosts) {
      if (localPosts[i].id == id) {
         localPosts[i] = newPost;
         break; 
      }
    }
    
    localStorage.setItem("posts", JSON.stringify(localPosts) );
    router.push('/posts'); 

  }
   return (
  <div>
    <Link href="/">Back to home</Link>
    <h1>Edit Post {id} - {title}</h1>
    <p>Title:</p> 

    <input  
      className={inputnStyles.input}
      onChange={e=>setNewTitle(e.target.value)}
      value={newTitle} 
      type="text"
      />
    
    <p>Description:</p> 
    <input 
      className={inputnStyles.input}
      onChange={e=>setNewDescription(e.target.value)}
      value={newDescription}       
      type="text"
    />
    <br/> {" "}
      <Button onClick={()=>handleEditPost(id)} flex='1'leftIcon={<CheckCircleIcon />} colorScheme='blue'>
      Save Changes
      </Button>


  </div>

)
}

Post.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const posts = JSON.parse(localStorage.getItem("posts")) ;   

  let post 

  for (var i in posts) {
    if (posts[i].id == id) {
      post = posts[i] ;
       break; 
    }
  }

  const userResponse = await fetch(getUser(post.userId));
  const user = await userResponse.json();

  return { post, user };
};

export default Post;
