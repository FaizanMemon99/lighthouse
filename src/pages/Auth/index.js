import React, { useState } from 'react'
import '../../styles/auth.css'
import { Avatar, Col, Row, Typography } from 'antd'
import LightHouseLogo from '../../assets/LightHouseLogo.svg'
import SignUp from './SignUp'
import Login from './Login'
const Auth = (props) => {
    const [authPage, setauthPage] = useState(0)

  return (
    <div className="signup-container">
      <Row style={{width:'100%'}}>
        <Col xs={24} md={14} className="form-section">
          <div className="form-container">
            <div className="logo">
            <Avatar
              src={LightHouseLogo}  
            />
              <Typography>Lighthouse</Typography>
            </div> 
            <div>
                {authPage===0?
                <Login openNotificationWithIcon={props?.openNotificationWithIcon} authPage={authPage} setauthPage={setauthPage}/>    
                :
                <SignUp openNotificationWithIcon={props?.openNotificationWithIcon} authPage={authPage} setauthPage={setauthPage}/>
                }
                </div>
            <div/>
          </div>
            <Typography className='subHeaderTypography' style={{fontSize:14,position:'absolute',bottom:10,left:20,fontWeight:500}}><span style={{fontWeight:600}}>©</span> Shoreside 2024</Typography>
        </Col>
        <Col xs={0} md={10} className="image-section">
          <div className="image-container"></div>
        </Col>
      </Row>
    </div>
  )
}

export default Auth