import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends React.Component {

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <span style={{ marginRight: '10px' }}>
              {likes}
            </span>
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >thumb_up</i>
          </div>
        </li>
      )
    })
  }

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
