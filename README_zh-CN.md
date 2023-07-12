[English](/README.md) | [中文](/README_zh-CN.md)

# Epub2twpub
Epub 到 twpub 转换工具。

1. 上游代码仓库：https://github.com/TWPUB/TWPUB-Tools
2. 墨屉\TW社区书库：https://github.com/Zacharia2/TWPUB-BOOK


## 使用方法

1. 下载twpub-tools.exe到本地，并在与程序所在的同级目录中创建一个名为epubs文件夹。
2. 将epub书籍放入文件夹中。
3. 双击执行twpub-tools.exe等待完成，完成后可以在output文件夹中看到结果。

## 开发者使用方式

1. 克隆或下载仓库到本地。
2. 执行`npm install -g pnpm`安装pnpm。
3. 执行 `pnpm i` 为项目安装依赖包。若出错请尝试`npm错误处理方法`。
4. 放置epub图书到epubs目录
5. 执行 `pnpm run build` 开始转换epubs目录中的所有书籍。
6. 等待执行完成。
7. 转换完成后可以在output目录找到转换好的TWPUB书籍。


## 打包构建

https://github.com/OokTech/TW5-BobEXE/blob/master/package.json

用pkg把nodejs程序打包成exe：https://juejin.cn/post/7212621497809387557