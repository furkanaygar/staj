import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { connect } from 'react-redux';
import { logout } from '../actions/authAction';

class Logout extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const a = localStorage.getItem('token');
    if (!a) {
      this.props.history.push('/');
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form className='logout-form'>
          <h1 style={{ textAlign: 'center' }}>Logout</h1>

          <Form.Item>
            {getFieldDecorator('signout')(<h1>Do you want to log out ?</h1>)}
          </Form.Item>
          <Form.Item
            style={{ textAlign: 'center' }}
            onClick={this.handleSubmit}
          >
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='link'
              className='logout-form-button'
            >
              Yes
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='link'
              className='logout-form-button'
            >
              No
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = props => {
  const { isAuthenticated, error, errorMessage, user } = props.auth;
  return {
    isAuthenticated,
    error,
    errorMessage,
    user
  };
};
const lgout = Form.create()(Logout);
export default connect(mapStateToProps)(lgout);
