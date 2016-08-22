'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  init(http) {
    super.init(http);
  }

  async __before() {
    this.islogin = await this.is_login();
    this.user = await this.session('loginuser');
  }

  async is_login() {
    //前台判断是否登录
    let user = await this.session('loginuser');
    let res = think.isEmpty(user) ? false : user;
    return res;
  }
}