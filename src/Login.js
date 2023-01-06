import React from 'react';
import { useState, useEffect } from 'react';

const Login = (props) =>{
    const {user, setUser, exchangeTokenForUser} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
  console.log(user)

    
    useEffect(() => {
      exchangeTokenForUser();
    }, []);
  
    const login = (ev) =>{
      ev.preventDefault();
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password
      }
    })
  })
  .then(response => response.json())
    .then(result => {
        if(!result.success){
            console.log(result);
            throw result.error;
        }
      const token = result.data.token;
      window.localStorage.setItem('token', token);
      console.log(token);
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => response.json())
    .then(result => {
      const user = result.data;
      setUser(user);
    })
    .catch(console.error);
    })
    .catch(err => console.log(err));
    }
    
    const logout = () =>{
      window.localStorage.removeItem('token');
      setUser({});
    }
  
    return(
      <div>
        <h1>Login</h1>
        {
          user._id ? <div className='greeting'> Welcome {user.username}! You can now check out the posts. 
          <button onClick = {logout} className='back'>Log out</button> 
            </div>
          : null
        }
        {
          !user._id ?
        (<div >
        <p className='instruction'>Please log in here!</p>
        <form onSubmit = {login}> 
          <input placeholder = 'username' 
          value ={username} 
          onChange={ ev => setUsername(ev.target.value)}/>
          <input placeholder = 'password' 
          value ={password} 
          onChange={ ev => setPassword(ev.target.value)}/>
          <button>Login</button>
        </form>
        </div>) : null
        }
      </div>
    )
    
  }
  
export default Login;  