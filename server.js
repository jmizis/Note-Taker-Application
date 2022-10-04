const express = require('express');
const path = require('path');
const fs = require('fs');
let dbjson  = require('./db/db.json');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Sends us to the HTML thats in our Public folder
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get ('/api/notes', (req, res) => {
  dbjson = JSON.parse(fs.readFileSync('./db/db.json','utf-8'))
  res.json(dbjson)
})



 


app.post ('/api/notes', (req, res) => {
let costNote = {
  title: req.body.title,
  text: req.body.text,
  id: Math.floor(Math.random()*500)
}
dbjson.push(costNote)
fs.writeFileSync('./db/db.json',JSON.stringify(dbjson))

 res.json(dbjson)});























app.listen(PORT, () =>
  console.log(`Express server port ${PORT}!`)
);