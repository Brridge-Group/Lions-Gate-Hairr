import React from "react";

import { Container } from "./ServicesAndFeaturesElements";

interface Props {
  features: {
    _id: string;
    name: string;
  }[];
  services: {
    _id: string;
    name: string;
  }[];
}

export const ServicesAndFeatures = (props: Props) => {
  return (
    <React.Fragment>
      <Container>
        <h4>Services</h4>
        <ul>
          {props.services.map((service) => (
            <li key={service._id}>{service.name}</li>
          ))}
        </ul>
      </Container>
      <Container>
        <h4>Features</h4>
        <ul>
          {props.features.map((feature) => (
            <li key={feature._id}>{feature.name}</li>
          ))}
        </ul>
      </Container>
    </React.Fragment>
  );
};
