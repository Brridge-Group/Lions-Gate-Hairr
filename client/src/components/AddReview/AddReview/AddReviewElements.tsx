import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  & > h2 {
    margin-top: 2rem;
    font-size: 1.2rem;
  }
`;

export const Header = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;

  & > h1 {
    font-size: 1.8rem;
    margin: 0;
    padding: 0;
  }
`;

export const HR = styled.hr`
  margin: 0;
`;

export const ReviewForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  font-weight: 400;

  & > label {
    padding: 0;
    margin: 0;
    display: block;
    font-weight: 400;
  }

  & > textarea {
    width: 100%;
    margin-top: 1rem;
    display: block;
  }

  & > button {
    align-self: end;
    padding: 0.5rem 1rem;
    margin-top: 2rem;

    background-color: #074ee8;
    border: none;
    border-radius: 0.2rem;
    color: white;
  }

  & > #star-rating {
    display: flex;
    justify-content: center;
  }
`;
