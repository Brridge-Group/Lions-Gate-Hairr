import styled from "styled-components";

export const PhoneContainer = styled.div`
  width: 10rem;
  height: 4rem;
  margin: 4rem auto 1.6rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #074ee8;
  border-radius: 6px;
  color: white;

  & p {
    margin-bottom: 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #074ee8;
  border: none;
  border-radius: 6px;
  color: white;
  font-family: inherit;

  &:hover {
    cursor: pointer;
  }

  & > img {
    height: 40%;
    margin-right: 0.6rem;
  }

  & > p {
    font-size: 1rem;
  }
`;
