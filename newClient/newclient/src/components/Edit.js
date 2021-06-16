import React, { Component } from 'react';
import editBirth from '../services/editService';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';

class Edit extends Component {
  state = {
    birthdate: '',
    tcno: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { birth_date, identification_no } = this.state;
    editBirth(birth_date, identification_no);
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
    if (isAuthenticated) {
      const a = localStorage.getItem('username');
      this.props.history.push(`/api/users/${a}/edit`);
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} className='edit-form'>
          <h1 style={{ textAlign: 'center' }}>Edit</h1>
          <Form.Item>
            {getFieldDecorator('birth_date', {
              rules: [
                { required: false, message: 'Please input your birthday' }
              ]
            })(
              <Input
                prefix={<Icon type='rocket' theme='filled' />}
                placeholder='Birthday'
                onChange={this.handleChange}
                required
                name='birth_date'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('identification_no', {
              rules: [
                { required: false, message: 'Please input your Tc number' }
              ]
            })(
              <Input
                prefix={<Icon type='notification' theme='filled' />}
                placeholder='TC No'
                onChange={this.handleChange}
                required
                name='identification_no'
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
              Edit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const EditPage = Form.create()(Edit);
export default EditPage;
