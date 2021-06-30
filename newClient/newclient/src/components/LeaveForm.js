import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import leave from '../services/leaveService';
import { connect } from 'react-redux';
import './Get.css';
const { TextArea } = Input;

class LeaveForm extends Component {
  state = {
    username: localStorage.getItem('username'),
    date: '',
    count: '',
    reason: '',
    type: '',
    test: null,
    duration: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, date, count, reason, type, duration } = this.state;
    if (type !== '') {
      if (type !== 'Mazeret') {
        leave(username, date, count, reason, type, duration);
        this.setState({ test: 'true' });
      } else {
        leave(username, date, date, reason, type, duration);
        this.setState({ test: 'true' });
      }
      message.success('İzin Formu Başarılı Bir Şekilde Oluşturuldu!');
    } else {
      message.error('Lütfen İzin Türünü Giriniz!');
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    var today = new Date().toISOString().split('T')[0];
    const { isAuthenticated } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (this.state.count != '' && this.state.date != '') {
      var msDiff =
        new Date(this.state.count).getTime() -
        new Date(this.state.date).getTime();
      var difference = '';
      var a = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      difference = difference + a;
      this.state.duration = difference;
    }
    if (this.state.type === 'Mazeret') {
      this.state.date = '' + today;
    }
    if (this.state.test) this.props.history.push('/');
    if (!isAuthenticated) this.props.history.push('/');
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form layout='horizontal' onSubmit={this.handleSubmit}>
          <h1 style={{ textAlign: 'left', marginTop: '3px' }}>
            {' '}
            İzin Formu Oluştur
          </h1>
          <Form.Item label='Kullanıcı Adı'>
            {getFieldDecorator('username', {
              initialValue: localStorage.getItem('username'),
              disabled: false,
              rules: [{ required: true }]
            })(
              <Input
                required
                name='username'
                type='text'
                placeholder='Kullanıcı Adı'
                readOnly
              />
            )}
          </Form.Item>
          <Form.Item name='type' label='İzin Türü'>
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <select
                value={this.state.value}
                onChange={this.handleChange}
                name='type'
                required
              >
                <option readOnly selected='true' disabled='disabled'>
                  İzin Türü Seç
                </option>
                <option value='Mazeret'>Mazeret</option>
                <option value='Hastalık'>Hastalık</option>
                <option value='Tatil'>Tatil</option>
                <option value='Aile'>Aile</option>
                <option value='Diğer'>Diğer</option>
              </select>
            )}
          </Form.Item>
          {this.state.type !== 'Mazeret' ? (
            <Form.Item label='Başlangıç Tarihi'>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Lütfen Başlangıç Tarihini Seçiniz!'
                  }
                ]
              })(
                <Input
                  onChange={this.handleChange}
                  type='date'
                  name='date'
                  required
                  min={today}
                />
              )}
            </Form.Item>
          ) : (
            <Form.Item label='Başlangıç Tarihi'>
              {getFieldDecorator('date', {
                initialValue: today,
                rules: [
                  {
                    required: true,
                    message: 'Lütfen Başlangıç Tarihini Seçiniz!'
                  }
                ]
              })(
                <Input
                  onChange={this.handleChange}
                  type='date'
                  name='date'
                  value={today}
                  required
                  readOnly
                />
              )}
            </Form.Item>
          )}
          {this.state.type !== 'Mazeret' ? (
            <Form.Item label='Bitiş Tarihi '>
              {getFieldDecorator('count', {
                rules: [
                  {
                    required: true,
                    message: 'Lütfen Bitiş Tarihini Seçiniz!'
                  }
                ]
              })(
                <Input
                  type='date'
                  name='count'
                  required
                  onChange={this.handleChange}
                  min={this.state.date}
                />
              )}
            </Form.Item>
          ) : null}

          <Form.Item label='İzin Açıklaması'>
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: 'Lütfen İzin Açıklaması Seçiniz!'
                }
              ]
            })(
              <TextArea
                rows={3}
                placeholder='İzin Açıklaması'
                onChange={this.handleChange}
                required
                name='reason'
                type='text'
                style={{ width: '100%', height: '100%' }}
                size='large'
              />
            )}
          </Form.Item>
          {this.state.type !== 'Mazeret' ? (
            <Form.Item required='true' label='İzin Süresi(gün)'>
              <Input
                name='duration'
                value={difference}
                readOnly
                placeholder='İzin Süresi'
              />
            </Form.Item>
          ) : (
            <Form.Item label='İzin Süresi(saat)'>
              {getFieldDecorator('duration', {
                rules: [
                  {
                    required: true,
                    message: 'Lütfen Bir Saat Giriniz!'
                  }
                ]
              })(
                <Input
                  onChange={this.handleChange}
                  type='text'
                  name='duration'
                  required
                />
              )}
            </Form.Item>
          )}
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='primary'
              htmlType='submit'
              className='leave-form-button'
            >
              Formu Oluştur
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

const WrappedLeave = Form.create()(LeaveForm);
export default connect(mapStateToProps)(WrappedLeave);
