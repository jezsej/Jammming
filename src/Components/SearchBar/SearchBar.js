import React from 'react'
import './SearchBar.css'

export default class SearchBar extends React.Component{

  constructor(props){
    super(props)

    this.handleTermChange = this.handleTermChange.bind(this)

  }


  handleTermChange(event){
    this.props.onSearch(event.target.value)
  }


  render(){
  return(
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
      <button className="SearchButton">SEARCH</button>
    </div>
);}
}

