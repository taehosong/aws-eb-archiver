#!/usr/bin/env node
const { string } = require('yargs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 -r [dir] -f [file] -z [file]')
  .example('$0 -r ./test-src -f package.json -f package-lock.json -f dist')
  .example('$0 -r ./ -f ./package.json -f ./package-lock.json -f ./dist -z app.zip')
  .option('rootPath', {
    alias: 'r',
    type: 'string',
    description: 'Directory'
  })
  .option('files', {
    alias: 'f',
    type: 'array',
    description: 'File for archive (in rootPath)'
  })
  .option('zip', {
    alias: 'z',
    type: string,
    default: 'application.zip',
    description: 'Archived file.'
  })
  .demandOption(['rootPath', 'files'])
  .argv

const archiveCode = require('./eb-archiver');

archiveCode({
  rootPath: argv.rootPath,
  sources: argv.files
}, argv.zip);