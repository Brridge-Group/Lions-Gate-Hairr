import { Content, StarContainer } from "./ReviewElements";

interface Props {
  stars: number
}

const Review = (props: Props) => {

  const stars: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return <p>&#9733;</p>
    } else {
      return <p>&#9734;</p>
    }
  })

  return (
    <Content>
      <StarContainer>
        {stars}
      </StarContainer>
    </Content>
  );
};

export default Review;
