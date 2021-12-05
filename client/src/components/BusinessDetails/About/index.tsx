import { Container, Content } from "./AboutElements";

interface Props {
  name: string;
  description: string;
  image: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

const About = (props: Props) => {
  return (
    <Container>
      <Content>
        <img
          src={props.image}
          alt="Hair salon."
        />
        <div className="name">
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
        <div className="address">
          <p>{props.address.street}</p>
          <p>{props.address.city}, {props.address.province}</p>
          <p>{props.address.postalCode}</p>
        </div>
      </Content>
    </Container>
  );
};

export default About;
