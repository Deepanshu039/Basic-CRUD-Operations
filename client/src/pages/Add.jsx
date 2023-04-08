import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Add() {

    const [book, setBooks]= useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });
    const [error,setError] = useState(false)

    const navigate = useNavigate();

    const handleChange= (e)=>{
        setBooks((prev)=> ({...prev, [e.target.name]: e.target.value}));
    }
    
    console.log(book);

    const handleClick=async (e)=>{
        e.preventDefault()
        try{
            await axios.post("https://crud-app-apis.onrender.com/books", book)
            navigate("/");
        }catch(err){
            console.log(err)
            setError(true);
        }
    }

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  )
}

export default Add;