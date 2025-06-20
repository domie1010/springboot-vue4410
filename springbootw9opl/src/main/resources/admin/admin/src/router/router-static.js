import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import xuantixinxi from '@/views/modules/xuantixinxi/list'
    import news from '@/views/modules/news/list'
    import discussketixinxi from '@/views/modules/discussketixinxi/list'
    import ketixinxi from '@/views/modules/ketixinxi/list'
    import xuesheng from '@/views/modules/xuesheng/list'
    import ziniketi from '@/views/modules/ziniketi/list'
    import ketifenlei from '@/views/modules/ketifenlei/list'
    import jiaoshi from '@/views/modules/jiaoshi/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/xuantixinxi',
        name: '选题信息',
        component: xuantixinxi
      }
      ,{
	path: '/news',
        name: '校园资讯',
        component: news
      }
      ,{
	path: '/discussketixinxi',
        name: '课题信息评论',
        component: discussketixinxi
      }
      ,{
	path: '/ketixinxi',
        name: '课题信息',
        component: ketixinxi
      }
      ,{
	path: '/xuesheng',
        name: '学生',
        component: xuesheng
      }
      ,{
	path: '/ziniketi',
        name: '自拟课题',
        component: ziniketi
      }
      ,{
	path: '/ketifenlei',
        name: '课题分类',
        component: ketifenlei
      }
      ,{
	path: '/jiaoshi',
        name: '教师',
        component: jiaoshi
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '系统首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
