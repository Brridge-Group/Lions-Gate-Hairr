import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  // justify-content: center;
  justify-content: space-between;
  align-items: center;

  & > img {
    width: 8rem;
    height: 8rem;
    border-radius: 1rem;
  }

  & > .name {
    margin-left: 1.5rem;
    min-width: 40%;
  }

  & > .name > h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  & > .address {
    min-width: 30%;
    // margin-left: auto;
    // justify-content: flex-end;
  }

  & > .address > p {
    margin-bottom: 0.5rem;
    text-align: right;
  }
`
