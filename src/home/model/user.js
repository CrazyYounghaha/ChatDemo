/**
 * Created by 张扬 on 2016/8/18.
 */

/**
 * model
 */
export default class extends think.model.base {
		/**
		 * 数据表字段定义
		 * @type {Object}
		 */
		init(...args) {
				super.init(...args);
				this.tableName = 'user';
		}
}