setInterval(() => process.stdout.write('.'), 10).unref();

const fs = require('fs');
const path = require('path');
const sbs = require('strip-bytes-stream');

const cwd = process.cwd();

fs.createReadStream(path.join(cwd, 'file.dat'))
  .pipe(sbs((n) => n))
  .on('end', () => { log(this.total) })
  .pipe(fs.createWriteStream(path.join(cwd, 'clean.dat')));

function log (total) {
  fs.appendFile(
    path.join(cwd, 'log.txt'),
    ( new Date) + ' ' + total + ' bytes removed\n',
    (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    }
  )
}
