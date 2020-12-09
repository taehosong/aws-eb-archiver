const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const archiveCode = (options, target = 'application.zip') => {
  if (!options.rootPath) {
    throw new Error('Missing "rootPath" value');
  }

  const sources = options.sources || [];
  if (sources.length === 0) {
    return;
  }
  const rootPath = path.join(options.rootPath) + '/';
  const sourcePaths = sources.map(source => path.join(options.rootPath, source));

  const output = fs.createWriteStream(target);
  const archive = archiver('zip', {
    zlib: {level: 9}
  });
  
  output.on('close', function() {
    console.log('');
    console.log(archive.pointer() + ' total bytes');
    console.log('Created:', target);
  });
  
  output.on('end', function() {
    console.log('Data has been drained');
  });
  
  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });
  
  archive.on('error', function(err) {
    throw err;
  });
  
  // pipe archive data to the file
  archive.pipe(output);
  
  console.log('Root path:', rootPath);
  sourcePaths.map(s => {
    const name = s.replace(rootPath, '');
    console.log('Archive:', name);
    const stats = fs.lstatSync(s);

    if (stats.isDirectory()) {
      archive.directory(s, name);
    } else if (stats.isFile()) {
      archive.file(s, {name});
    }
    
  })

  archive.finalize();
}

module.exports = archiveCode;