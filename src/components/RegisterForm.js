import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { doLogin, newUser } from "../actions/authActions";
import history from "../utils/history";

import {getGQL }from "../utils/getGQL";

import "../styles/RegisterForm.css";

const RegisterForm =  ({store, history, newUser, state, id, doLogOut, doLogin }) => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");


  const [form] = Form.useForm();

  useEffect (() => {
  if(id){ 
     history.push("/my_playlists")
   }
    console.log(login, password);
  }, [id])

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="registerForm">
          { 
          console.log('state: ',state),
          console.log('id: ',state.auth._id)
          }
      <div>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item onChange={(e)=> setLogin(e.target.value)}
            label="Username"
            name="username"
            value={login}
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

          <Form.Item onChange={(e)=> setPassword(e.target.value)}
            label="Password"
            name="password"
            value={password}
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
          <Form.Item onChange={(e)=> setConfPassword(e.target.value)}
            label="Confirm password"
            name="Confirm password"
            value={confPassword}
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
 
            <Button type="primary" htmlType="submit"
            disabled = {password !== confPassword}
            onClick={() => (login && password)? newUser(login, password) &&  console.log('state: ',state) : ''}
                // if (!response.errors && login && password) {
    //   useEffect(doLogin(login, password), [])
    //   doLogin && doLogin(login, password)? history.push("/private"): alert('Do not correct doLogin use');
    // } else {
    // }
          //   async () => {
          //     let response =  await getGQL("/graphql")(
          //       // let response = await getGQL(url)(
          //       `mutation User{
          //       createUser (login: "${login}", password: "${password}"){
          //       _id login
          //         }
          //     }`
          //     )
          //     .then((response) => {
          //       console.log(response.data.createUser);
                // if (!response.errors && login && password) {
                //   history.push("/login");
                // } else {
                // }
          //     });
          //   }
          // }
            type="primary"
            >         
              Submit
            </Button>
        <Link to="/" className="link-approval">I have an account</Link>
        {/* <Link to="/login" className="link-approval">Sign_in</Link> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isCreateUser: !!state.auth.token,
  state: state,
  id: state && state.auth && state.auth.data && state.auth.data.data && state.auth.data.data.sub && state.auth.data.data.sub.id,
});

const mapDispatchToProps = (dispatch) => ({
  newUser: (login, password) => dispatch(newUser(login, password)),
  // dologOut: logOut,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);


// export default RegisterForm;