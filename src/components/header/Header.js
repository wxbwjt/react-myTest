/*
* @Author: Marte
* @Date:   2018-03-01 11:02:18
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-02 14:01:50
*/
import React, { Component } from 'react';
import './Header.css'
import { Row, Col } from 'antd';

class Header extends Component {
  render() {
    return (
        <div className="components-header">
        <Row>
        <Col span={1}>
            <img width="40" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1186406030,2814249741&fm=27&gp=0.jpg" alt=""  />
            </Col>
            <Col span={23}>
            <h1 className="caption">React Music Player</h1>
            </Col>
            </Row>
        </div>
    );
  }
}

export default Header;

