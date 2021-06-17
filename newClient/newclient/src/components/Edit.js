import React, { Component } from 'react';
import editBirth from '../services/editService';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';

class Edit extends Component {
  state = {
    birthdate: '',
    tcno: '',
    test: null
  };
  handleSubmit = e => {
    e.preventDefault();
    const { birth_date, identification_no } = this.state;
    const username = localStorage.getItem('username');
    console.log(birth_date);
    editBirth(username, birth_date, identification_no);
    this.setState({ test: 'true' });
  };
  handleChange = e => {
    console.log('name', e.target.name, 'value', e.target.value);
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

const EditPage = Form.create()(Edit);
export default connect(mapStateToProps)(EditPage);
