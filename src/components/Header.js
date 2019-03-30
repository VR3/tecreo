import React, { Component } from 'react'
import { Menu, Icon } from 'antd';


export default class Header extends React.Component {
  state = {
    current: 'ayuda',
  }

  handleClick = (e) => {
    console.log('click ', e);
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
        <Menu.Item key="ayuda">
          <Icon type="question" />Encontrar ayuda
        </Menu.Item>
        <Menu.Item key="perfil">
          <Icon type="profile" />Mi Perfil
        </Menu.Item>
      </Menu>
    );
  }
}
