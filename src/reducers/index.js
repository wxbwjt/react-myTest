import {MUSIC_LIST} from './musicList.js'
import {createStore} from 'redux'

const state = {
    musicList:MUSIC_LIST,
    currentMusic:0,
}


const redusers =  function(state, action) {
        switch(action.type){
              case "PLAY_SONG":
                    return Object.assign({}, state,{
                                currentMusic:action.currentMusic
                            });
                case "DEL_SONG":
                    return Object.assign({}, state,{
                                musicList:state.musicList.filter((i,index)=>{
                                    if(index!==action.currentMusic){
                                        return i ;
                                    }else{
                                        return false
                                    }
                            })
                            })
                case "NEXT_SONG":
                    return (action.currentMusic>=0&&action.currentMusic<state.musicList.length)?Object.assign({}, state,{
                                currentMusic:action.currentMusic
                            }):Object.assign({}, state);
              default :
                    return Object.assign({}, state);
        }
}


export default createStore(
    redusers,state
)