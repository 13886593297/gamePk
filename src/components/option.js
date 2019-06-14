import React from 'react'

export default class Option extends React.Component {
  render() {
    return (
      <li onClick={this.props.doAnswer}>
        <img src={this.props.img} alt='' />
        <span>{this.props.text}</span>
      </li>
    )
  }
}