import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class PromiseComponent extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    promiseFunction: PropTypes.func.isRequired
  }

  state = {}

  componentDidMount () {
    const {promiseFunction} = this.props
    promiseFunction()
      .then(response => {
        this.setState({data: response})
      })
      .catch(() => {
        this.setState({isError: true})
      })
  }

  render () {
    const {children} = this.props
    const {data, isError} = this.state
    if (data) return children(data)
    if (isError) return <div>{'Error'}</div>
    return <div>{'Loading...'}</div>
  }
}
