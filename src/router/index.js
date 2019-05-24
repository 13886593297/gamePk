import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from '@pages/index/index'
import Train from '@pages/train/train'
import Subject from '@pages/subject/subject'

export default class RouteConfig extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Index} />
          <Route path='/train' component={Train} />
          <Route path='/subject/:levelId' component={Subject} />
        </Switch>
      </BrowserRouter>
    )
  }
}