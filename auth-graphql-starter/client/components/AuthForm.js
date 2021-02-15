import React from 'react'

class AuthForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state)
  }

  renderErrors() {
    return this.props.errors.map(error => {
      return <div key={error}>{error}</div>
    })
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s4">
          <div className="input-field">  
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>

          <div className="errors">
            {this.renderErrors()}
          </div>
          

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm
