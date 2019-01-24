
import axios from 'axios'
import types from '../types.js'

const state={
	bshow:false,
   loginShow:true
}

const getters={
   bshow(state){
   	return state.bshow
   },
   loginShow(state){
      return state.loginShow
   }
   
}

const actions={
   oneShow({commit}){
      commit(types.SHOW_ONE)    //提交一个改变
   },
   oneHide({commit}){
      commit(types.HIDE_ONE)    //提交一个改变
   },
   btnShow({commit}){
      commit(types.BTN_SHOW)
   },
    btnHide({commit}){
      commit(types.BTN_HIDE)
   }
}

const mutations={
   [types.SHOW_ONE](state){
   	state.bshow=true
   },
   [types.HIDE_ONE](state){
   	state.bshow=false
   },
   [types.BTN_SHOW](state){
      state.loginShow=true
   },
   [types.BTN_HIDE](state){
      state.loginShow=false
   }

}

export default{
	state,
	getters,
	actions,
	mutations
}
