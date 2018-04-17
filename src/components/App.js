import React, { Component } from 'react';
import './App.css';
import Header from './header/Header'
import Player from './player/Player'
import MusicList from './musicList/MusicList'
import {Route , Switch} from 'react-router-dom'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentMusic:this.props.currentMusic
    }
  };
  componentDidMount(){
    let _this = this
      $('#player').jPlayer({
        ready(){
          $(this).jPlayer('setMedia',{
            mp3:_this.props.currentMusic.file
          }).jPlayer('play');
        },
        supplier:'mp3',
        wmode:'Window'
      });
  };
  componentWillUnMount(){
  }
  componentDidUpdate(){
    if(this.state.currentMusic !== this.props.currentMusic){
      $('#player').jPlayer('setMedia',{
            mp3:this.props.currentMusic.file
          }).jPlayer('play');
      this.setState({
        currentMusic:this.props.currentMusic
      })
    }
  }
  render() {
    return (
      <div>
      <Header></Header>
          <Route  path='/' exact component={Player}/>
          <Route  path='/list' component={MusicList}/>
      </div>
    );
  }
}

const mapStateToProps = (state,props)=>({
      musicList:state.musicList,
      currentMusic:state.musicList[state.currentMusic]
})


export default connect(mapStateToProps)(App);
