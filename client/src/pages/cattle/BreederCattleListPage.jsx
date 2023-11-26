import React from 'react'
import { useParams } from 'react-router-dom';

const BreederCattleList = () => {
  const { userId } = useParams();

  return (
    <div>{userId} 사육자 가축 목록 페이지</div>
  )
}

export default BreederCattleList