import React, { Component } from 'react';
import './MusicItem.less'
import {connect} from 'react-redux'

class MusicItem extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let item = this.props.musicItem;
        let index = this.props.index
        return(
            <li className={`components-listitem row ${this.props.focus?'focus':''}`} onClick={this.props.play.bind(this,index)}>
            <p><strong>{item.title}</strong>-{item.artist}</p>
            <div style={{textAlign:'right'}}><i className="iconfont icon-guanbi" style={{marginRight:'15px'}} onClick={(e)=>{e.stopPropagation();this.props.del(index)}}></i></div>
            </li>
            )
    }

}

const mapDispatchToProps= (dispatch, ownProps) => {
    return {
        play:(args)=>dispatch({type:"PLAY_SONG",currentMusic:args}),
        del:(args)=>dispatch({type:"DEL_SONG",currentMusic:args})
    }
}

export default connect(null,mapDispatchToProps)(MusicItem);