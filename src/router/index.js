import Vue from 'vue'
import Router from 'vue-router'
import Pk from '@/components/pk'
import User from '@/components/user'
import Index from '@/components/index'
import Train from '@/components/train'
import GamePK from '@/components/gamePK'
import Subject from '@/components/subject'
import SetAvatar from '@/components/setAvatar'
import Pk_result from '@/components/pk_result'
import RankingList from '@/components/rankingList'
import FightAgainst from '@/components/fightAgainst'
import FinishTraining from '@/components/finishTraining'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/pk', name: 'pk', component: Pk },
    { path: '/', name: 'index', component: Index },
    { path: '/user', name: 'user', component: User },
    { path: '/train', name: 'train', component: Train },
    { path: '/gamePK', name: 'gamePK', component: GamePK },
    { path: '/subject', name: 'subject', component: Subject },
    { path: '/setAvatar', name: 'setAvatar', component: SetAvatar },
    { path: '/pk_result', name: 'pk_result', component: Pk_result },
    { path: '/rankingList', name: 'rankingList', component: RankingList },
    { path: '/fightAgainst', name: 'fightAgainst', component: FightAgainst },
    { path: '/finishTraining', name: 'finishTraining', component: FinishTraining },
  ]
})
