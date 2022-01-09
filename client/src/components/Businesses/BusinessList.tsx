import React, { useState, useEffect } from "react";

import Card from "../../UIElements/Card";

const BusinessList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const BUSINESSES: any = [
    {
      id: "b1",
      name: "Tiffany's Salon",
      desc: "Up-scale hair salon for women with vraiety of services",
      address: "1234 Yonge St, Toronto, ON",
    },

    {
      id: "b2",
      name: "Baber's Chair",
      desc: "Men's salon providing modern cuts with affordable prices",
      address: "1234 Queen St W, Toronto, ON",
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      setList(BUSINESSES);
      setLoading(false);
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
            <Card className="card card-primary card-outline" key={business.id}>
              <div className="card-body">
                <h5 className="class-title">{business.name}</h5>
                <p className="card-text">{business.desc}</p>
                <p className="card-text">{business.address}</p>
              </div>
            </Card>
          ))}
        </div>
      </React.Fragment>
    );
  }
};

export default BusinessList;
