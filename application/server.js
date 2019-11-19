const express = require('express')
const app = express()
const fs = require('fs')
const md5 = require('md5')
const cors = require('cors')
const yargs = require('yargs');

(() => {
  yargs.default('port', 3001).alias('p', 'port');

  // Configuration variables
  let port = yargs.argv.port;
  let data_dir = "./data";

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  function data_path(file) {
    return data_dir + '/' + md5(file) + ".json";
  }

  // Ok
  app.get('/ok', function(req, res) {
    res.json({success: true});
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
    let file_path = data_path(word);
    fs.writeFileSync(file_path, json_data);
    result.success = true;
    res.json(result);
  });

  // Delete a word
  app.get('/word/remove/:word', function(req, res) {
    let result = {success: false};
    let word = req.params.word
    let file_path = data_path(word);
    if(!fs.existsSync(file_path)) {
      result.error = "Word '" + word + "' not found";
      res.json(result);
      return;
    }
    fs.unlinkSync(file_path);
    result.success = true;
    res.json(result);
  });

  // Start server
  app.listen(port, () => {
    console.log("Server running on port " + port);
  })
})();
