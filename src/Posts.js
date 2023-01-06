import React from 'react';
import { Link} from 'react-router-dom';
import { useEffect } from 'react';


const Posts = (props) =>{
  const posts = props.posts;
  const getPosts = props.getPosts;
  const user = props.user;
  const token = window.localStorage.getItem('token');
 console.log(posts)

const handleClick = (postId) =>{
  fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postId}`, {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
  .then(result => {
    console.log(result);
    getPosts();
  })
  .catch(console.error);
}

    useEffect(() => {
      getPosts()
    }, [])
    return(
        <div>
      <h1>Posts</h1>
      <Link to='/createposts' ><button className = 'createpost'>Create Posts</button></Link>

      { posts.length ?
        (posts.map((post) => {
            return(
                <div key ={post._id} className='post'>
                    <div>Title: {post.title}</div>
                    <div>Price: {post.price}</div>
                    <div>Location: {post.location}</div>
                    <div>{post.description}</div>
                    <div>Author: {post.author.username}</div>
                    {
                      post.author._id === user._id ? <button onClick = {
                        (ev) => handleClick(post._id) 
                      }>Delete</button> : null
                    }
                </div>
            )
        })) : null
      }
      </div>
    );
    
  };

  export default Posts;