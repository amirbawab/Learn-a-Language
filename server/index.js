const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')
const md5 = require('md5')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

var data_dir = "./data";

function data_path(file) {
  return data_dir + '/' + file;
}

function to_filename(file) {
  return md5(file) + ".json";
}

// Greeting
app.get('/', function(req, res) { 
  res.send('Server running ...');
})

// Get all words
app.get('/words', function(req, res) {
  let json = {words: []};
  if(fs.existsSync(data_dir)) {
    let files = fs.readdirSync(data_dir);
    files.forEach(file => {
      let file_data = JSON.parse(fs.readFileSync(data_path(file)));
      json.words.push(file_data.word);
    });
  }
  json.words.sort();
  res.json(json);
})

// Get word
app.get('/word/:word', function(req, res) {
  let path = data_path(to_filename(req.params.word));
  if(fs.existsSync(path)) {
    let word_json = JSON.parse(fs.readFileSync(path));
    res.json(word_json);
  } else {
    res.status(404).send("Word not found: '" + req.params.word + "'");
  }
})

app.post('/word/create', function(req, res){
  let result = {success: false};
  let word = req.body.word || null;
  if(word === null) {
    result.error = "Parameter 'word' is node defined";
    res.json(result);
    return;
  }
  let file_path = data_path(to_filename(word));
  if(fs.existsSync(file_path)) {
    result.error = "Word " + word + " already exists";
    res.json(result);
    return;
  }
  fs.writeFileSync(file_path, JSON.stringify({word: word}));
  result.success = true;
  res.json(result);
});

app.listen(port, () => console.log(`Server listening on port ${port} ...`))
