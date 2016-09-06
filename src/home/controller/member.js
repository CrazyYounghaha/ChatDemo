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
				this.assign("title", "个人主页");
				this.assign("userInfo",this.user);
				return this.display();
		}
}