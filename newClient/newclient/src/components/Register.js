import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
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

    registerService
      .register(username, password, birth_date, identification_no)
      .then(res => {
        if (res) {
          this.props.history.push('/api/login');
          message.success('Kayıt Başarılı!');
        } else {
          message.error(
            'Kullanıcı İsmi Kullanılmaktatır! Farklı Bir Kullanıcı İsmi Kullanın!'
          );
        }
      })
      .catch(err => console.log(err));
  };
  handleChange = e => {
    console.log('name', e.target.name, 'value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <h1 style={{ textAlign: 'center', marginTop: '3px' }}>Kayıt Ol</h1>
          <Form.Item label='Kullanıcı Adı'>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Lütfen Kullanıcı İsminizi Giriniz!'
                }
              ]
            })(
              <Input
                placeholder='Kullanıcı Adı'
                onChange={this.handleChange}
                required
                name='username'
                type='username'
              />
            )}
          </Form.Item>
          <Form.Item label='Şifre'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Lütfen Şifrenizi Giriniz!' }]
            })(
              <Input
                type='password'
                name='password'
                required
                placeholder='Şifre'
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label='Doğum Tarihi '>
            {getFieldDecorator('birth_date', {
              rules: [
                { required: true, message: 'Lütfen Doğum Tarihinizi Giriniz!' }
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
          <Form.Item label='TC Kimlik Numarası'>
            {getFieldDecorator('identification_no', {
              rules: [
                {
                  required: true,
                  message: 'Lütfen TC Kimlik Numaranızı Giriniz!'
                }
              ]
            })(
              <Input
                type='primary'
                name='identification_no'
                required
                onChange={this.handleChange}
                placeholder='TC Kimlik Numarası'
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='primary'
              htmlType='submit'
            >
              Kayıt Ol
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
