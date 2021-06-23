import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { adminlogin, login } from '../actions/authAction';
import authService from '../services/authService';
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    test: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;
    authService.control(username).then(res => {
      this.setState({ test: res.test });
      if (this.state.test) {
        dispatch(adminlogin(username, password));
      } else {
        dispatch(login(username, password));
      }
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { isAuthenticated } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (isAuthenticated) this.props.history.push('/');
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} className='LoginForm'>
          <h1 style={{ textAlign: 'center' }}>Login</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Username'
                onChange={this.handleChange}
                required
                name='username'
                type='username'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                name='password'
                required
                placeholder='Password'
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated, error, errorMessage, user, isAdmin, control } =
    state.auth;
  return {
    isAuthenticated,
    error,
    errorMessage,
    user,
    isAdmin,
    control
  };
};

const WrappedLogin = Form.create()(LoginForm);
export default connect(mapStateToProps)(WrappedLogin);
