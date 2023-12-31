import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import styled from 'styled-components';
// components
import Input from '../UI/Input'
import Button from '../UI/Button';

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const navigate = useNavigate()

  const handleAdminSubmit = async (event) => {
    event.preventDefault()

    localStorage.setItem('token', userPw)
    localStorage.setItem('userName', userId)
    setUserId('')
    setUserPw('')
    navigate('/')
  };

  return (
      <form onSubmit={handleAdminSubmit}>
        <Input
          label="아이디"
          type="text"
          id="userid"
          value={userId}
          placeholder="아이디"
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          id="userpw"
          value={userPw}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setUserPw(e.target.value)}
        />
        <Button>로그인</Button>
      </form>
  )
}

export default SignIn