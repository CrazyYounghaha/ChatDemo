'use strict';

import Base from './base.js';

export default class extends Base {
		/**
		 * index action
		 * @return {Promise} []
		 */
		indexAction() {
				//auto render template file index_index.html
				this.assign("title", "Mini Eyes");
				return this.display();
		}

		* loginAction() {
				if (this.isPost()) {
						let data = this.post();
						console.log(data);
						data.pwd = encryptPassword(data.pwd);
						data.login_time = new Date().valueOf();
						let user = yield this.model('Member_login').where({mem_name: data.name}).find();
						if (think.isEmpty(user)) {
								return this.success(-1);
						} else {
								if (data.pwd == user.user_pwd) {
										console.log("Login success");
										let userInfo = {
												'id': user.user_id,
												'username': data.name,
												'mem_type': data.memberType,
												'last_login_time': data.login_time
										};
										yield this.session('loginuser', userInfo);
										return this.success(1);
								} else {
										console.log("password error");
										return this.success(-2);
								}
						}
				}
		}

		* registerAction() {
				if (this.isAjax('post')) {
						let data = this.post();
						console.log(data);
						if (think.isEmpty(data.r_name)) {
								return this.success(-1);//"用户昵称不能为空！"
						} else {
								let res = yield this.model("Member_login").where({mem_name: ltrim(data.r_name)}).find();
								if (!think.isEmpty(res)) {
										return this.success(-2);//"用户昵称已存在，请重新填写！"
								}
						}
						if (think.isEmpty(data.r_pwd) && think.isEmpty(data.pwdConfirm)) {
								return this.success(-3);//"密码不能为空！"
						} else {
								if (data.r_pwd != data.pwdConfirm) {
										return this.success(-4);//"两次输入的密码不一致，请重新填写！"
								}
						}
						data.reg_time = new Date().valueOf();
						data.r_pwd = encryptPassword(data.r_pwd);
						//let email = data.r_name + "@qq.com";
						let reg = yield this.model("Member_login").add({mem_name: data.r_name, user_pwd: data.r_pwd, mem_type: data.memberType});
						yield this.model("Member").add({mem_name: data.r_name,mem_type: data.memberType});
						let userInfo = {
								'id': reg,
								'username': data.r_name,
								'mem_type': data.memberType,
								'last_login_time': data.reg_time
						};
						yield this.session('loginuser', userInfo);
						return this.success(1);
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

		* userAction() {
				yield this.weblogin();
				this.assign("title","Personal Page");
				//this.assign("last_login_time",dateformat('Y-m-d H:i:s', this.user.last_login_time));
				//console.log(dateformat('Y-m-d H:i:s', this.user.last_login_time));
				return this.display();
		}

		* bookstoreAction(){
				yield this.weblogin();
				this.assign("title","Borrow Book Page");
				return this.display();
		}

		* borrowAction(){
				if(this.isPost()){
						let data = this.post();
						//console.log(data);
						let ISBN = yield this.model("Books").where({Title: data.Title}).find();
						data.ISBN = ISBN.ISBN;
						data.issue_date = new Date().valueOf();
						//console.log(this.user.id);
						//console.log(data);
						//yield this.model("Issuance").add({issue_date: data.issue_date,book_status:1 ,mem_id: this.user.id});
						return this.success(1);
				}
		}
}