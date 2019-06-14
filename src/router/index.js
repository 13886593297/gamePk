import React, { Component } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Index from '@pages/index'
import Train from '@pages/train'
import Subject from '@pages/subject'
import FinishTraining from '@pages/finishTraining'
import GamePk from '@pages/gamePk'
import Pk from '@pages/pk'
import PkResult from '@pages/pkResult'
import Setpk from '@pages/setpk'
import Invitation from '@pages/invitation'
import FightAgainst from '@pages/fightAgainst'
import PkRecord from '@pages/pkRecord'
import PkRoom from '@pages/pkRoom'
import MyAchievements from '@pages/myAchievements'
import RankingList from '@pages/rankingList'
import User from '@pages/user'
import SetAvatar from '@pages/setAvatar'

export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' exact component={Index} />
          <Route path='/train' component={Train} />
          <Route path='/subject/:levelId' component={Subject} />
          <Route path='/finishTraining/:user_id/:score/:correct' component={FinishTraining} />
          <Route path='/gamePk' component={GamePk} />
          <Route path='/pk' component={Pk} />
          <Route path='/pkResult/:data' component={PkResult} />
          <Route path='/setpk' component={Setpk} />
          <Route path='/invitation/:pkId' component={Invitation} />
          <Route path='/fightAgainst/:pkId' component={FightAgainst} />
          <Route path='/pkRecord' component={PkRecord} />
          <Route path='/pkRoom/:pkId' component={PkRoom} />
          <Route path='/myAchievements/:user_id' component={MyAchievements} />
          <Route path='/rankingList' component={RankingList} />
          <Route path='/user/:user_id' component={User} />
          <Route path='/setAvatar' component={SetAvatar} />
        </Switch>
      </HashRouter>
    )
  }
}