#!/usr/bin/env node

/*
 * Slice all the epubs
 * node -e \"require('./bin/slice-epubs').slice_epubs();"
 */


const fs = require("fs"),
    path = require("path");
const { execSync } = require('child_process');


/** 项目路径 */
const repoFolder = path.join(path.dirname(__filename), '..');


/**
 * 执行命令行指令，并打印该指令的结果
 * @param {string} command 要执行的命令
 * @param {object} options execSync的参数
 */
function shell(command, options) {
    if (options !== undefined) options = {};
    console.log(String(execSync(command, {
        cwd: repoFolder,
        ...options,
    })));
}
/**
 * 执行命令行指令，并打印该指令的结果，同时忽略任何错误
 * @param {string} command 要执行的命令
 * @param {object} options execSync的参数
 */
function shellI(command, options) {
    try {
        shell(command, options);
    } catch (error) {
        console.error(`[Shell Command Error] ${error}`)
    }
}

/**
 * 创建多层目录
 * @param {string} dirs 多层目录字符串，例如'./tmp/twpubs'
*/
function mkdirs(dirs) {
    if (!fs.existsSync(dirs)) {
        fs.mkdirSync(dirs, { recursive: true });
    }
}

/**
 * 比较数组，找出两个数组中不同的元素。
 * @param {Array} arr1  数组A
 * @param {Array} arr2  数组B
 * @returns {Array} 返回一个数组类型的结果。
*/
const filterArr = (arr1, arr2) => {
    const arr = [...arr1, ...arr2];
    const newArr = arr.filter((t) => {
        return !(arr1.includes(t) && arr2.includes(t));
    });
    return newArr;
};


/**
 * 转换epub图书为TW-PUB
 * @param {string} epubFolderPath epub文件夹路径，空或者不填默认为'./epubs'
 * @param {string} outputFolderPath 输出文件夹路径，空或者不填默认为'./output'
*/
function slice_epubs(epubFolderPath, outputFolderPath) {

    // 检查参数。 
    if (typeof epubFolderPath !== 'string' || epubFolderPath.length === 0) epubFolderPath = './epubs';
    if (typeof outputFolderPath !== 'string' || outputFolderPath.length === 0) outputFolderPath = './output';

    mkdirs(outputFolderPath);

    fs.readdir(epubFolderPath, (err, files) => {
        files.forEach(f => {
            let fileName = f.split(".")[0];
            let suffix = f.split('.').pop();
            if (suffix == "epub") {
                console.log(`Converting "${epubFolderPath}/${f}"`);
                shellI(`node epub2twpub/index.js --epub "${epubFolderPath}/${f}" --output "${outputFolderPath}/${fileName}.json" || exit 1`);
                // TODO：我们可以通过shell函数 + 捕获错误的方法，筛选出不可以转换的书籍。我们可以把他加入到失败列表，并永久从成功列表删除，直到可以被转换。
            } else {
                console.log("Non-epub file. Skip Convert :: " + f);
            }
        });
        console.log("全部转换完成！");
    });
}


module.exports = {
    slice_epubs: slice_epubs,
    mkdirs: mkdirs,
}