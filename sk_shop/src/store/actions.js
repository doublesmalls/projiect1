import {USER_INFO} from "./mutations-type"
import {getStore} from "../config/global";

export default {
    //同步用户信息
    syncUserInfo({commit},userInfo){
        commit(USER_INFO,{userInfo});
    },

    //自动登录
    reqUserInfo({commit}){
        let userInfo = JSON.parse(getStore('userInfo'));
        if (userInfo){
            commit(USER_INFO,{userInfo})
        }
    }
}