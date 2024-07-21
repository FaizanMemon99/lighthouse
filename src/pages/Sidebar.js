import React, { useState } from 'react';
import { Avatar, Col, Input, Layout, Menu, Row, Typography } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import LightHouseLogo from '../assets/LightHouseLogo.svg'
import AvatarIcon from '../assets/Avatar.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHomeAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import "../styles/dashboard.css"
const { Sider } = Layout;

const Sidebar = () => {
  const Navigate=useNavigate()
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider width={250} className='sideBarMainDiv' collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
     <div className="dashboardLogo" style={{justifyContent:collapsed?'center':'start',cursor:"pointer"}}
     onClick={()=>Navigate('/')}
     >
            <Avatar
              src={LightHouseLogo}  
            />
              {collapsed?null:<Typography style={{transition: 'color 0.3s'}}>Lighthouse</Typography>}
            </div> 
           {collapsed?null:<div className='searchSection'>
              <Input
                placeholder='Search'
                prefix={<FontAwesomeIcon icon={faMagnifyingGlass} style={{paddingRight:5}}/>}
              />
            </div>}
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faHomeAlt} />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
      </Menu>
      <Row className='logoutSection' style={{justifyContent:collapsed?'center':'start'}}>
        <Col span={collapsed?24:4}>
            <Avatar src={AvatarIcon}/>
        </Col>
        {collapsed?null:<>
            <Col span={17}>
              <Typography title='Lighthouse'>
                Lighthouse
              </Typography>
              <Typography title='lighthouse@gmail.com'>
                lighthouse@gmail.com
              </Typography>
            </Col>
            <Col span={2}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color:'#98A2B3',cursor:'pointer'}} title='Logout'
              onClick={()=>{
                localStorage.removeItem('isAuth')
                window.location.replace('/')
              }}
            />
            </Col></>}
      </Row>
    </Sider>
  );
};

export default Sidebar;
