import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUserQuery from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentDidMount() {
      const { data: { user, loading } } = this.props;
      if (!loading && !user) {
        hashHistory.push('/login')
      }
    }
    
    componentDidUpdate() {
      const { data: { user, loading } } = this.props;
      if (!loading && !user) {
        hashHistory.push('/login')
      }
    }
    
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  
  return graphql(currentUserQuery)(RequireAuth)
}
