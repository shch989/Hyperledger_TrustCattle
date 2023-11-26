import React from 'react'
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();

  return (
    <div>{userId} 사육자 정보 수정 페이지</div>
  )
}

export default EditProfile