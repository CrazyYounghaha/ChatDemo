'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.assign("title", "ThinkJs 官网");
    return this.display();
  }
  loginAction(){
    if(this.isPost()){
      let name = this.post('name');
      let pwd = this.post('pwd');
      let user = this.model('user').where({name: name}).find().then(
          (obj) => {
            if( pwd == obj.pwd){
              console.log("success");
              this.session('loginuser',obj);
              this.success(obj);
            }else {
              console.log("error");
              this.error(obj);
            }
          });//.catch((error) => { console.log(error.message+ '???')})
    }
  }
  * logoutAction(){
    if(this.islogin){
      yield this.session('loginuser',null);
      console.log("1");
      return this.redirect('index');
    }
  }
  * afterloginAction(){
    let data = yield this.session('loginuser');
    //console.log(data);
    this.assign('username',data);
    return this.display("login");
  }
}