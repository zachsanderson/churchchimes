var log4js = require('log4js'),
    fs = require('fs-extra');

// Adjust as you'd like (relative to this script)
const LOG_DIR = __dirname + '/../logs/';

// Choose a debug level based on:
//   1) The environment variable called LOGGING_LEVEL
//   2) A default of INFO for NODE_ENV=production, DEBUG for anything else
var env = process.env.NODE_ENV || 'development';
var loggingLevel = process.env.LOGGING_LEVEL || ((env == 'development') ? 'DEBUG' : 'INFO');

// Ensure logging directory 
// NOTE: Any errors will be thrown, stopping Node on startup. If you don't
//   want this behavior, surround with a try {} catch {}.
fs.mkdirpSync(LOG_DIR);

// Instantiate the application logger
log4js.configure({
  appenders: [
    {
      type: 'console' 
    },
    {
      type: 'dateFile',
      filename: LOG_DIR + 'chimeplayer',
      pattern: '-yyyy-MM-dd.log',
      // This simply forces the inclusion of the suffix pattern at all times:
      alwaysIncludePattern: true
    }
  ],
  // I find this is useful, in case you forget to remove any "console.log()" calls:
  replaceConsole: true
});

// Setup the application Logger
var logger = log4js.getLogger();
logger.setLevel(loggingLevel);


logger.info('Logger instantiated with log level ' + loggingLevel);
module.exports = logger;
