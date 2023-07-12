/*
Class representing the jsdom wrapper for get-page-text.js
*/

const { JSDOM } = require("jsdom");
const { getStructure } = require("./get-page-text");

const URL_PREFIX = "https://example.com/";

class TextExtractor {

  /*
  Options:
  getFile: function(href) returns {type:, contents:}
  logError: function(msg)
  */
  constructor(options) {
    this.getFile = options.getFile;
    this.logError = options.logError;
  }


  /**
   * @description 从文件中获取内容，使用这个内容通过JSDOM获得dom对象。然后通过getPageText传入DOm获得格式化的结构。
   * @param {string} href 文件名。
   * @returns 返回一个结构：{chunks: [], stylsheets: [text]}。
   */
  async getPageText(href) {
    const { type, contents } = await this.getFile(href);
    if (!type) {
      this.logError(`Missing file \`${href}\``);
      return "";
    } else {
      var window = new JSDOM(contents, {
        url: URL_PREFIX,
        contentType: type,
        runScripts: "dangerously"
      }).window;
      var document = window.document;
      var result = getStructure(window, document);
    }
    return result;
  }

}

exports.TextExtractor = TextExtractor;
