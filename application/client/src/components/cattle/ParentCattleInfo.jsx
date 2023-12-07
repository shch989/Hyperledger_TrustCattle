import React from 'react';
import Input from '../../components/UI/Input';

const ParentCattleInfo = ({ parentCattle, onParentCattleChange }) => {
  return (
    <>
      <Input
        label="부(공백 가능)"
        type="text"
        value={parentCattle.male}
        placeholder="부모개체 아이디(부)"
        onChange={(e) => onParentCattleChange({ ...parentCattle, male: e.target.value })}
      />
      <Input
        label="모(공백 가능)"
        type="text"
        value={parentCattle.female}
        placeholder="부모개체 아이디(모)"
        onChange={(e) => onParentCattleChange({ ...parentCattle, female: e.target.value })}
      />
    </>
  );
};

export default ParentCattleInfo;