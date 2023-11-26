import React from 'react'
import { useParams } from 'react-router-dom';

const EditCattleInfoPage = () => {
  const { cattleId } = useParams();

  return (
    <div>{cattleId} 가축 정보 수정 페이지</div>
  )
}

export default EditCattleInfoPage