import React, { Component } from 'react';
import { Layout, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { logout } from '../actions/authAction';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header } = Layout;
class NavigationBar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logout());
  };
  handleCancel = () => {};

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
              <Popconfirm
                title='Do you want to sign out ?'
                okText='Yes'
                cancelText='No'
                placement='right'
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={this.handleSubmit}
                onCancel={this.handleCancel}
              >
                <a href='#'>Sign Out-{n} </a>
              </Popconfirm>
            </Menu.Item>
          ) : (
            <Menu.Item style={{ float: 'right' }} key='2'>
              <Link to='/api/login'>Login</Link>
            </Menu.Item>
          )}
          {sub ? (
            <SubMenu key='SubMenu' title='Operations'>
              {sub ? (
                <Menu.Item key='3'>
                  <Link to={`/api/user/edit`}>Edit User Info</Link>
                </Menu.Item>
              ) : (
                <Menu.Item key='3'></Menu.Item>
              )}
              {sub ? (
                <Menu.Item key='4'>
                  <Link to={'/api/form'}>Create Leave Form</Link>
                </Menu.Item>
              ) : (
                <Menu.Item key='4'></Menu.Item>
              )}
              {sub ? (
                <Menu.Item key='5'>
                  <Link to={`/api/user/${n}/info`}>Show User Info</Link>
                </Menu.Item>
              ) : (
                <Menu.Item></Menu.Item>
              )}
              {this.props.isAdmin ? (
                <Menu.Item key='7'>
                  <Link to='/api/showall'>Show All Users</Link>
                </Menu.Item>
              ) : (
                <></>
              )}
            </SubMenu>
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
