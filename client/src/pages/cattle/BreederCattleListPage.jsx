import React from 'react'
import { useParams } from 'react-router-dom';

const BreederCattleListPage
  = () => {
    const { userId } = useParams();

    return (
      <div>{userId} 사육자 가축 목록 페이지</div>
    )
  }

export default BreederCattleListPage
