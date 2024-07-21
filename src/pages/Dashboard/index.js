import React, { useState } from 'react';
import { Button, Modal, Table, Typography } from 'antd';
import SetupIcon from '../../assets/SetupDashboardImage.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faGear, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "../../styles/dashboard.css"
import { Link, useNavigate } from 'react-router-dom';
const Dashboard = (props) => {
  const [tableLoader, settableLoader] = useState(false)
  const [openWhenThenModal, setopenWhenThenModal] = useState(false)
  const {openNotificationWithIcon}=props
  const navigate=useNavigate()
  const columnsWhen = [
    { title: 'Attributes', dataIndex: 'attribute', key: 'attributes',render:text=>text||'-' },
    { title: 'Operator', dataIndex: 'operator', key: 'operator',render:text=>text||'-' },
    { title: 'Lower Value', dataIndex: 'value', key: 'lowerValue',render:text=>text||'-' },
    { title: 'Upper Value', dataIndex: 'upperValue', key: 'upperValue',render:text=>text||'-' },
  ];
  
  const columnsThen = [
    { title: 'Attributes', dataIndex: 'attribute', key: 'attributes' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];
  const columns=[
    {
      ellipsis:true,
      title:'Id',
      dataIndex:'id',
      render:(text,data)=><Link onClick={(e)=>{
        e.preventDefault()
        setopenWhenThenModal(data)
      }}><FontAwesomeIcon icon={faEye} style={{paddingRight:10}}/>{text||'-'}</Link>
    },
    {
      ellipsis:true,
      title:'Policy Text',
      dataIndex:'policyText',
      render:text=>text||'-'
    },
    {
      ellipsis:true,
      title:'Policy Type',
      dataIndex:'policyType',
      render:text=>text||'-'
    },
    {
      ellipsis:true,
      title:'Start Date',
      dataIndex:'policyStartDate',
      render:text=>text||'-'
    },
    {
      ellipsis:true,
      title:'End Date',
      dataIndex:'policyEndDate',
      render:text=>text||'-'
    },
    {
      ellipsis:true,
      title:'Status',
      dataIndex:'status',
      render:text=><span style={{color:text==='Pending'?'orange':text==='Approved'?'green':''}}>{text||'-'}</span>
    },
    {
      ellipsis:true,
      title:'Created By',
      dataIndex:'createdBy',
      render:text=>text||'-'
    },
    {
      ellipsis:true,
      title:'Created On',
      dataIndex:'createdOn',
      render:text=>text||'-'
    },
    {
      // ellipsis:true,
      width:60,
      title:'',
      dataIndex:'',
      render:(text,data,ind) => <Button type="link" title='Delete' onClick={()=>{
        settableLoader(true)
        let tempwhenThenData=localStorage.getItem('whenThenPolicy')?JSON.parse(localStorage.getItem('whenThenPolicy')):[]
        setTimeout(()=>{
          openNotificationWithIcon('success','Policy Deleted successfully')
        localStorage.setItem('whenThenPolicy',tempwhenThenData?.filter((i,indx)=>indx!==ind)||[])
        settableLoader(false)
        },1000)
      }}><FontAwesomeIcon icon={faTrashAlt}/></Button>
    },
  ]

  return(
  <div className="dashboard">
    <Typography style={{fontSize:26,fontWeight:700}}>Dashboard</Typography>
    {localStorage?.getItem('whenThenPolicy')&&JSON.parse(localStorage?.getItem('whenThenPolicy'))?.length>0?
    
      <div className="table-container">
              <Table
              title={()=>
              <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
              <Button onClick={()=>navigate('/dashboard/create')} type="primary"><FontAwesomeIcon icon={faPlus} style={{paddingRight:5}}/>Create Policy</Button>
              </div>
              }
               loading={tableLoader} columns={columns} dataSource={JSON.parse(localStorage?.getItem('whenThenPolicy'))||[]} pagination={false} locale={{ emptyText: 'No data' }} />
            </div>
    :
      <div className="content">
      <div className="setup-card">
        <img src={SetupIcon} alt="Setup" />
        <Typography style={{fontSize:20,fontWeight:500}}>Setup your data models and users</Typography>
        <Button onClick={()=>navigate('/dashboard/create')} type="primary"><FontAwesomeIcon icon={faGear} style={{paddingRight:5}}/>Setup now</Button>
      </div>
    </div>}
    <Modal
    width={1000}
        title={`Policy details`}
        visible={openWhenThenModal}
        onCancel={()=>setopenWhenThenModal(false)}
        footer={null}
        destroyOnClose
      >
<div className="table-container" style={{margin:'10px 0'}}>
              <Typography className="table-header">When</Typography>
              <Table columns={columnsWhen} dataSource={openWhenThenModal?.whenData||[]} pagination={false} locale={{ emptyText: 'No data' }} />
            </div>
            <div className="table-container" style={{margin:'10px 0'}}>
              <Typography className="table-header">Then</Typography>
              <Table columns={columnsThen} dataSource={openWhenThenModal?.thenData||[]} pagination={false} locale={{ emptyText: 'No data' }} />
            </div>
      </Modal>
  </div>
  );
}

export default Dashboard;
