# Epub2twpub
Epub 到 twpub 转换工具。

1. 上游代码仓库：https://github.com/TWPUB/TWPUB-Tools
2. 墨屉\TW社区书库：https://github.com/Zacharia2/TWPUB-BOOK


## 使用方法

1. 克隆或下载仓库到本地。
2. 执行 `npm i` 为项目安装依赖包。若出错请尝试`npm错误处理方法`。
3. 放置epub图书到epubs目录
4. 执行 `npm run build` 开始转换epubs目录中的所有书籍。
5. 等待执行完成。
6. 转换完成后可以在output目录找到转换好的TWPUB书籍。

## NPM错误处理方法

### playwright安装失败

```sh
npm ERR! Error: Failed to download Chromium 112.0.5615.29 (playwright build v1055), caused by
npm ERR! Error: Download failure, code=1
```

这个错误通常是由于网络代理或防火墙导致的安全证书验证问题引起的。以下是一些可能的解决方案：

1. 禁用代理：如果您使用了代理，请尝试禁用它并重新运行安装程序。

2. 更改网络设置：尝试更改计算机的网络设置，以便让您的计算机直接连接到互联网，而不是通过代理服务器。

3. 更新证书：在某些情况下，您可能需要更新您的操作系统上的根证书。可以在操作系统的证书存储区中手动安装缺失的根证书。

4. 使用npm config命令：尝试使用以下命令配置npm以使用较旧版本的TLS：

   `npm config set strict-ssl false `

   `npm config set registry "http://registry.npmjs.org/"`

这些解决方案应该有助于您解决此错误。