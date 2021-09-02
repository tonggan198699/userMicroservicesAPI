const { createReadStream, createWriteStream } = require('fs');

const fileName = `./public/log.txt`;
const writeStream = createWriteStream(fileName);

module.exports = writeStream;