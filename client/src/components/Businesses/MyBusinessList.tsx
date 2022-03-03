import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Card } from "../../UIElements/Card";
import { Star } from "../../UIElements/Star";
import { About } from "../BusinessDetails/About";

export const MyBusinessList = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const ownerId = JSON.parse(localStorage.getItem("profile") ?? "false").result
    ._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "/api/businesses/get-business-by-ownersId/?id=" + `${ownerId}`
        );
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
                  <h1>My Businesses</h1>
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
