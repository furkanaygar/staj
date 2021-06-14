import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { login } from '../actions/authAction';

class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch(login(username, password));
  };
  handleChange = e => {
    console.log('name', e.target.name, 'value', e.target.value);
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
        <Form onSubmit={this.handleSubmit} className='login-form'>
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
  const { isAuthenticated, error, errorMessage, user } = state.auth;
  return {
    isAuthenticated,
    error,
    errorMessage,
    user
  };
};

const WrappedLogin = Form.create()(LoginForm);
export default connect(mapStateToProps)(WrappedLogin);
