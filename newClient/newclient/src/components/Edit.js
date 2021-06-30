import React, { Component } from 'react';
import editBirth from '../services/editService';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

class Edit extends Component {
  state = {
    birthdate: '',
    tcno: '',
    test: null
  };

  componentWillMount() {
    const n = localStorage.getItem('username');
    const url = `http://localhost:8080/api/user/${n}/info`;
    axios
      .get(url)
      .then(response => {
        this.setState({
          birthdate: response.data.dateBirth,
          tcno: response.data.identificationNo
        });
      })
      .catch(err => console.log(err));
  }
  handleSubmit = e => {
    e.preventDefault();
    const { birthdate, tcno } = this.state;
    console.log('birtdate', birthdate, 'tc', tcno);
    const username = localStorage.getItem('username');
    editBirth(username, birthdate, tcno);
    this.setState({ test: 'true' });
    message.success(' Kullanıcı Bilgisi Başarılı Bir Şekilde Düzenlendi!');
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const { getFieldDecorator } = this.props.form;
    console.log('props', this.props);
    console.log('isauthenticated', isAuthenticated);
    if (this.state.test) this.props.history.push('/');
    if (!isAuthenticated) this.props.history.push('/');
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} className='edit-form'>
          <h1 style={{ textAlign: 'center' }}>Kullanıcı Bilgisi Düzenle</h1>

          <Form.Item label='Doğum Tarihi'>
            {getFieldDecorator('birth_date', {
              initialValue: this.state.birthdate,
              rules: [
                { required: false, message: 'Lütfen Doğum Tarihi Giriniz!' }
              ]
            })(
              <Input
                type='date'
                name='birthdate'
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label='TC Kimlik Numarası'>
            {getFieldDecorator('tcno', {
              initialValue: this.state.tcno,
              rules: [
                { required: false, message: 'Lütfen TC Kimlik Numarası Giriniz!' }
              ]
            })(
              <Input
                // prefix={<Icon type='notification' theme='filled' />}
                placeholder='TC Kimlik Numarası'
                onChange={this.handleChange}
                name='tcno'
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='primary'
              htmlType='submit'
              className='edit-form-button'
            >
              Düzenle
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

const EditPage = Form.create()(Edit);
export default connect(mapStateToProps)(EditPage);
