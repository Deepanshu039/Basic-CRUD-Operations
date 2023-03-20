import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from 'dotenv'

const app = express();

dotenv.config();

// console.log(process.env.DATABASE_URL);

const db = mysql.createConnection(process.env.DATABASE_URL);

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "12345",
//     database: "new_schema_test"
// })

app.use(express.json());
app.use(cors());

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
});

app.get("/", (req, res) => {
  res.json("hellow this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id= ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ?, `price`= ? WHERE id= ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book updated");
  });
});

app.listen(8800, () => {
  console.log("connected to backend__");
});
