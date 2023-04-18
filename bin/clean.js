#!/usr/bin/env node

// # Remove output files

// rm -rf output
// rm -rf tmp

const fs = require('fs');

function deleteall(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteall(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


function clean(){
  deleteall('./output');
}


module.exports = {
  clean: clean,
};