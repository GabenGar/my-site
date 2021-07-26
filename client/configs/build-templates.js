const path = require("path");
const fse = require("fs-extra");
const HTMLWebpackPlugin = require("html-webpack-plugin");

class FatterDirent extends fse.Dirent {
  /**
   * @param {string} path Absolute path to the file.
   */
  constructor(path) {
    super();
    this.path = path;
  }
}

/**
 * @typedef BuildOptions
 * @property {string} fileExtension
 * @property {HTMLWebpackPlugin.Options} pluginOptions Webpack plugin options.
 */

/**
 * Builds an array of HTML webpack plugins from the provided folder.
 * @param {string} basePath An absolute path to the folder containing template files.
 * @param {string} projectPath An absolute path to the folder containing project files.
 * @param {BuildOptions} options Build options.
 */
function buildHTMLWebpackPlugins(basePath, projectPath, options) {
  /**
   * @type {HTMLWebpackPlugin[]}
   */
  const plugins = [];
  const files = fse.readdirSync(basePath, { withFileTypes: true });

  files.forEach(( file ) => {
    const isHTML = file.isFile() && file.name.endsWith(`.${options.fileExtension}`);
    
    if (isHTML) {
      const templatePath = path.join(basePath, file.name);
      const outputBase = path.relative(projectPath, basePath);
      const outputPath = path.join(outputBase, file.name);

      const webpackPlugin = new HTMLWebpackPlugin({
        ...options.pluginOptions,
        template: templatePath,
        filename: outputPath,
      });

      plugins.push(webpackPlugin);
    }
  });

  return plugins;
}

/**
 * @param {string} basePath Absolute path to the tempalte folder.
 * @param {BuildOptions} options Build optons.
 */
function buildHTMLWebpackPluginsRecursive(basePath, options) {
  /**
   * @type {HTMLWebpackPlugin[]}
   */
  const plugins = [];
  const files = walkFolder(basePath);

  files.forEach(( file ) => {

    // TODO: check why `fse.Dirent.isFile()` doesn't work.
    if (file.path.endsWith(`.${options.fileExtension}`)) {
      const outputBase = path.relative(basePath, file.path);
      const outputPath = path.join(path.basename(basePath), outputBase);

      const webpackPlugin = new HTMLWebpackPlugin({
        ...options.pluginOptions,
        template: file.path,
        filename: outputPath,
      });
  
      plugins.push(webpackPlugin);
    }

  });

  return plugins;
}

/**
 * @param {string} folderPath Absolute path to the folder.
 * @param {FatterDirent[]} files
 */
function walkFolder(folderPath, files = [], currentCount = 0) {
  const nestedLimit = 1000;
  const folderContents = fse.readdirSync(folderPath, {withFileTypes: true});

  folderContents.forEach((entry) => {
    const file = entry.isFile() && entry;
    const folder = entry.isDirectory() && entry;

    if (file) {
      const filePath = path.join(folderPath, file.name);
      // console.log(`File path for file name "${file.name}": "${filePath}"`);
      files.push(new FatterDirent(filePath));
      return;
    }

    if (folder) {
      currentCount++;

      if (currentCount > nestedLimit) {
        throw new Error(`The folder at "${folderPath}" contains more than ${nestedLimit} folders.`);
      }

      const newFolderPath = path.join(folderPath, folder.name);

      // console.log(`Current folder: ${newFolderPath}"`);

      return walkFolder(newFolderPath, files, currentCount);
    }

  });

  return files;
}

module.exports = {
  buildHTMLWebpackPlugins,
  buildHTMLWebpackPluginsRecursive
}
