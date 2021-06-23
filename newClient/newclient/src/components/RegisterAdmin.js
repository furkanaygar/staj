import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import register from '../services/registerService';
import registerService from '../services/registerService';

class RegisterAdmin extends Component {
  state = {
    username: '',
    password: '',
    birth_date: '',
    identificationNo: '',
    role: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, birth_date, identification_no, role } =
      this.state;
    registerService
      .addUserAdmin(username, password, birth_date, identification_no, role)
      .then(res => {
        if (res) this.props.history.push('/api/login');
      });

    this.setState({ test: true });
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
          <h1 style={{ textAlign: 'center' }}>Add New User</h1>
          <Form.Item label='Username'>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input username!' }]
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
              rules: [{ required: true, message: 'Please input Password!' }]
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
              rules: [{ required: true, message: 'Please input birth date!' }]
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
              rules: [{ required: true, message: 'Please input ID number!' }]
            })(
              <Input
                type='primary'
                name='identification_no'
                required
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item name='type' label='Option Type'>
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <select
                placeholder='Select role type of User'
                value={this.state.value}
                onChange={this.handleChange}
                name='role'
              >
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'left' }}>
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

const WrappedRegisterAdmin = Form.create()(RegisterAdmin);
export default connect(mapStateToProps)(WrappedRegisterAdmin);
