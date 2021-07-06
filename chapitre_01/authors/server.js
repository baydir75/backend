const express = require('express');
const app = express();


const port = 8000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

app.get('/', (req, res) => {
  res.send("Authors API");
});

app.get('/authors/:item', (req, res) => {
   res.send(`name : ${authors[req.params.item].name} & nationality :  ${authors[req.params.item].nationality}`);
});

app.get('/authors/:item/books', (req, res) => {
  res.send(`books : ${authors[req.params.item].books}`);
});

let authors = [
  {
      name: "Lawrence Nowell",
      nationality: "UK",
      books: ["Beowulf"]
  },
  {
      name: "William Shakespeare",
      nationality: "UK",
      books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
  },
  {
      name: "Charles Dickens",
      nationality: "US",
      books: ["Oliver Twist", "A Christmas Carol"]
  },
  {
      name: "Oscar Wilde",
      nationality: "UK",
      books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
  },
]