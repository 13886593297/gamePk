import React from 'react'

export default class Advertise extends React.Component {
  render() {
    return (
      <div className="ad" style={{display: this.props.ad_isShow ? '' : 'none'}}>
        <img src={this.props.adInfo_img} alt="" />
        <span>{this.props.adInfo_value}</span>
      </div>
    )
  }
}