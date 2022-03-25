import { Container, StarsContainer } from "../components/BusinessDetails/Review/ReviewElements";

interface Props {
    stars: number;
  }

export const Star = (props: Props) => {
    const star: JSX.Element[] = [...Array(5)].map((star, i) => {
      if (i <= Math.round(props.stars) - 1) {
        return <p key={i}>&#9733;</p>;
      } else {
        return <p key={i}>&#9734;</p>;
      }
    });
  
    return (
      <Container>
        <StarsContainer>{star}</StarsContainer>
      </Container>
    );
  };