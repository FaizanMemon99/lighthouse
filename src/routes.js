// src/Routers.js
import { Layout, notification, Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './pages/Sidebar';
import { Content } from 'antd/es/layout/layout';
import CreateSetup from './pages/Dashboard/CreateSetup';

// lazy loader
const AuthPage = lazy(() => import('./pages/Auth/index'));
// const Login = lazy(() => import('./pages/Login'));

const Routers = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type,title,message) => {
    api[type]({
      message: title,
      description:
        message,
    });
  };
  const LoaderFallback = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <Spin />
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
    {contextHolder}
    {localStorage?.isAuth?<Sidebar/>:null}
    <Layout style={{margin:0}}>
      <Content>
        <Routes>
          <Route path='/' element={
            localStorage?.isAuth?
            <Dashboard openNotificationWithIcon={openNotificationWithIcon}/>
            :
            <AuthPage openNotificationWithIcon={openNotificationWithIcon} />} />
            {/* {localStorage?.isAuth? */}
              <Route path='/dashboard/create' element={<CreateSetup openNotificationWithIcon={openNotificationWithIcon}/>}/>
              {/* null */}
            {/* } */}
        </Routes>
      </Content>
    </Layout>
      <Suspense fallback={<LoaderFallback />}>
          {/* <Route path='/login' element={<Login />} /> */}
      </Suspense>
    </Layout>
  )
}

export default Routers;
