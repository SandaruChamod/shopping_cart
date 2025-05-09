import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Dropdown, Menu } from "antd";

import { logout } from "../../../store/actions/auth-actions";

import Aux from '../../../containers/hoc/Aux';

/**
 * Login button component.
 * @param props: any
 * @constructor
 */
const LoginButton = (props: any) => {
  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  /**
   * User userMenu click handler.
   * @param key
   */
  const onUserMenuClick = ({key}: { key: any }) => {
    if (key === "logout") {
      // Clear user data from local storage.
      dispatch(logout());
    }
  };

  /**
   * User menu sub component.
   */
  const userMenu = (
    <Menu onClick={onUserMenuClick}>
      <Menu.Item key="logout">
        <a rel="noopener noreferrer" href="/">
          LogOut
        </a>
      </Menu.Item>
    </Menu>
  );

  /**
   * Login button elements.
   */
  return (
    <Aux>
      {authState.isLoggedIn ? (
        <div>
          <Dropdown overlay={userMenu} placement="bottomLeft">
            <Button key="login" onClick={e => e.preventDefault()}>
              {authState.userProfile ? `${authState.userProfile.fullName}` : null}
            </Button>
          </Dropdown>
        </div>
      ) : (
        <Link to="/login">
          <Button key="login" type="primary">
            Login
          </Button>
        </Link>
      )}
    </Aux>
  )
};

export default LoginButton;
