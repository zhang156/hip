function InsertHtml(options) {
  this.options = options
}

function insertAt(str, ins, pos) {
  return str.substring(0, pos) + ins + str.substring(pos)
}

InsertHtml.prototype.apply = function (compiler) {
  var html = this.options.html
  var tag = this.options.tag
  compiler.plugin('compilation', function (compilation, options) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      var TagEndPos = htmlPluginData.html.lastIndexOf('</' + tag + '>');
      htmlPluginData.html = insertAt(htmlPluginData.html, html, TagEndPos);

      callback(null, htmlPluginData);
    })
  })
}


module.exports = InsertHtml

