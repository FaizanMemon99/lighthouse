// src/pages/SignUp.js
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
  const {setauthPage}=props
  return (
    <div className="main-container">

            <Typography className='headerTypography'>Sign up</Typography>
            <Typography className='subHeaderTypography' style={{marginBottom:30}}>Create a Lighthouse account</Typography>
            <Form layout="vertical" onFinish={()=>setauthPage(0)}>
              <Form.Item
                label="Name *"
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                label="Email *"
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password *"
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password placeholder="Create a password" />
              </Form.Item>
              <Typography className='subHeaderTypography' style={{fontSize:13,fontWeight:400,marginBottom:24}}>Must be at least 8 characters.</Typography>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Get started
                </Button>
              </Form.Item>
            </Form>
            <Typography className='subHeaderTypography' style={{fontSize:13,textAlign:'center'}}>Already have an account? <Link style={{fontWeight:600}} onClick={(e)=>{
              e.preventDefault()
              setauthPage(0)
            }}>Log in</Link></Typography>
          </div>
  );
};

export default SignUp;
