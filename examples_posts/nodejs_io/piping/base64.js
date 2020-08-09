const { Base64Encode } = require('base64-stream');
process.stdin.pipe(new Base64Encode()).pipe(process.stdout);

process.stdin.pipe(process.stdout);
