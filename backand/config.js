const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/exam-13',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
};