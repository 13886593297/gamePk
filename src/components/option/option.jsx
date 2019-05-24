import React from 'react'
import './option.scss'

export default class Option extends React.Component {
  render() {
    return (
      <li className='option' onClick={this.props.doAnswer}>
        <img className='option_img' src={this.props.img} ref="img" alt='' />
        <span className='option_text' ref="text">{this.props.text}</span>
      </li>
    )
  }
}