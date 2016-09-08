'use strict';

export default class extends think.controller.base {
		/**
		 * some base method in here
		 */
		init(http) {
				super.init(http);
		}

		async __before() {
				this.islogin = await this.is_login();//返回用户是否登录true or false
				this.user = await this.session('loginuser');//获取缓存文件
		}

		async is_login() {
				//前台判断是否登录
				let user = await this.session('loginuser');
				let res = think.isEmpty(user) ? false : user;
				//console.log(res);
				return res;
		}

		async weblogin() {
				let islogin = await this.is_login();
				if (!islogin) {//未登录
						//pc端跳转到错误页面
						return think.statusAction(404, this.http);
				}
		}
}