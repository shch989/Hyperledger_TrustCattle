import React, { useState } from 'react'
// components
import Input from '../UI/Input'
import Button from '../UI/Button';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const [farmAddress, setFarmAddress] = useState('');

  const handleAdminSubmit = async (event) => {
    event.preventDefault()

    alert(`로그인 되었습니다.`)
    setUserId('')
    setUserName('')
    setUserNumber('')
    setUserEmail('')
    setUserPw('')
    setFarmAddress('')
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
        label="이름"
        type="text"
        id="username"
        value={userName}
        placeholder="이름"
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        label="전화번호"
        type="number"
        id="usernumber"
        value={userNumber}
        placeholder="전화번호 (예: 010-1234-5678)"
        onChange={(e) => setUserNumber(e.target.value)}
      />
      <Input
        label="이메일"
        type="text"
        id="useremail"
        value={userEmail}
        placeholder="이메일"
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Input
        label="비밀번호"
        type="password"
        id="userpw"
        value={userPw}
        placeholder="비밀번호를 입력해주세요."
        onChange={(e) => setUserPw(e.target.value)}
      />
      <Input
        label="농장 주소"
        type="text"
        id="farmaddress"
        value={farmAddress}
        placeholder="농장 주소 (최대한 상세히)"
        onChange={(e) => setFarmAddress(e.target.value)}
      />
      <Button>회원가입</Button>
    </form>
  )
}

export default SignUp