const app = require(`../modules/${process.env.APP}/lib/app.js`);

var appName = app.appName;
var copyName = '北京联想智慧医疗信息技术有限公司';
var copyYear = '2016 - ' + getYear();

function getYear () {
  var date = new Date();
  var year = date.getFullYear();
  return year.toString();
};

module.exports = {appName, copyName, copyYear};
