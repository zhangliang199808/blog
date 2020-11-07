
export default {
  SET_IS_LOGIN(state,isLogin){
    state.isLogin = isLogin;
  },

  //登录
  LOGIN(state,params){
    localStorage.setItem("userInfo",JSON.stringify(params));
    state.isLogin = true;
    state.userInfo = params;
  },

  //注销
  LOGOUT(state){
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    state.isLogin = false;
    state.userInfo = null;
  },

  //更新部分用户信息
  UPDATE_USERINFO(state,userInfo){
    state.userInfo = {...state.userInfo,...userInfo};
    localStorage.setItem("login_user_info",JSON.stringify(state.userInfo));
  }
}
