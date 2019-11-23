/**
 * LL_WORD ENGINE
 * This engine simply populates the data
 */

const fs = require('fs');
const md5 = require('md5');
const watch = require('watch');
const yargs = require('yargs');
const path = require('path');

function read_data(data_dir) {
  let words = [];
  if(fs.existsSync(data_dir)) {
    let files = fs.readdirSync(data_dir);
    files.forEach(file => {
      if(file.endsWith(".json")) {
        console.log("  - Parsing file:", file)
        try {
          let file_data = JSON.parse(fs.readFileSync(data_dir + "/" + file));
          words.push(file_data);
        } catch(e) {
          console.log("  X Failed to parse file:", file);
        }
      }
    });
  } else {
    console.log("Path " + data_dir + " not found!");
    process.exit(1);
  }
  return words;
}

function json_to_typescript(words) {
  let ts_buffer = "";
  words.forEach((word) => {
    ts_buffer += `
      this.add_word(LLWordData.from_json(${JSON.stringify(word)}));
    `;
  });
  return ts_buffer;
}

function create_static_data(content) {
  const STATIC_DATA_DIR = "./src/db/";
  const TEMPLATE_FILE = STATIC_DATA_DIR + "StaticData.template.tsx";
  const DESTINATION_FILE = STATIC_DATA_DIR + "StaticData.tsx";

  let file_content = fs.readFileSync(TEMPLATE_FILE, "utf8");
  let updated_file_content = (
`/**
  * THIS FILE IS AUTO-GENERATED BY LL_WORD ENGINE
  * DO NOT MODIFY THE CONTENT OF THIS FILE
  * BECAUSE THEY WILL BE OVERWRITTEN
  */
` + file_content.replace("/* STATIC DATA */", content));
  fs.writeFileSync(DESTINATION_FILE, updated_file_content);
}

function compile(data_dir, should_watch, callback) {
  callback(data_dir);
  if(should_watch === true) {
    console.log("Watching changes ...")
    watch.watchTree(data_dir, function (file, curr, prev) {
      let file_str = new String(file);
      if(file_str.endsWith(".json")) {
        callback(data_dir);
      }
    })
  }
}

(() => {
  yargs.option('watch', {
    alias: 'w',
    type: 'boolean',
    description: 'Watch for data changes'
  })

  let json_dir = path.resolve(`${__dirname}/../example_words/`);
  if(process.env.LL_DATA_DIR) {
    json_dir = process.env.LL_DATA_DIR;
  }

  compile(json_dir, yargs.argv.watch, (data_dir) => {
    console.log(">> Compiling JSON files at '" + data_dir + "' into static data ...");
    let json_data = read_data(data_dir);
    let ts_content = json_to_typescript(json_data);
    create_static_data(ts_content);
    console.log(">> Done");
  });
})();
