import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import fetchSong from '../queries/fetchSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

const SongDetail = ({ data, params }) => {
  const { song } = data

  if (!song) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={params.id} />
    </div>
  )
}

export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id } }}
})(SongDetail)
