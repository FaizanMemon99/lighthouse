// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const {setauthPage,openNotificationWithIcon}=props
  const [isError, setisError] = useState(false)

  const loginFn=(val)=>{
    if(val?.email==='lighthouse@gmail.com' && val?.password==='lightHouse@123')
    {
      localStorage.setItem('isAuth',true)
      window.location.reload()
      openNotificationWithIcon('success','Login Successful','Welcome Admin!')
      setisError(false)
    }
    else{
      setisError(true)
      openNotificationWithIcon('error','Login Failed','Wrong Email / Password')
    }
  }
  return (
    <div className="main-container">
            <Typography className='headerTypography' style={{marginBottom:30}}>Login to Lighthouse</Typography>
            <Form layout="vertical" onFinish={loginFn}>
              <Form.Item
                label="Email *"
                name="email"
                validateStatus={isError?'error':'success'}
                rules={[{ required: true, message: 'Please enter your email!' }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password *"
                name="password"
                validateStatus={isError?'error':'success'}
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Typography className='subHeaderTypography' style={{fontSize:13,textAlign:'center',marginTop:24}}>Don't have an account? <Link style={{fontWeight:600}} onClick={(e)=>{
              e.preventDefault()
              setauthPage(1)
            }}>Sign Up</Link></Typography>
          </div>       
  );
};

export default Login;
       