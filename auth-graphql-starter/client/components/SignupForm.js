import React from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/Signup'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class SignupForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentDidUpdate(nextProps) {
    if (this.props.data.user && !nextProps.data.user) {
      hashHistory.push('/dashboard')
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(err => {
      const errors = err.graphQLErrors.map(e => e.message);
      this.setState({ errors });
    })
  }

  render() {
    return (
      <div>
        <h3>Sign up</h3>
        <AuthForm 
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
)
