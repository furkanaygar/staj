import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';
import { adminlogin, login } from '../actions/authAction';
import authService from '../services/authService';
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    test1: '',
    isActive: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;
    authService
      .controlIsActive(username)
      .then(resp => {
        this.setState({ isActive: resp.test });
        if (this.state.isActive) {
          authService
            .control(username)
            .then(res => {
              this.setState({ test1: res.test });
              if (this.state.test1) {
                dispatch(adminlogin(username, password));
                message.success('Giriş Başarılı!');
              } else {
                dispatch(login(username, password));
                message.success('Giriş Başarılı!');
              }
            })
            .catch(err => console.log(err));
        } else {
          message.error('Hesap Bulunamadı!');
        }
      })
      .catch(err => console.log(err));
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
          <h1 style={{ textAlign: 'center', marginTop: '3px' }}>Giriş Yap</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Lütfen Kullanıcı Adınızı Giriniz!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Kullanıcı Adı'
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
                { required: true, message: 'Lütfen Şifrenizi Giriniz!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                name='password'
                required
                placeholder='Şifre'
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
