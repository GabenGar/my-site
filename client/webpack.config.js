const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const { outputPath } = require("#configs/vars.js");
const { buildHTMLWebpackPlugins } = require("#configs/build-templates.js");

const projectPath = path.resolve(__dirname, "src");
const viewsPath = path.join(projectPath, "views");
const mixinsPath = path.join(viewsPath, "mixins");
const pluginOptions = {
  fileExtension: "pug",
  pluginOptions: {
    inject: false,
    minify: false,
  }
};
const viewPlugins = buildHTMLWebpackPlugins(viewsPath, projectPath, pluginOptions);
const mixinPlugins = buildHTMLWebpackPlugins(mixinsPath, projectPath, pluginOptions);

/**
 * @type import("webpack").Configuration
 */
const webpackConfig = {
  entry: {
    main: path.join(projectPath, "scripts", "main.js")
  },
  plugins: [
    ...viewPlugins,
    ...mixinPlugins,
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "public",
    //       to: "public"
    //     }
    //   ]
    // }),
  ],
  resolve: {
    extensions: [".js"],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    path: outputPath,
    publicPath: "/",
    module: true,
    clean: true,
  }
}

module.exports = webpackConfig;
