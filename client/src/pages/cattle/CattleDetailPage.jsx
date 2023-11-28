import React from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 1000px;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const DetailButtonStyle = styled.button`
  width: 90px;
  height: 30px;
  font-weight: 600;
  margin: 20px 0;
`

const CattleDetailPage = ({ cattle, onClose }) => {
  const { cattleID, ownerID, birthDate, gender, weight, vaccinationRecord, survivalStatus, price, parentCattleID } = cattle;

  return (
    <DetailContainer>
      <h2>가축 혈통 인증서</h2>
      <Table>
        <tbody>
          <TableRow>
            <TableCell>가축 ID</TableCell>
            <TableCell>{cattleID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>사육자 ID</TableCell>
            <TableCell>{ownerID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>출생일</TableCell>
            <TableCell>{birthDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>성별</TableCell>
            <TableCell>{gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>무게</TableCell>
            <TableCell>{weight} Kg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>접종기록</TableCell>
            <TableCell>
              {vaccinationRecord.map((vaccine, index) => (
                <div key={index}>
                  {vaccine.vaccineName} ({vaccine.date})
                </div>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>혈통 정보</TableCell>
            <TableCell>
              부(ID) : {parentCattleID.dad}
            </TableCell>
            <TableCell>
              모(ID) : {parentCattleID.mom}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>생존여부</TableCell>
            <TableCell>{survivalStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>가격</TableCell>
            <TableCell>{price} 원</TableCell>
          </TableRow>
        </tbody>
      </Table>

      <DetailButtonStyle onClick={onClose}>닫기</DetailButtonStyle>
    </DetailContainer>
  );
};

export default CattleDetailPage;