import React from 'react'
import { Redirect } from 'umi';

export default (props:any) => {
  const isLogin = true;
  if (isLogin) {
    return <>{ props.children }</>
  }
  return <Redirect to="login" />
}