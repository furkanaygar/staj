import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import { Link } from 'react-router-dom';

class Logout extends Component {
  handleSubmit = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthorizationToken(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form className='logout-form'>
          <h1 style={{ textAlign: 'center' }}>Logout</h1>

          <Form.Item>
            {getFieldDecorator('signout')(<h1>Do you want to log out ?</h1>)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              onClick={this.handleSubmit}
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              type='link'
              className='logout-form-button'
              href='http://localhost:3000/'
            >
              Yes
              <Link to='/'></Link>
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
const lgout = Form.create()(Logout);
export default lgout;
