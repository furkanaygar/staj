import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
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
        if (res) {
          this.props.history.push('/');
          message.success('Kayıt Başarılı!');
        } else {
          message.error(
            'Kullanıcı İsmi Kullanılmaktatır! Farklı Bir Kullanıcı İsmi Kullanın!'
          );
        }
      })
      .catch(err => console.log(err));

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
          <h1 style={{ textAlign: 'center', marginTop: '3px' }}>
            Yeni Kullanıcı Ekle
          </h1>
          <Form.Item label='Kullanıcı Adı'>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Lütfen Kullanıcı İsminizi Giriniz!' }]
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
          <Form.Item label='Doğum Tarihi'>
            {getFieldDecorator('birth_date', {
              rules: [{ required: true, message: 'Lütfen Doğum Tarihinizi Giriniz!!' }]
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
              rules: [{ required: true, message: 'Lütfen TC Kimlik Numaranızı Giriniz!' }]
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
          <Form.Item name='type' label='Kullanıcı Türü'>
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <select
                value={this.state.value}
                onChange={this.handleChange}
                name='role'
                required
              >
                <option selected='false' disabled='disabled'>
                  Kullanıcı Türü Seç
                </option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='primary'
              htmlType='submit'
            >
              Yeni Kullanıcı Ekle
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
