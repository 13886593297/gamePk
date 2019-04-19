import Vue from 'vue'
import Router from 'vue-router'
import Pk from '@/components/pk'
import User from '@/components/user'
import Index from '@/components/index'
import Train from '@/components/train'
import Setpk from '@/components/setpk'
import GamePK from '@/components/gamePK'
import PkRoom from '@/components/pkRoom'
import Subject from '@/components/subject'
import PkRecord from '@/components/pkRecord'
import SetAvatar from '@/components/setAvatar'
import Pk_result from '@/components/pk_result'
import Invitation from '@/components/invitation'
import RankingList from '@/components/rankingList'
import FightAgainst from '@/components/fightAgainst'
import MyAchievements from '@/components/myAchievements'
import FinishTraining from '@/components/finishTraining'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/setAvatar',
      name: 'setAvatar',
      component: SetAvatar,
      meta: {
        title: '用户编辑'
      }
    },
    {
      path: '/train',
      name: 'train',
      component: Train,
      meta: {
        title: '训练场'
      }
    },
    {
      path: '/subject',
      name: 'subject',
      component: Subject,
      meta: {
        title: '训练营'
      }
    },
    {
      path: '/finishTraining',
      name: 'finishTraining',
      component: FinishTraining,
      meta: {
        title: '完成训练'
      }
    },
    {
      path: '/gamePK',
      name: 'gamePK',
      component: GamePK,
      meta: {
        title: '全民PK'
      }
    },
    {
      path: '/pk',
      name: 'pk',
      component: Pk,
      meta: {
        title: 'PK'
      }
    },
    {
      path: '/pk_result',
      name: 'pk_result',
      component: Pk_result,
      meta: {
        title: 'PK'
      }
    },
    {
      path: '/rankingList',
      name: 'rankingList',
      component: RankingList,
      meta: {
        title: '排行榜'
      }
    },
    {
      path: '/setpk',
      name: 'setpk',
      component: Setpk,
      meta: {
        title: '设置PK'
      }
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: Invitation,
      meta: {
        title: 'PK邀请'
      }
    },
    {
      path: '/fightAgainst',
      name: 'fightAgainst',
      component: FightAgainst,
      meta: {
        title: 'PK'
      }
    },
    {
      path: '/pkRecord',
      name: 'pkRecord',
      component: PkRecord,
      meta: {
        title: 'PK记录'
      }
    },
    {
      path: '/pkRoom',
      name: 'pkRoom',
      component: PkRoom,
      meta: {
        title: 'PKroom'
      }
    },
    {
      path: '/myAchievements',
      name: 'myAchievements',
      component: MyAchievements,
      meta: {
        title: '我的PK战绩'
      }
    },
  ]
})
