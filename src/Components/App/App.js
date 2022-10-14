import React from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Util/Spotify';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      playlistName:'New Playlist',
      playlistTracks:[],
      searchResults:[]
      }

      this.addTrack = this.addTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.updatePlaylistName = this.updatePlaylistName.bind(this)
      this.savePlaylist = this.savePlaylist.bind(this)
      this.search = this.search.bind(this)
  }

  addTrack(newTrack){
    let tracks = this.state.playlistTracks
    if(tracks.find(track=> newTrack.id === track.id)){
      alert('Already Added to playlist!')
      return;
    }

    tracks.push(newTrack)

    this.setState({playlistTracks: tracks})
  }

  removeTrack(savedTrack){
    let tracks = this.state.playlistTracks
    if(!tracks.find(track=> savedTrack.id === track.id)){
      alert('Unknown Error!')
      return;
    }

    this.setState({playlistTracks: tracks.filter(track=>track.id !== savedTrack.id)})
  }

  updatePlaylistName(name){
    this.setState({playlistName:name})
  }

  savePlaylist(){
     if(Spotify.savePlaylist(this.state.playlistName,  this.state.playlistTracks.map(track=>track.uri))){
      this.setState({ playlistTracks:[]})
      this.setState({playlistName:'New Playlist'})
     }else{
      alert(`Something went wrong!`)
     }
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(tracks=>this.setState({searchResults: tracks}))
  }


  render(){
  
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} 
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
        );
  }
} 

