import React from "react";

import { Container, StarsContainer, LeaveReviewButton } from "./ReviewElements";

interface Props {
  id?: string;
  stars: number;
}

const isLoggedIn: boolean = true;

const Review = (props: Props) => {
  const stars: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return <p key={i}>&#9733;</p>;
    } else {
      return <p key={i}>&#9734;</p>;
    }
  });

  return (
    <Container>
      <StarsContainer>{stars}</StarsContainer>
      {isLoggedIn ? (
        <LeaveReviewButton to={props.id + "/reviews/new"}>
          Leave a Review
        </LeaveReviewButton>
      ) : null}
    </Container>
  );
};

export default Review;
