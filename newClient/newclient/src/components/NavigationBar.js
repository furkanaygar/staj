import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

const { Header } = Layout;
const x = localStorage.getItem('username');
const y = localStorage.getItem('token');

const userInfo = state => {
  const token = localStorage.getItem('token');
  if (token) {
    return jwtDecode(token);
  } else return state.auth.user;
};

class NavigationBar extends React.Component {
  render() {
    console.log('Aygar', this.props.user.sub);
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
          {y ? (
            <Menu.Item key='3'>
              <Link to={`/api/users/${x}/edit`}>Edit</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key='3'>
              <Link to={`/api/login`}>Edit</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userInfo(state)
  };
};

export default connect(mapStateToProps)(NavigationBar);
