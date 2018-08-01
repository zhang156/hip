const app = require(`../modules/${process.env.APP}/lib/app.js`),
      copyName = '心医国际数字医疗系统（大连）有限公司',
      copyYear = '2010 - ' + getYear();

function getYear () {
  var date = new Date();
  var year = date.getFullYear();
  return year.toString();
};

module.exports = {
  appName: app.appName, 
  appId: app.appId, 
  appVersion: app.appVersion,
  copyName,
  copyYear
};
