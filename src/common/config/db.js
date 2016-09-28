'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'BMS',
      user: 'root',
      password: '',
      prefix: 'BMS_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};