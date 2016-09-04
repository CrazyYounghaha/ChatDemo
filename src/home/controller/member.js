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
		indexAction(){
				this.assign("title", "个人主页");
				return this.display();
		}
}