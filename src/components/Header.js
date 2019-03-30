import React, { Component } from 'react'
import { Menu, Icon } from 'antd';


export default class Header extends React.Component {
  state = {
    current: 'help',
  }

  handleClick = (e) => {
    const {setRoute} = this.props;
    console.log('click ', e);
    setRoute(e.key);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="help">
          <Icon type="question" />Encontrar ayuda
        </Menu.Item>
        <Menu.Item key="perfil">
          <Icon type="profile" />Mi Expediente
        </Menu.Item>
      </Menu>
    );
  }
}
