/**
 * Created by zhangyang on 16/9/7.
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
        this.tableName = 'area';
    }
}