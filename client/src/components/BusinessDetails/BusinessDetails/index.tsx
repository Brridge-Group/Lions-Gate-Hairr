import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Header } from "./BusinessDetailsPageElements";
import About from "../About";
import Book from "../Book";
import Review from "../Review";

interface RouteParams {
  id: string;
}

interface Business {
  name: string;
  description: string;
  image: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  stars: number;
  phone: string;
}

const BusinessPage = () => {
  const [businessData, setBusinessData] = useState<Business>();
  let { id } = useParams<RouteParams>();

  // FETCHES BUSINESS DATA FROM REMOTE DATABSE ONCE AND SETS BUSINESSDATA STATE TO IT.
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await fetch(`http://localhost:5000/api/businesses/${id}`);
      const businessData = await res.json();
      console.log(businessData);
      setBusinessData(businessData);
    };
    getBusinessData();
  }, []);

  // CHECKS IF THE BUSINESSDATA STATE HAS VALUE. RENDERS THE BUSINESS PAGE IF IT DOES AND SETS A LOADING SCREEN IF IT DOESN'T.
  // THE FIRST RENDER WON'T HAVE DATA, SINCE USEEFFECT, WHICH GIVES THE STATE IT'S VALUE, RUNS AFTER THE FIRST RENDER.
  return (
    <div className="content-wrapper">
      <Header>
        <div className="content">
          <h1>Business Details</h1>
        </div>
      </Header>
      {businessData ? (
        <React.Fragment>
          <About
            name={businessData.name}
            description={businessData.description}
            image={businessData.image}
            address={businessData.address}
          />
          <Review stars={businessData.stars} />
          <Book phone={businessData.phone} />
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BusinessPage;
