import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const StarsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  font-size: 1.5rem;

  & > p {
    margin-bottom: 0;
  }
`;

export const LeaveReviewButton = styled(Link)`
    height: 2rem;
    margin-top: 1rem;
    padding: 1.2rem;
    display: inline-flex;
    margin-right: auto;
    justify-content: center;
    align-items: center;
    background-color: #074ee8;
    border: none;
    border-radius: 6px;
    color: white;

  &:hover {
    color: white;
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
