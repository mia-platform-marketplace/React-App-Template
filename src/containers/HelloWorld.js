import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {helloWorld} from '../actions'

function HelloWorld ({myHello, helloReact}) {
  useEffect(() => {
    myHello()
  }, [myHello])

  return (
    <h2>
      {helloReact}
    </h2>
  )
}

function mapStateToProps (state) {
  const {helloWorld} = state
  return {
    helloReact: helloWorld.helloReact
  }
}
function mapDispatchToProps (dispatch) {
  return {
    myHello: bindActionCreators(helloWorld, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)

HelloWorld.propTypes = {
  helloReact: PropTypes.string,
  myHello: PropTypes.func.isRequired
}
