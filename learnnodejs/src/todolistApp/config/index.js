
var configValues = require('./config.json');

module.exports = {
  getDbConnectionString: function () {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds013584.mlab.com:13584/nodetodosample';
  }
};

