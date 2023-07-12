[English](/README.md) | [中文](/README_zh-CN.md)

# Epub2twpub
Epub to twpub conversion tool.

1. Upstream code repository: https://github.com/TWPUB/TWPUB-Tools
2. Ink Drawer\TW Community Book Depository: https://github.com/Zacharia2/TWPUB-BOOK

## How to use

1. Download twpub-tools.exe locally and create a folder named epubs in the same directory as the program.
2. Place the epub book in the folder.
3. Double click to execute twpub-tools.exe and wait for it to finish, when it's done you can see the result in the output folder.

## How to use it for developers

1. Clone or download the repository locally.
2. Run `npm install -g pnpm` to install pnpm.
3. Execute `pnpm i` to install the dependencies for the project. If you get an error, try the `npm error handling method`.
4. Place the epub book in the epubs directory.
5. Execute `pnpm run build` to start converting all the books in the epubs directory. 6.
6. Wait for the execution to complete.
7. After the conversion is finished, you can find the converted TWPUB books in the output directory.