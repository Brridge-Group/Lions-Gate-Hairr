import styled from "styled-components";

export const Star = styled.label`
  font-size: 1.8rem;
  
  &:hover {
    cursor: pointer;
  }

  & > input {
    display: none;
  }
`;
