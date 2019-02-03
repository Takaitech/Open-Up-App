
'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 
'mongodb://127.0.0.1/open-up-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://127.0.0.1/test-open-up-app';
exports.PORT = process.env.PORT || 8080;