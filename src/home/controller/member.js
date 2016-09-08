/**
 * Created by 张扬 on 2016/9/1.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
		/**
		 * index action
		 * @return {Promise} []
		 */
		* indexAction(){
				yield this.weblogin();
				let userInfo = yield this.model("user").join({
						table: "customer",
						join: "left",
						on: ["id", "user_id"]
				}).find(this.user.id);
				this.assign("title", "个人主页");
				this.assign("userInfo",userInfo);
				let province, city, county;
				province = yield this.model("area").where({parent_id: 0}).select();
				city = yield this.model("area").where({parent_id: userInfo.province}).select();
				county = yield this.model("area").where({parent_id: userInfo.city}).select();
				this.assign("province", province);
				this.assign("city", city);
				this.assign("county", county);
				return this.display();
		}
}