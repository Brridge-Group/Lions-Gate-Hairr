import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../UIElements/Card";
import Star from "../../UIElements/Star";
import About from "../BusinessDetails/About";

const BusinessList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/businesses/get-businesses");
        const businessesList = await res.json();
        setList(businessesList);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body row">
            <h2>Loading....</h2>
          </div>
        </div>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="content-wrapper">
        <Card>
          <h2>No businesses found.</h2>
        </Card>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="container-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>List of Businesses</h1>
                </div>
              </div>
            </div>
          </div>
          {list.map((business: any) => (
            <Card
              className="BusinessCard card-primary card-outline"
              key={business._id}
            >
              <div
                onClick={() => history.push("businesses/" + `${business._id}`)}
              >
                <About
                  name={business.name}
                  description={business.description}
                  image={business.image}
                  address={business.address}
                />
                <Star stars={business.stars} />
              </div>
            </Card>
          ))}
        </div>
      </React.Fragment>
    );
  }
};

export default BusinessList;
