import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  width: 90%;
  margin-top: 4rem;
  display: flex;

  & > img {
    width: 8rem;
    height: 8rem;
    border-radius: 1rem;
  }

  & > .name {
    margin-left: 2rem;
  }

  & > .name > h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  & > .address {
    margin-left: auto;
  }

  & > .address > p {
    margin-bottom: 0.5rem;
    text-align: right;
  }
`