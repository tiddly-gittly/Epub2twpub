#!/usr/bin/env node

const fs = require("fs"),
    path = require("path"),
    { promisify } = require("util"),
    writeFileAsync = promisify(fs.writeFile),
    { EpubReader } = require("./epub2twpub/epub-reader"),
    { TwpubPlugin } = require("./epub2twpub/twpub-plugin");


async function e2t_main(epubFile, outputFile) {
    let e2t = { version: "" };
    e2t.version = require("./package.json").version;
    // Setup the epub
    let epubReader = new EpubReader(e2t);
    await epubReader.load(epubFile);
    // Create the twpub plugin
    let twpubPlugin = new TwpubPlugin(e2t, { epubReader: epubReader });
    // Convert the epub
    twpubPlugin.convertEpub();
    // Save the twpub plugin
    await writeFileAsync(outputFile, twpubPlugin.getPluginText(), "utf8");
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
                await e2t_main(`${epubFolderPath}/${f}`, `${outputFolderPath}/${fileName}.json`);
                console.log(`Converted "${fileName}.json"`);
            } catch (error) {
                console.log(error);
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