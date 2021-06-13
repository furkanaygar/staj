import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class Edit extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form className='edit-form'>
          <h1 style={{ textAlign: 'center' }}>Edit</h1>
          <Form.Item>
            {getFieldDecorator('birth-date', {
              rules: [
                { required: false, message: 'Please input your birthday' }
              ]
            })(
              <Input
                prefix={<Icon type='rocket' theme='filled' />}
                placeholder='Birthday'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('identification-no', {
              rules: [
                { required: false, message: 'Please input your Tc number' }
              ]
            })(
              <Input
                prefix={<Icon type='notification' theme='filled' />}
                placeholder='TC No'
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
