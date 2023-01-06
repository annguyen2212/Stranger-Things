import React from 'react';
import { useState, useEffect } from 'react';


const Register = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const  [user, setUser] = useState({});
    
    useEffect(() => {
      const token = window.localStorage.getItem('token');
      if(token){
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
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
    }, []);

  const register =(ev) =>{
    ev.preventDefault();
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
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

  const backout = () =>{
    window.localStorage.removeItem('token');
    setUser({});
  }

  return(
    <div>
      <h1>Register</h1>
      {
        user._id ? <div className='greeting'>Register successfully, you can log in now! 
          <button onClick = {backout} className='back'>Back to Register</button></div> : null
      }
      {
        !user._id ? 
      (<div>
      <p className='instruction'>Please register your information here!</p>
      <form onSubmit = {register}> 
        <input placeholder = 'username' 
        value ={username} 
        onChange={ ev => setUsername(ev.target.value)}/>
        <input placeholder = 'password' 
        value ={password} 
        onChange={ ev => setPassword(ev.target.value)}/>
        <button>Register</button>
      </form>
      </div>) : null
      }
    </div>
  )
  
}

export default Register;
