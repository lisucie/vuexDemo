import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters.js'
import action from './action.js'
import types from './types.js'

import seller from './modules/seller.js'



//导出store对象

export default new Vuex.Store({    //vuex底下的所有js,都需要在index模块全部导出
	getters,
	action,
	types,
	modules:{
		seller
	}
})