import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Books from './Books';

function Update() {

    const [book, setBooks]= useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    
    const bookId = location.pathname.split("/")[2];
    console.log(bookId)

    const handleChange= (e)=>{
        setBooks((prev)=> ({...prev, [e.target.name]: e.target.value}));
    }
    
    console.log(book);

    const handleAdd=async (e)=>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/books/" + bookId, book)
            navigate("/");
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <div className="form">
            <h1>Update the Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name='title'/>
            <input type="text" placeholder='desc' onChange={handleChange}  name='desc'/>
            <input type="number" placeholder='price' onChange={handleChange} name='price'/>
            <input type="text" placeholder='cover' onChange={handleChange}  name='cover'/>
            <button onClick={handleAdd}>Update</button>
        </div>
    </div>
  )
}

export default Update