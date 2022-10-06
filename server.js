const express = require('express');
const path = require('path');
const fs = require('fs');
let dbjson  = require('./db/db.json');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Sends file to the server.
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// Sending the file to the server.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Taking input from the front end and posting to database using index.js.
app.get ('/api/notes', (req, res) => {
  dbjson = JSON.parse(fs.readFileSync('./db/db.json','utf-8'))
  res.json(dbjson)
})



 

// Posts the new note that was typed out. 
app.post ('/api/notes', (req, res) => {
let costNote = {
  title: req.body.title,
  text: req.body.text,
  id: Math.floor(Math.random()*500)
}

// Pushing the note to rewrite the file.
dbjson.push(costNote)
fs.writeFileSync('./db/db.json',JSON.stringify(dbjson))
// Back end sending changes to the front end.
 res.json(dbjson)});






 app.listen(PORT, () =>
 console.log(`Express server http://localhost:${PORT}`)
);
















