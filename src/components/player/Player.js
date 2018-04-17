import React, { Component } from 'react';
import Progress from '../progress/Progress'
import './Player.less'
import {connect} from 'react-redux'

let duration = null;
class Player extends Component {
  constructor(props){
    super(props)
    this.state={
      progress:0,
      volume:50,
      isPlay:true,
      leftTime:0,
      repeatType:'cycle'
    }
    this.progressChange = this.progressChange.bind(this)
    this.volumeChange = this.volumeChange.bind(this)
    this.play = this.play.bind(this)
  };
  formatTime(time) {
    time = Math.floor(time);
    let miniute = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return miniute + ':'+ (seconds < 10? '0'+ seconds : seconds);
}
  componentDidMount(){
      $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
        duration = e.jPlayer.status.duration
        this.setState({
            leftTime: this.formatTime(duration * ( 1- e.jPlayer.status.currentPercentAbsolute / 100)),
            volume:e.jPlayer.options.volume*100,
          progress:e.jPlayer.status.currentPercentAbsolute
        })
      })
          $('#player').bind($.jPlayer.event.ended, (e) => {
      this.props.next(this.props.currentMusic+1);
    });
  };
  componentWillUnMount(){
    $('#player').unbind($.jPlayer.event.timeupdate)
    $('#player').unbind($.jPlayer.event.ended)
  }
  progressChange(progress){
    $('#player').jPlayer('play',duration*progress)
    this.setState({
        isPlay:true
    })
  }
  volumeChange(volume){
    $('#player').jPlayer('volume',volume)
  }
  play(){
    if(this.state.isPlay){
        $('#player').jPlayer('pause');
    }else{
        $('#player').jPlayer('play');
    }
    this.setState({
        isPlay:!this.state.isPlay
    })
  }
  render() {
    let index = this.props.currentMusic
    return (
      <div className="player-page">
        <div className=" row">
            <div className="controll-wrapper">
                <h2 className="music-title">{this.props.currentMusitItem.title}</h2>
                <h3 className="music-artist mt10">{this.props.currentMusitItem.artist}</h3>
                <div className="row mt10">
                    <div className="left-time -col-auto">-{this.state.leftTime}</div>
                    <div className="volume-container">
                        <i className="icon-volume rt" style={{top:5, left:-5}}></i>
                        <div className="volume-wrapper">{/* 音量条 */}
                            <Progress progress={this.state.volume} onProgressChange={this.volumeChange} barColor='#aaa'></Progress>
                        </div>
                    </div>
                </div>
                <div style={{height:10, lineHeight:'10px'}}>{/* 播放进度条 */}
                    <Progress progress={this.state.progress} onProgressChange={this.progressChange}></Progress>
                </div>
                <div className="mt35 row">
                    <div>
                        <i className="icon prev" onClick={()=>{this.setState({isPlay:true});this.props.next(index-1)}}></i>
                        <i className={`icon ml20 ${this.state.isPlay? 'pause' :'play'}`} onClick={this.play}></i>
                        <i className="icon next ml20" onClick={()=>{this.setState({isPlay:true});this.props.next(index+1)}}></i>
                     </div>
                    <div className="-col-auto">{/* 播放模式按钮：单曲、循环、随机 */}
                        <i className={`icon repeat-${this.state.repeatType}`} onClick={this.changeRepeat}></i>
                    </div>
                </div>
            </div>
            <div className="-col-auto cover">
                <img ref="imgAnimation" src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title} />
            </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state,props)=>({
      musicList:state.musicList,
      currentMusitItem:state.musicList[state.currentMusic],
      currentMusic:state.currentMusic
})

const mapDispatchToProps= (dispatch, ownProps) => {
    return {
        next:(args)=>dispatch({type:"NEXT_SONG",currentMusic:args})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Player);