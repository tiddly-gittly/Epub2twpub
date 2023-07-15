[English](/README_en-US.md) | [中文](/README.md)

# Epub2twpub
Epub 到 twpub 转换工具。

1. 上游代码仓库：https://github.com/TWPUB/TWPUB-Tools
2. 墨屉\TW社区书库：https://github.com/Zacharia2/TWPUB-BOOK


## 使用方法

```sh
C:.
├─twpub-tools.exe
├─epubs
└─output
```

1. 请将twpub-tools.exe下载到本地。并根据上图所示，在与该程序同级目录中（即该程序旁边）新建一个名为epubs的文件夹。
2. 请将一个或多个epub书籍放入文件夹中。
3. 双击执行twpub-tools.exe等待完成，完成后可以在output文件夹中看到结果。output文件夹为程序自动生成的文件夹。

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