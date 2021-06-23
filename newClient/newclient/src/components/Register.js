import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import register from '../services/registerService';
import registerService from '../services/registerService';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    birth_date: '',
    identificationNo: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, birth_date, identification_no } = this.state;

    registerService.register(username, password, birth_date, identification_no).then(res => {
      if (res) this.props.history.push('/api/login');
    });
  };
  handleChange = e => {
    console.log('name', e.target.name, 'value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    // if (this.state.test) this.props.history.push('/api/login');
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <h1 style={{ textAlign: 'center' }}>Register</h1>
          <Form.Item label='Username'>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                placeholder='Username'
                onChange={this.handleChange}
                required
                name='username'
                type='username'
              />
            )}
          </Form.Item>
          <Form.Item label='Password'>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                type='password'
                name='password'
                required
                placeholder='Password'
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label='Birth Date'>
            {getFieldDecorator('birth_date', {
              rules: [
                { required: true, message: 'Please input your birth date!' }
              ]
            })(
              <Input
                type='date'
                name='birth_date'
                required
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label='Identification Number'>
            {getFieldDecorator('identification_no', {
              rules: [
                { required: true, message: 'Please input your ID number!' }
              ]
            })(
              <Input
                type='primary'
                name='identification_no'
                required
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
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

const RegisterWrapped = Form.create()(RegisterForm);
export default connect(mapStateToProps)(RegisterWrapped);
