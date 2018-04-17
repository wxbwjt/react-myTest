import React, { Component } from 'react';
import MusicItem from '../musicItem/MusicItem'
import {connect} from 'react-redux'

class MusicList extends Component {

    render(){
        let list = null;
        list = this.props.musicList.map((item,index)=>{
            return <MusicItem
                    focus = {item === this.props.currentMusitItem}
                     key={index} musicItem={item} index={index}></MusicItem>
        });
        console.log(list)
        return(
            <ul>
            {list}
            </ul>
            )
    }

}
const mapStateToProps = (state,props)=>({
      musicList:state.musicList,
      currentMusitItem:state.musicList[state.currentMusic]
})

export default connect(mapStateToProps)(MusicList);