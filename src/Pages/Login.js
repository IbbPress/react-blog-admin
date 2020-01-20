import React, { useState, useEffect } from "react";
import { Card, Input, Icon, Button, Spin, message } from "antd";
import axios from "axios";

// import servicePath from "../config/apiUrl";
import "../static/styles/login.css";
import { login } from "../config/api.js";
import { welcome } from "../config/util.js"

function Login (props) {

  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    // check login status
    let openId = localStorage.getItem('openId')
    let dataProps = { openId }
    if (openId) {
      axios({
        method: 'post',
        url: 'servicePath.checkOpenId',
        data: dataProps,
        withCredentials: true,
        header:{ 'Access-Control-Allow-Origin':'*' }
      })
      .then(resp => {
        if (resp.data.data) {
          message.success('已经登录')
          props.history.push('/index')
        }
      })
    }
  })

  const checkFormValues = async () => {
    
    if(!userName){
      message.error('用户名不能为空')
      return false
    }else if(!password){
      message.error('密码不能为空')
      return false
    }
    
    try {
      setIsLoading(true);
      await login({ userName, password });
      message.success(`${welcome()}，欢迎回来`)
      props.history.push('/index/list') 
    } catch (error) {
      message.success('登录失败')
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="login-box">
      <Spin tip="Loading" spinning={isLoading}>
        <Card title="blog system" bordered={true} style={{ width: 400, margin: '0 auto' }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            autoComplete="false"
            prefix={ <Icon type="user" style={{ color: 'rgba(0,0,0,.25' }} /> }
            onChange={ e=>{ setUserName(e.target.value) } }
            style={{ marginBottom: 30 }}
          />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={ <Icon type="key" style={{ color: 'rgba(0,0,0,.25' }} /> }
            onChange={ e=>{ setPassword(e.target.value) } }
            style={{ marginBottom: 30 }}
          />
          <br />
          <Button type="primary" size="large" block onClick={checkFormValues}
            style={{ marginBottom: 30 }}
          > Login in </Button>

        </Card>
      </Spin>
    </div>
  )
}

export default Login;