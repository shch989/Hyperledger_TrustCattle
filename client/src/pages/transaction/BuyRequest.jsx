import React from 'react'
import { useParams } from 'react-router-dom';

const BuyRequest = () => {
  const { cattleId } = useParams();

  return (
    <div>{cattleId} 가축 구매 요청 페이지</div>
  )
}

export default BuyRequest