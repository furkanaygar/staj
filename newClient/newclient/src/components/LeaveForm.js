import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import { connect } from 'react-redux';
import { login } from '../actions/authAction';
const { Option } = Select;

class LeaveForm extends Component {
  state = {
    username: '',
    beginday: '',
    finishday: '',
    reason: ''
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  handleChange = e => {
    console.log('name', e.target.name, 'value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  tailLayout = {
    wrapperCol: { span: 8, span: 16 }
  };

  render() {
    const { isAuthenticated } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (isAuthenticated) this.props.history.push('/');
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          labelCol={{
            span: 9
          }}
          wrapperCol={{
            span: 18
          }}
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
                type='date'
                beginday='date'
                required
                placeholder='Begining Date'
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label='Finish Date'>
            {getFieldDecorator('dateFinish', {
              rules: [
                {
                  required: true,
                  message: 'Please input your finish day of holiday'
                }
              ]
            })(
              <Input
                type='date'
                name='finishday'
                required
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label=' Option Type' style={{ textAlign: 'center' }}>
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select
                onChange={this.handleChange}
                placeholder='Select a option and change input text above'
                allowClear
              >
                <Option value='option1'>option1</Option>
                <Option value='option2'>option2</Option>
                <Option value='opiton3'>option3</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label='Reason'
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 100
            }}
          >
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: 'Please input reason for permission form'
                }
              ]
            })(
              <Input
                placeholder='Reason'
                onChange={this.handleChange}
                required
                name='reason'
                type='reason'
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
              Submit Form
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLeave = Form.create()(LeaveForm);
export default WrappedLeave;
