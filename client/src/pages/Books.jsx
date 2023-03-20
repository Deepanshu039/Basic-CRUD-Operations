import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {

    const [books, setBooks]= useState([])

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try{
                const res= await axios.get("http://localhost:8800/books")
                console.log(res)
                setBooks(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete=async (id)=>{
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    // const handleUpdate= async (id)=>{
    //     try{
    //         await axios.patch("http://localhost:8800/books"+id)
    //     }
    // }

  return (
    <div>
        <h1>Lama Book Shop</h1>
        <div className="books">
            {
                books.map((book)=> (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <div className="delete" onClick={()=>handleDelete(book.id)}>Delete</div>
                        <div className="update" ><Link to={`/update/${book.id}`}>Update</Link></div>
                    </div>
                ))
            }
        </div>

        <button>
            <Link to="/add">Add new book</Link>
        </button>
    </div>
  )
}

export default Books