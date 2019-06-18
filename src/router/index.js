import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Train from '@/pages/train'
import Subject from '@/pages/subject'
import FinishTraining from '@/pages/finishTraining'
import GamePK from '@/pages/gamePK'
import Pk from '@/pages/pk'
import Pk_result from '@/pages/pk_result'
import Setpk from '@/pages/setpk'
import Invitation from '@/pages/invitation'
import FightAgainst from '@/pages/fightAgainst'
import PkRecord from '@/pages/pkRecord'
import PkRoom from '@/pages/pkRoom'
import MyAchievements from '@/pages/myAchievements'
import RankingList from '@/pages/rankingList'
import User from '@/pages/user'
import SetAvatar from '@/pages/setAvatar'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', component: Index, meta: {title: '首页'}},
    {path: '/train', name: 'train', component: Train, meta: {title: '训练场'}},
    {path: '/subject', name: 'subject', component: Subject, meta: {title: '训练营'}},
    {path: '/finishTraining', name: 'finishTraining', component: FinishTraining, meta: {title: '完成训练'}},
    {path: '/gamePK', name: 'gamePK', component: GamePK, meta: {title: '全民PK'}},
    {path: '/pk', name: 'pk', component: Pk, meta: {title: 'PK'}},
    {path: '/pk_result', name: 'pk_result', component: Pk_result, meta: {title: 'PK'}},
    {path: '/setpk', name: 'setpk', component: Setpk, meta: {title: '设置PK'}},
    {path: '/invitation', name: 'invitation', component: Invitation, meta: {title: 'PK邀请'}},
    {path: '/fightAgainst', name: 'fightAgainst', component: FightAgainst, meta: {title: 'PK'}},
    {path: '/pkRecord', name: 'pkRecord', component: PkRecord, meta: {title: 'PK记录'}},
    {path: '/pkRoom', name: 'pkRoom', component: PkRoom, meta: {title: 'PKroom'}},
    {path: '/myAchievements', name: 'myAchievements', component: MyAchievements, meta: {title: '我的PK战绩'}},
    {path: '/rankingList', name: 'rankingList', component: RankingList, meta: {title: '排行榜'}},
    {path: '/user', name: 'user', component: User, meta: {title: '个人中心'}},
    {path: '/setAvatar', name: 'setAvatar', component: SetAvatar, meta: {title: '用户编辑'}},
  ]
})
