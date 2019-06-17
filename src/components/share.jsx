import React from 'react'

export default class Share extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flaunt: this.props.flaunt
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.flaunt !== nextProps.flaunt) {
      this.setState({
        flaunt: nextProps.flaunt
      })
    }
  }
  changeFlunt = () => {
    this.setState({ flaunt: 0 })
  }
  render() {
    return (
      <div className="share" style={{ display: this.state.flaunt ? '' : 'none' }} onClick={this.changeFlunt}>
        <img src={require("@img/share.png")} alt='' />
      </div>
    )
  }
}