import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;

class NavigationBar extends Component {
  render() {
    const sub = localStorage.getItem('token');
    const n = localStorage.getItem('username');
    return (
      <Header>
        <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
          <Menu.Item key='1'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          {sub ? (
            <Menu.Item style={{ float: 'right' }} key='2'>
              <Link to='/api/logout'>Logout - {n}</Link>
            </Menu.Item>
          ) : (
            <Menu.Item style={{ float: 'right' }} key='2'>
              <Link to='/api/login'>Login</Link>
            </Menu.Item>
          )}
          {sub ? (
            <Menu.Item key='3'>
              <Link to={`/api/user/edit`}>Edit</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key='3'></Menu.Item>
          )}
          {sub ? (
            <Menu.Item key='4'>
              <Link to={'/api/form'}>Form</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key='4'></Menu.Item>
          )}
          {sub ? (
            <Menu.Item key='5'>
              <Link to={`/api/user/${n}/info`}>User Info</Link>
            </Menu.Item>
          ) : (
            <Menu.Item></Menu.Item>
          )}
          {this.props.isAdmin ? (
            <Menu.Item key='7'>
              <Link to='/api/showall'>All Users</Link>
            </Menu.Item>
          ) : (
            <Menu.Item></Menu.Item>
          )}
          {sub ? (
            <Menu.Item></Menu.Item>
          ) : (
            <Menu.Item style={{ float: 'right' }} key='6'>
              <Link to={`/api/register`}>Register</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated, error, errorMessage, user, isAdmin } = state.auth;
  return {
    isAuthenticated,
    error,
    errorMessage,
    user,
    isAdmin
  };
};

export default connect(mapStateToProps)(NavigationBar);
