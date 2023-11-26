import React from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../../components/common/NavBar/NavBar';

const EditProfilePage = () => {
  const { userId } = useParams();

  return (
    <div>
      <NavBar />
      {userId} 사육자 정보 수정 페이지
    </div>
  )
}

export default EditProfilePage