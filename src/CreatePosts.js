import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreatePosts = (props) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const token = window.localStorage.getItem('token');
    const navigate = useNavigate();

    const {posts, setPosts} = props;

    const createposts = async (ev) =>{
        ev.preventDefault();
        const newPosts = {
            post: {
              title: title,
              description: description,
              price: price,
              location: location,
              willDeliver: true
            }
          }
        await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newPosts)
})
.then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));
  navigate('/posts');
}
    
  return (
    <div>
      <div>
        <form onSubmit = {createposts}>
            <input placeholder ='title' onChange = { (ev) => {
                setTitle(ev.target.value)
                }} 
                value = {title}
                />

            <input placeholder ='price' onChange = { (ev) => {
                setPrice(ev.target.value)
                
                }} 
                value = {price}
                />

            <input placeholder ='location' onChange = { (ev) => {
                setLocation(ev.target.value)
                
                }} 
                value = {location}
                />

            <input placeholder ='title' onChange = { (ev) => {
                setDescription(ev.target.value)
                
                }} 
                value = {description}
                />
            <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePosts;
