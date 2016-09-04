/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *     
 * }
 */


/**
 * 密码加密
 * @param password 加密的密码
 * @param md5encoded true-密码不加密，默认加密
 * @returns {*}
 */
global.encryptPassword = function (password, md5encoded) {
		md5encoded = md5encoded || false;
		password = md5encoded ? password : think.md5(password);
		return think.md5(password + think.md5('Arterli'));
};

/**
 * ltrim()
 * @param str [删除左边的空格]
 * @returns {*|void|string|XML}
 */
/* global ltrim */
global.ltrim = function (str) {
		return str.replace(/(^\s*)/g, "");
}
/**
 * 时间戳格式化 dateformat('Y-m-d H:i:s')
 * @param extra 'Y-m-d H:i:s'
 * @param date  时间戳
 * @return  '2015-12-17 15:39:44'
 */
global.dateformat = function(extra, date) {
		let D = new Date(date);
		let time = {
				"Y": D.getFullYear(),
				'm': D.getMonth() + 1,
				'd': D.getDate(),
				'H': D.getHours(),
				'i': D.getMinutes(),
				's': D.getSeconds()
		};
		let key = extra.split(/\W/);
		let _date;
		for (let k of key) {
				time[k] = time[k] < 10 ? "0" + time[k] : time[k];
				_date = extra.replace(k, time[k]);
				extra = _date;
		}
		return _date;
};