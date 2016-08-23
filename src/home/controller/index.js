'use strict';

import Base from './base.js';

export default class extends Base {
		/**
		 * index action
		 * @return {Promise} []
		 */
		indexAction() {
				//auto render template file index_index.html
				this.assign("title", "ThinkJs 官网");
				return this.display();
		}

		* loginAction() {
				if (this.isPost()) {
						let name = this.post('name');
						let pwd = this.post('pwd');
						pwd = encryptPassword(pwd);
						let user = yield this.model('user').where({name: name}).find();

						if (pwd == user.pwd) {
								console.log("Login success");
								yield this.session('loginuser', user);
								return this.success(user);
						} else {
								console.log("error");
								user.err = 1;
								return this.success(user);
						}
				}
		}

		* registerAction() {
				if (this.isAjax('post')) {
						let data = this.post();
						console.log(data);
						if (think.isEmpty(data.r_name)) {
								return this.fail("用户昵称不能为空！");
						} else {
								let res = yield this.model("user").where({name: ltrim(data.r_name)}).find();
								if (!think.isEmpty(res)) {
										return this.fail("用户昵称已存在，请重新填写！")
								}
						}
						if (think.isEmpty(data.r_pwd) && think.isEmpty(data.pwdConfirm)) {
								return this.fail("密码不能为空！")
						} else {
								if (data.r_pwd != data.pwdConfirm) {
										return this.fail("两次输入的密码不一致，请重新填写！")
								}
						}
						data.reg_time = new Date().valueOf();
						data.r_pwd = encryptPassword(data.r_pwd);
						let reg = yield this.model("user").add({name: data.r_name, pwd: data.r_pwd});
						let userInfo = {
								'id': reg,
								'username': data.r_name,
								'last_login_time': data.reg_time
						};
						yield this.session('loginuser', userInfo);
						return this.success({name: "注册成功！登录中", url: "/index"});
				} else {
						return this.display();
				}
		}

		* logoutAction() {
				if (this.islogin) {
						yield this.session('loginuser', null);
						return this.redirect('index');
				}
		}

}