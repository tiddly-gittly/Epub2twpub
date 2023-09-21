#!/usr/bin/env node

const fs = require("fs"),
    { promisify } = require("util"),
    readFileAsync = promisify(fs.readFile),
    writeFileAsync = promisify(fs.writeFile),
    { Epub2twpub } = require("./epub2twpub/index");


async function convertEpub(epubFile, outputFile) {
    const App = new Epub2twpub(epubFile);
    const pluginText = await App.convert();
    await writeFileAsync(outputFile, pluginText, "utf8");
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
 * 转换epub图书为TW-PUB
 * @param {string} epubFolderPath epub文件夹路径，空或者不填默认为'./epubs'
 * @param {string} outputFolderPath 输出文件夹路径，空或者不填默认为'./output'
*/
async function slice_epubs(epubFolderPath, outputFolderPath) {

    // 检查参数。 
    if (typeof epubFolderPath !== 'string' || epubFolderPath.length === 0) epubFolderPath = './epubs';
    if (typeof outputFolderPath !== 'string' || outputFolderPath.length === 0) outputFolderPath = './output';

    mkdirs(outputFolderPath);

    let files = fs.readdirSync(epubFolderPath);
    for (i in files) {
        let f = files[i];
        let fileName = f.split(".")[0];
        let suffix = f.substring(f.lastIndexOf(".") + 1);
        if (suffix == "epub") {
            try {
                await convertEpub(`${epubFolderPath}/${f}`, `${outputFolderPath}/${fileName}.json`);
                console.log(`Converted "${fileName}.json"`);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log(`Skip Convert :: "${f}" Non-epub file.`);
        }
    }
}


// 需要考虑异步和同步的问题。异步具有传染性，一个异步则全部异步。
async function main() {
    // 加入CL问询功能。
    console.log("开始执行转换！");
    await slice_epubs();
    console.log("全部转换完成！按任意键退出。");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}


main();