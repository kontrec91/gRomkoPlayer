import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {  Link } from "react-router-dom";

import { doLogin } from "../actions/authActions";
import { connect } from "react-redux";


// import {getGQL} from "../utils/getGQL";
import "../styles/RegisterForm.css";

const LoginForm = ({  history, doLogin, regUser, isLoggedIn, state }) => {
  const [form] = Form.useForm();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isLoggedIn && history.push("/my_playlists");
  }, [isLoggedIn]);

  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  function onLogin() {
    doLogin && doLogin(login, password);
    // console.log(login);
  }

  return (
    <div className="registerForm">
      <div>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            value={onLogin}
            onChange={(e) => setLogin(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              onChange={(e) => {
                form.setFieldsValue({ username: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>


          <Form.Item>
            <Button 
            type="primary" 
            htmlType="submit"
            disabled={!login || !password}
            onClick={()=> onLogin(login, password) }
            >
              Submit
            </Button>
            <Link to="/registration" className="link-approval" 
            >Registration</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  doLogin: (login, password) => dispatch(doLogin(login, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

