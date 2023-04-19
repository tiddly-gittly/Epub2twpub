#!/usr/bin/env node

// import fs from 'fs';
// import { dirname } from 'path';
// const basePath = process.pkg ? dirname(process.argv[0]) : process.cwd();

const { createInterface } = require('readline');
const { slice_epubs, mkdirs } = require('./bin/slice-epubs');

const q1 = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function main() {
    // console.log(basePath);
    console.log("请将书籍放入epubs目录中。")
    // mkdirs("./epubs");
    q1.question("是否转换epubs文件夹中的书籍? (y/n)  \n", function (answer) {
        if (answer == "y") {
            slice_epubs();
            q1.close();
        } else {
            q1.close();
        }
    });
}

main();