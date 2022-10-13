import React from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      playlistName:'Soul',
      playlistTracks:[ {id:1,
        name:'Heaven on Earth',
        artist: 'PlanetShakers',
        album: 'Heaven on Earth'
        }],
      searchResults:[
        {id:1001,
          name:'Joyful',
          artist: 'Dante Bowe',
          album: 'Joyful'
          },
          {id:1002,
            name:'I speak Jesus',
            artist: 'Passion Music',
            album: 'Passion Live'
            }
        ]
      }

      this.addTrack = this.addTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.updatePlaylistName = this.updatePlaylistName.bind(this)
  }

  addTrack(newTrack){

    if(this.state.playlistTracks.find(track=> newTrack.id === track.id)){
      alert('Already Added to playlist!')
      return;
    }

    this.setState({playlistTracks: this.state.playlistTracks.push(newTrack)})
    console.log('>fresh<',this.state)
  }

  removeTrack(savedTrack){
    if(!this.state.playlistTracks.find(track=> savedTrack.id === track.id)){
      alert('Unknown Error!')
      return;
    }

    this.setState({playlistTracks: this.state.playlistTracks.filter(track=>track.id !== savedTrack.id)})
  }

  updatePlaylistName(name){
    this.setState({playlistName:name})
  }

  render(){
    console.log('>',this.state)
    console.log('>',this.state.playlistTracks)
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
        );
  }
} 

