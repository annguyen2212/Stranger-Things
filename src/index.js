import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Posts from './Posts';
import CreatePosts from './CreatePosts';


const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const token = window.localStorage.getItem('token');
  
  const getPosts = async () => {
    await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
    .then(response => response.json())
    .then(result => {
      const post = result.data.posts;
      setPosts(post);
    })
    .catch(console.error);
  }

  const exchangeTokenForUser = async () => {
    
    if(token){
      await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.json())
        .then(result => {
          const user = result.data;
          setUser(user);
        })
        .catch(err => console.log(err));    
      }
}

  useEffect( ()=>{
    getPosts();
    if(token){
      exchangeTokenForUser();
    }
  },[])
  return (
    <div>
     <div className='header'>
      <h1>Strangers Things</h1>
      <nav>
        <Link to='/register' >Register</Link>
        <Link to='/login' >Login</Link>
        <Link to='/posts' >Posts</Link>
      </nav>
      </div>
      <Routes>
        <Route path='/register' element={ <Register/>} />
        <Route path='/login' element={ <Login user = {user} setUser={setUser} exchangeTokenForUser={ exchangeTokenForUser }/>} />
        <Route path='/posts' element= {<Posts posts = {posts} getPosts={ getPosts } user= {user}/>}/>
        <Route path='/createposts' element = {<CreatePosts posts = {posts} setPosts = {setPosts} />}/>
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
