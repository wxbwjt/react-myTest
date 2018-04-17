/*
* @Author: Marte
* @Date:   2018-03-01 11:02:18
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-01 16:00:50
*/
import React, { Component } from 'react';
import './Progress.css'

class Progress extends Component {
    constructor(props){
        super(props);
        this.progressChange = this.progressChange.bind(this)
    }
    progressChange(e){
        let progressBar = this.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth
        this.props.onProgressChange && this.props.onProgressChange(progress)
    }
  render() {
    return (
        <div className="components-progress" onClick={this.progressChange} ref={(d)=>{this.progressBar = d}}>
        <div className="progress" style={{width:`${this.props.progress}%`,background:`${this.props.barColor}`}}></div>
        </div>
    );
  }
}
Progress.defaultProps={
    barColor:'#2f9842'
}

export default Progress;

