import React from "react";
import { useDispatch } from "react-redux";

import { Button, Form, Input, message } from "antd";

import { UserData } from "../../models/user-data.model";

import { registerUser } from "../../services/user.service";

import { signup } from "../../store/actions/auth-actions";

import './Register.css';

/**
 * Register component.
 * @param props: any
 * @constructor
 */
const Register = (props: any) => {
  const dispatch = useDispatch();

  const isValidPassword = false;

  /**
   * Layout object.
   */
  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  /**
   * Validation messages object.
   */
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };

  /**
   * On form finish handler.
   * @param values: any
   */
  const onFinish = (values: any) => {
    const userData: UserData = {
      username: values.user.username,
      password: values.user.confirmPassword,
      fullName: values.user.fullName,
      email: values.user.email,
    };
    registerUser(userData).then((response) => {
      if (!!response && response.status === 'success') {
        dispatch(signup(userData));
        message.success(`${response.message}. Please login.`);
        window.location.reload();
      } else {
        message.error('Sign in failed. Please try again.');
      }
    });
  };

  /**
   * Password change handler.
   * @param e
   */
  const onPasswordChange = (e: any) => {
    // const password = e.target.value;
  };

  /**
   * Register elements.
   */
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'username']} label="Username" rules={[{required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'fullName']} label="Full Name" rules={[{required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{type: 'email', required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'password']} label="Password" rules={[{required: true}]}>
        <Input.Password onChange={onPasswordChange}/>
      </Form.Item>
      <Form.Item name={['user', 'confirmPassword']} label="Confirm Password" rules={[{required: true}]}
                 validateStatus={isValidPassword ? "success" : "error"}>
        <Input.Password onChange={() => {
        }}/>
      </Form.Item>
      <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
