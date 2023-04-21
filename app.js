#!/usr/bin/env node

const fs = require("fs"),
	path = require("path"),
	{promisify} = require("util"),
	writeFileAsync = promisify(fs.writeFile),
	{EpubReader} = require("./epub2twpub/epub-reader"),
	{TwpubPlugin} = require("./epub2twpub/twpub-plugin");


let E2T = new Object();
E2T.version = require("./package.json").version;


async function e2t_main(epubFile, outputFile) {

    // 设置输入输出文件。
    E2T.epubFile = epubFile; 
    E2T.outputFile = outputFile;

    // Setup the epub
    E2T.epubReader = new EpubReader(E2T);
    await E2T.epubReader.load(E2T.epubFile);
    // Create the twpub plugin
    E2T.twpubPlugin = new TwpubPlugin(E2T,{epubReader: E2T.epubReader});
    // Convert the epub
    E2T.twpubPlugin.convertEpub();
    // Save the twpub plugin
    await writeFileAsync(E2T.outputFile,E2T.twpubPlugin.getPluginText(),"utf8");

    console.log(`Converted "${epubFile}"`);

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
function slice_epubs(epubFolderPath, outputFolderPath) {

    // 检查参数。 
    if (typeof epubFolderPath !== 'string' || epubFolderPath.length === 0) epubFolderPath = './epubs';
    if (typeof outputFolderPath !== 'string' || outputFolderPath.length === 0) outputFolderPath = './output';

    mkdirs(outputFolderPath);

    fs.readdir(epubFolderPath, (err, files) => {
        files.forEach(f => {
            let fileName = f.split(".")[0];
            let suffix = f.substring(f.lastIndexOf(".")+1);
            if (suffix == "epub") {
                e2t_main(`${epubFolderPath}/${f}`, `${outputFolderPath}/${fileName}.json`).then(() => {
                    process.exit(0);
                }).catch(err => {
                    console.error(err);
                    process.exit(1);
                });
                // shellI(`node epub2twpub/index.js --epub "${epubFolderPath}/${f}" --output "${outputFolderPath}/${fileName}.json" || exit 1`);
                // TODO：我们可以通过shell函数 + 捕获错误的方法，筛选出不可以转换的书籍。我们可以把他加入到失败列表，并永久从成功列表删除，直到可以被转换。
            } else {
                console.log(`Skip Convert :: "${f}" Non-epub file.`);
            }
        });
    });
}


console.log("开始执行转换！");
slice_epubs();

// 需要考虑异步和同步的问题。异步具有传染性，一个异步全部异步。