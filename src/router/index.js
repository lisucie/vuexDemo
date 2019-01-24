import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/linkPage/main.vue'
import action from '../components/linkPage/action.vue'
import another from '../components/linkPage/another.vue'
import upload from '../components/linkPage/upload.vue'
import updemo from '../components/zyUpload/updemo.vue'
import elemt from '../components/linkPage/elemt.vue'


Vue.use(Router)

export default new Router({
	routes:[
        { path: '/', redirect: '/main' },
        {
        	path:'/main',
        	name:'main',
        	component:main,
            /*beforeEnter: (to, from, next) => {
               alert('我是页面跳转前的判断')
                }*/

        }, 
        {
        	path:'/action',
        	name:'action',
        	component:action
        },
        {
        	path:'/another',
        	name:'another',
        	component:another
        },
        {
                path:'/upload',
                name:'upload',
                component:upload
        },
         {
                path:'/updemo',
                name:'updemo',
                component:updemo
        },
        {
                path:'/elemt',
                name:'elemt',
                component:elemt
        },
        

	]
})
