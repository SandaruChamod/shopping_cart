import React from 'react';

import { Tabs } from "antd";

import Aux from "../hoc/Aux";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";

import './AuthContainer.css';

const {TabPane} = Tabs;

/**
 * Auth container component.
 * @param props
 * @constructor
 */
const AuthContainer = (props: any) => {

  return (
    <Aux>
      <div className="auth-context">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Login" key="1">
            <div className="login-box">
              <Login/>
            </div>
          </TabPane>
          <TabPane tab="Register" key="2">
            <div className="register-box">
              <Register/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Aux>
  );
};

export default AuthContainer;
