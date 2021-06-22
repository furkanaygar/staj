import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import leave from '../services/leaveService';
import { connect } from 'react-redux';
const { Option } = Select;

class LeaveForm extends Component {
  state = {
    username: '',
    date: '',
    count: '',
    reason: '',
    type: '',
    test: null
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, date, count, reason, type } = this.state;
    console.log(
      'username',
      username,
      'date',
      date,
      'count',
      count,
      'reason',
      reason,
      'type',
      type
    );
    this.setState({ test: 'true' });
    if (username === localStorage.getItem('username')) {
      leave(username, date, count, reason);
    }
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
    console.log('isAuthenticated', isAuthenticated);
    if (this.state.test) this.props.history.push('/');
    if (!isAuthenticated) this.props.history.push('/');
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          layout='horizontal'
          onSubmit={this.handleSubmit}
          className='login-form'
        >
          <h1 style={{ textAlign: 'center' }}> Leave Form</h1>
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
          <Form.Item label='Start Date:'>
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: 'Please input your starting day for leaving'
                }
              ]
            })(
              <Input
                onChange={this.handleChange}
                type='date'
                name='date'
                required
                placeholder='Begining Date'
              />
            )}
          </Form.Item>
          <Form.Item label='Finish Date '>
            {getFieldDecorator('count', {
              rules: [
                {
                  required: true,
                  message: 'Please enter a date'
                }
              ]
            })(
              <Input
                type='date'
                name='count'
                required
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item
            name='type'
            label='Option Type'
            onChange={this.handleChange}
          >
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select placeholder='Select a option and change input text above'>
                <Option value='hastalik'>Hastalık</Option>
                <Option value='aile'>Aile</Option>
                <Option value='diger'>Diğer</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label='Reason'
            wrapperCol={{
              span: 18
            }}
          >
            {getFieldDecorator('reason', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                placeholder='reason'
                onChange={this.handleChange}
                required
                name='reason'
                type='reason'
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'left' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='primary'
              htmlType='submit'
              className='leave-form-button'
            >
              Submit Form
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
