import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { Option } = Select;

const CreateSetup = (props) => {
  const {openNotificationWithIcon}=props
  const [form] = Form.useForm();
  const location=useLocation()
  const navigate=useNavigate()
  const [openWhenThenModal, setopenWhenThenModal] = useState(false)
  const [operators, setoperators] = useState([])
  const [whenThenData, setwhenThenData] = useState([])
  const [buttonLoader, setbuttonLoader] = useState(false)
  const variableWhenOptions=[
    {
      "value": "currency",
      "label": "Currency Code",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "CURRENCY_CODE",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "IN",
        "NOT IN",
        "==",
        "!="
      ]
    },
    {
      "value": "discountPercentage",
      "label": "Discount(%)",
      "dataType": "P",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        ">=",
        ">",
        "<",
        "<="
      ]
    },
    {
      "value": "deductionApplicable",
      "label": "Deduction Applicable",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "dpDelay",
      "label": "DP is Delayed",
      "dataType": "B",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "recovery",
      "label": "Recovery",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "onlineMeeting",
      "label": "Online Meeting",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "leadSource",
      "label": "Lead Source",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "LEAD_SOURCE",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "customerCity",
      "label": "Customer City",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "CITY_LIST",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "mortgage",
      "label": "Mortgage (Y/N)",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "spaFlag",
      "label": "SPA flag",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "unitCategory",
      "label": "Unit Category(Villa/Apt)",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "UNIT_CATEGORY",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "projectCountryCode",
      "label": "Project Country",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "COUNTRY_LIST",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN",
        "==",
        "!="
      ]
    },
    {
      "value": "salesTeam",
      "label": "Sales Team Name",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "SALES_TEAM",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN",
        "==",
        "!="
      ]
    },
    {
      "value": "welcomeCall",
      "label": "Welcome Call (Y/N)",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "propertyType",
      "label": "Property Type",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "PROPERTY_TYPE",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "agentTagged",
      "label": "Agent/Vendor Tagged to Deal",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "oldProject",
      "label": "Old Project",
      "dataType": "B",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": "CommissionLine",
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "discountException",
      "label": "Discount Exception",
      "dataType": "B",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "docOk",
      "label": "Document Is OK",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "registrationDate",
      "label": "Sale Date (Original)",
      "dataType": "D",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<="
      ]
    },
    {
      "value": "amountCollected",
      "label": "Total Collection (From Customer)",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "totalSaleInMonth",
      "label": "Total Sale in Monch",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "reservationPrice",
      "label": "Sold Price",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "agentId",
      "label": "Agent",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "AGENT_LIST",
      "attType": "I",
      "ruleObject": "AgentLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "soldPriceAfterRebate",
      "label": "Sold Price (After Rebate)",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "B",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "floorNumber",
      "label": "Floor Number",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "collectionPercentage",
      "label": "Collection (%)",
      "dataType": "P",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<="
      ]
    },
    {
      "value": "newProject",
      "label": "New Project (Y/N)",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "projectCity",
      "label": "Project City",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "CITY_LIST",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "agentDealAudited",
      "label": "Agent Booking Audited",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "agentCountryCode",
      "label": "Agent Country",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "COUNTRY_LIST",
      "attType": "I",
      "ruleObject": "AgentLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "bedroomTypeCode",
      "label": "Bedroom Type Code of Units",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "BEDROOM_TYPE_CODE",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "projectCode",
      "label": "Project Code",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "PROJECT_CODE",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "buildingCode",
      "label": "Building Code",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "BUILDING_CODE",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "unitCode",
      "label": "Unit Name",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "UNIT_LIST",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "bookingStatus",
      "label": "Booking Status",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "BOOKING_STATUS",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN",
        "==",
        "!="
      ]
    },
    {
      "value": "registrationId",
      "label": "Registration Id",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN",
        "==",
        "!="
      ]
    },
    {
      "value": "bookingType",
      "label": "Booking Type",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "BOOKING_TYPE",
      "attType": "I",
      "ruleObject": "RegistrationLine",
      "operators": [
        "IN",
        "NOT IN"
      ]
    },
    {
      "value": "agentType",
      "label": "Agent Type (Person or Organization)",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "AGENT_TYPE",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "IN",
        "NOT IN",
        "==",
        "!="
      ]
    },
    {
      "value": "depositReceived",
      "label": "Deposit Received (Yes/No)",
      "dataType": "T",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "I",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    }
  ]
  const variableThenOptions=[
    {
      "value": "qualified",
      "label": "Qualified",
      "dataType": "B",
      "visibleYn": "Y",
      "displayType": "LOV",
      "lovApi": "YES_NO",
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!="
      ]
    },
    {
      "value": "rmGrossRate",
      "label": "RM Gross Rate",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "dosGrossRate",
      "label": "DOS Gross Rate",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "hosGrossRate",
      "label": "HOS Gross Rate",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "hodGrossRate",
      "label": "HOD Gross Rate",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "rmDeductions",
      "label": "RM Deductions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "dosDeductions",
      "label": "DOS Deductions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "hosDeductions",
      "label": "HOS Deductions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "hodDeductions",
      "label": "HOD Deductions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "rmAdditions",
      "label": "RM Additions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "dosAdditions",
      "label": "DOS Additions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "hosAdditions",
      "label": "HOS Additions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "hodAdditions",
      "label": "HOD Additions",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "O",
      "ruleObject": null,
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    },
    {
      "value": "soldPriceAfterRebate",
      "label": "Sold Price (After Rebate)",
      "dataType": "N",
      "visibleYn": "Y",
      "displayType": "MENT",
      "lovApi": null,
      "attType": "B",
      "ruleObject": "RegistrationLine",
      "operators": [
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "BET"
      ]
    }
  ]
  const columnsWhen = [
    { title: 'Attributes', dataIndex: 'attribute', key: 'attributes',render:text=>text||'-' },
    { title: 'Operator', dataIndex: 'operator', key: 'operator',render:text=>text||'-' },
    { title: 'Lower Value', dataIndex: 'value', key: 'lowerValue',render:text=>text||'-' },
    { title: 'Upper Value', dataIndex: 'upperValue', key: 'upperValue',render:text=>text||'-' },
    { title: 'Action', key: 'action', render: (text,data,ind) => <Button type="link" title='Delete' onClick={()=>{
      let tempwhenThenData=JSON.parse(JSON.stringify(whenThenData))
      setwhenThenData(tempwhenThenData?.filter((i,indx)=>indx!==ind)||[])
      openNotificationWithIcon('info','Removed successfully')
    }}><FontAwesomeIcon style={{fontSize:'inherit'}} icon={faTrashAlt}/></Button> },
  ];
  
  const columnsThen = [
    { title: 'Attributes', dataIndex: 'attribute', key: 'attributes' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Action', key: 'action', render: (text,data,ind) => <Button type="link" title='Delete' onClick={()=>{
      let tempwhenThenData=JSON.parse(JSON.stringify(whenThenData))
      setwhenThenData(tempwhenThenData?.filter((i,indx)=>indx!==ind)||[])
      openNotificationWithIcon('info','Removed successfully',2)
    }}><FontAwesomeIcon style={{fontSize:'inherit'}} icon={faTrashAlt}/></Button> },
  ];
  const createFn=(val)=>{
    if(!whenThenData?.filter((i)=>i.type==='when')?.length>0)
      {
        openNotificationWithIcon('error','Validation Error','Please add atleast one when policy')
      }
      else if(!whenThenData?.filter((i)=>i.type==='then')?.length>0)
        {
          openNotificationWithIcon('error','Validation Error','Please add atleast one then policy')
        }
        else{
      setbuttonLoader(true)
      try{
        let tempLocalData=localStorage.getItem('whenThenPolicy')?JSON.parse(localStorage.getItem('whenThenPolicy')):[]
        tempLocalData.push({
          id:tempLocalData?.length+1,
          policyText:val?.policyText||'-',
          policyType:val?.policyType||'-',
          policyStartDate:val?.policyStartDate?val?.policyStartDate?.format('DD-MMM-YYYY'):'-',
          policyEndDate:val?.policyEndDate?val?.policyEndDate?.format('DD-MMM-YYYY'):'-',
          whenData:whenThenData?.filter((i)=>i.type==='when')||[],
          thenData:whenThenData?.filter((i)=>i.type==='then')||[],
          createdOn:dayjs()?.format('DD-MMM-YYYY HH:mm a'),
          createdBy:'Lighthouse',
          status:'Pending'
        })
        localStorage.setItem('whenThenPolicy',JSON.stringify(tempLocalData||[]))
        setTimeout(() => {
          openNotificationWithIcon('success','Policy Added','Your new policy is added successfully')
        }, 800);
        setTimeout(() => {
          setbuttonLoader(false)
          navigate('/')
        }, 1000);
      }
      catch(e){
        console.log(e)
        openNotificationWithIcon('error','Error','Something went wrong. Please try again.')
        setbuttonLoader(false)
      }
    }
  }
  
  const handleCancel=()=>{
    setopenWhenThenModal(false)
  }
  const updateFn=(val)=>{
    const tempwhenThenData=JSON.parse(JSON.stringify(whenThenData))
    tempwhenThenData.push({
      attribute:val?.variable?.label||'-',
      operator:val?.operator||'-',
      value:val?.value,
      type:openWhenThenModal
    })
    setwhenThenData(tempwhenThenData)
    handleCancel()
  }
  

  return (
    <div className='dashboard'>
    <Typography style={{fontSize:26,fontWeight:700,textTransform:'capitalize',display:'flex',alignItems:'center'}}>
    <Button style={{marginRight:10}} onClick={()=>navigate('/')}><FontAwesomeIcon icon={faArrowLeft}/></Button>
    {location?.pathname?.replaceAll('/',' | ')?.slice(2)}</Typography>
    <Divider style={{borderColor:'#1570EF',borderWidth:4,marginTop:15}}/>
    <div className="policy-form-container">
      <Form preserve={false} layout="vertical" onFinish={createFn}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Policy Text" name="policyText" 
            rules={[{ required: true, message: 'Please enter Policy Text' }]}
            >
              <Input placeholder="Enter Policy Text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Policy Type" name="policyType" 
            rules={[{ required: true, message: 'Please select Policy Type' }]}>
              <Select placeholder="Select Policy Type" showSearch>
                <Option value="Qualifier">Qualifier</Option>
                <Option value="Modifier">Modifier</Option>
                <Option value="Additions">Additions</Option>
                <Option value="Deductions">Deductions</Option>
                <Option value="Qualifier(Exception)">Qualifier(Exception)</Option>
                <Option value="Modifier(Exception)">Modifier(Exception)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Policy Start Date" name="policyStartDate" 
            rules={[{ required: true, message: 'Please select Policy Start Date' }]}>
              <DatePicker style={{ width: '100%' }} placeholder="Choose Start Date" format='DD-MMM-YYYY'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Policy End Date" name="policyEndDate" 
            rules={[{ required: true, message: 'Please select Policy End Date' }]}>
              <DatePicker style={{ width: '100%' }} placeholder="Choose End Date" 
                format='DD-MMM-YYYY'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <div className="table-container">
              <Typography className="table-header">When <Button style={{color:'inherit',fontSize:20}} type="text" icon="+" onClick={()=>setopenWhenThenModal('when')} /></Typography>
              <Table columns={columnsWhen} dataSource={whenThenData?.filter((i)=>i.type==='when')||[]} pagination={false} locale={{ emptyText: 'No data' }} />
            </div>
          </Col>
          <Col span={12}>
            <div className="table-container">
            <Typography className="table-header">Then <Button style={{color:'inherit',fontSize:20}} type="text" icon="+" onClick={()=>setopenWhenThenModal('then')} /></Typography>
              <Table columns={columnsThen} dataSource={whenThenData?.filter((i)=>i.type==='then')||[]} pagination={false} locale={{ emptyText: 'No data' }} />
            </div>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginTop: 20,justifyContent:"flex-end" }}>
          {/* <Col>
            <Button>Back</Button>
          </Col> */}
          <Col>
        <Form.Item style={{marginBottom:0}}>
            <Button htmlType="submit" type="primary"
            loading={buttonLoader}
            >Create Policy</Button>
        </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        title={`Policy ${openWhenThenModal}`}
        visible={openWhenThenModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form className='policy-form-container'
        preserve={false}
        onFinish={updateFn}
        style={{background:'#fff',border:'none',boxShadow:'none',paddingBottom:0}}
        destroyOnClose
          form={form}
          layout="vertical"
          name="policyForm"
        >
          <Form.Item
            name="variable"
            label="Variable"
            rules={[{ required: true, message: 'Please select a variable!' }]}
            getValueFromEvent={(e,data)=>data}
          >
            <Select showSearch placeholder="Select Type"  
            onChange={(e,data)=>setoperators(data?.operators?.map(item=>{return {label:item,value:item}})||[])}
             options={openWhenThenModal==='when'?variableWhenOptions:variableThenOptions}/>
          </Form.Item>
          <Form.Item
            name="operator"
            label="Operator"
            rules={[{ required: true, message: 'Please select an operator!' }]}
          >
          <Select showSearch placeholder="Select Operator" options={operators}/>
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please enter a value!' }]}
          >
            <Input placeholder="Enter value" />
          </Form.Item>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
            <Button onClick={handleCancel}>
            Cancel
            </Button>
            <Form.Item style={{margin:0}}>
              <Button type='primary' htmlType='submit'>
              Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
    </div>
  )
}

export default CreateSetup