import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  border-radius: 15px;
  border: 2px solid #ccc;
  padding: 10px;
  display: inline-block;
  background: white;
  width: 25vw
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;

interface RoundedInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RoundedInput: React.FC<RoundedInputProps> = ({ value, onChange }) => {
  return (
    <InputContainer>
      <StyledInput value={value} onChange={onChange} placeholder='Enter your name, no data is recorded on this website'/>
    </InputContainer>
  );
};

export default RoundedInput;
