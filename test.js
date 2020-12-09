const archiveCode = require('./eb-archiver');

archiveCode({
  rootPath: './test-src',
  sources: ['package.json', 'package-lock.json', './dist']
}, 'test.zip');


