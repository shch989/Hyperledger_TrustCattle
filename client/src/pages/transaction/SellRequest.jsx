import React from 'react'
import { useParams } from 'react-router-dom';

const SellRequest = () => {
  const { cattleId } = useParams();

  return (
    <div>{cattleId} 가축 판매 신청 페이지</div>
  )
}

export default SellRequest