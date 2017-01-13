const args = require('minimist')(process.argv.slice(2))
const archiver = require('archiver');
const jetpack = require('fs-jetpack');
const helpers = require('../config/helpers');
const fs = require('fs');
const { root } = helpers;
const path = {
  src: args.src || args.s,
  dest: args.dest || args.d,
};
const forceClean = !!args['force-clean'];
const filename = args.filename || args.f;
const lockedDirs = ['node_modules', 'src', 'scripts', 'config', 'specs', 'tests', 'test'];

if (!path.src || !path.dest || !filename) {
  throw `[ZIP] :: Please specify ${!path.src ? 'src path' : ''}${(!path.src && !path.dest) ? ', ' : ''}${!path.dest ? 'dest path' : ''}${(!filename && (!path.src || !path.dest)) ? ' and ' : ''}${!filename ? 'filename' : ''}.`;
}
const absolutePath = {
  src: root(path.src),
  dest: root(path.dest),
};

if (forceClean) {
  const index = lockedDirs.indexOf(path.dest.split("/")[0]);
  if (path.dest.split("/").indexOf("..") !== -1) {
    throw `[ZIP] :: Invalid relative path: ${path.dest}`;
  }
  if (index !== -1) {
    throw `[ZIP] :: You can't clean directory: ${path.dest}`;
  }
  jetpack.dirAsync(absolutePath.dest, { empty: true });
}

const pack = (src, dest, filename) => {
  dest = jetpack.dir(dest)

  const output = dest.createWriteStream(filename);
  const archive = archiver('zip');

  output.on('close', () =>  console.log(`[ZIP] :: Archive "${path.dest}/${filename}" has been created.`));
  archive.on('error', (err) => console.log(`[ZIP] :: Archiver ERROR: ${err}`));
  archive.pipe(output);
  archive.directory(src);
  archive.finalize();
};

pack(absolutePath.src, absolutePath.dest, filename);
