import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1.5px solid #C7C7C7;

  & > .content {
    width: 90%;

    & > h1 {
      font-size: 1.8rem;
      margin-bottom: 0;
    }
  }
`