import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button, Checkbox, Form, Input } from "antd";

import { UserData } from "../../models/user-data.model";

import { userLogin } from "../../services/user.service";
import { login } from "../../store/actions/auth-actions";

/**
 * layout.
 */
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
};

/**
 * tail layout.
 */
const tailLayout = {
  wrapperCol: {offset: 8, span: 16}
};

/**
 * Login component.
 * @param props: any
 * @constructor
 */
const Login = (props: any) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const onLogin = (values: any) => {
    const userData: UserData = {
      username: values.username,
      password: values.password
    };
    userLogin(userData).then((response: UserData) => {
      if (!!response) {
        dispatch(login(response));
        history.goBack();
      }
    });
  };

  /**
   * Login failed handler.
   * @param values
   */
  const onLoginFailed = (values: any) => {

  };

  /**
   * Login elements.
   */
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{remember: true}}
      onFinish={onLogin}
      onFinishFailed={onLoginFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{required: true, message: "Please input your username!"}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: "Please input your password!"}]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
