/*
Convert an EPUB file into a TWPUB plugin
*/

const { EpubReader } = require("./epub-reader"),
	{ TwpubPlugin } = require("./twpub-plugin");


class Epub2twpub {

	constructor(epub) {
		// Get our app version number
		this.version = require("../package.json").version;
		// Parse arguments
		this.epub = epub;
	}

	/**
	 * 
	 * @returns 转换完成的twpub插件书籍。
	 */
	async convert() {
		this.epubReader = new EpubReader(this);
		await this.epubReader.load(this.epub);
		this.twpubPlugin = new TwpubPlugin(this, { epubReader: this.epubReader });
		this.twpubPlugin.convertEpub();
		return this.twpubPlugin.getPluginText();
	}
}

exports.Epub2twpub = Epub2twpub;