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
            //console.log(obj.id+ ", " + obj.name + ", " + obj.pwd);
            if( pwd == obj.pwd){
              console.log("success");
              return obj.success=1;
            }else {
              console.log("error");
              return obj.errno=0;
            }
          }).catch(console.log('User does`t exist!'));
    }
  }
}