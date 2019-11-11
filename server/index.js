const express = require('express')
const app = express()
const fs = require('fs')
const md5 = require('md5')
const cors = require('cors')
const prop_reader = require('properties-reader')

// Set server properties
var port = 3001
var data_dir = "./data";
var properties_path = "./server.properties";
if(fs.existsSync(properties_path)) {
  let prop = prop_reader(properties_path)
  let p_port = prop.get('port');
  let p_data_dir = prop.get('data_dir');
  if(p_port !== null) {
    port = p_port;
  }
  if(p_data_dir !== null) {
    data_dir = p_data_dir;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())


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
app.get('/word/view/:word', function(req, res) {
  let path = data_path(to_filename(req.params.word));
  if(fs.existsSync(path)) {
    let word_json = JSON.parse(fs.readFileSync(path));
    res.json(word_json);
  } else {
    res.status(404).send("Word not found: '" + req.params.word + "'");
  }
})

// Create a word
app.post('/word/set', function(req, res){
  let result = {success: false};
  let word = req.body.word || null;
  let json_data = req.body.json_data || null;
  if(word === null || json_data === null) {
    result.error = "Undefined parameter 'word' and/or 'json_data'";
    res.json(result);
    return;
  }
  let file_path = data_path(to_filename(word));
  fs.writeFileSync(file_path, json_data);
  result.success = true;
  res.json(result);
});

// Delete a word
app.get('/word/remove/:word', function(req, res) {
  let result = {success: false};
  let word = req.params.word
  let file_path = data_path(to_filename(word));
  if(!fs.existsSync(file_path)) {
    result.error = "Word '" + word + "' not found";
    res.json(result);
    return;
  }
  fs.unlinkSync(file_path);
  result.success = true;
  res.json(result);
});

app.listen(port, () => {
  console.log("Server running ...");
  console.log("Port: " + port)
  console.log("Data directory: " + data_dir)
})
