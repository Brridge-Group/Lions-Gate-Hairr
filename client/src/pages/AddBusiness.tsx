import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { regions } from "../constants/regions";

const AddBusiness = () => {
  const [formData, setFormData]: any = useState({
    name: "",
    description: "",
    image: "",
    street: "",
    postalCode: "",
    city: "",
    phone: "",
  });
  const [region, setRegion] = useState();
  const [country, setCountry] = useState();
  const history = useHistory();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegion = (e: any) => {
    setRegion(e.target.value);
  };

  const handleCountry = (e: any) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      address: {
        street: formData.street,
        postalCode: formData.postalCode,
        city: formData.city,
        region: region,
        country: country,
      },
      phone: formData.phone,
    };

    axios
      .post("http://localhost:5000/api/businesses/add-business", data)
      .then((response) => {
        console.log(response.data);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <ContentHeader title="Add New Business" />
        <div className="card w-50 mx-auto">
          <div className="card-header">
            <h3 className="card-title">Add New Business</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  className="form-control"
                  placeholder="Enter business name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <br />
                <textarea
                  name="description"
                  value={formData.description}
                  className="form-control"
                  placeholder="Enter business description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  className="form-control"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input
                  name="image"
                  type="text"
                  value={formData.image}
                  className="form-control"
                  placeholder="Enter image url"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <h4>Address</h4>
              <div className="form-group">
                <label>Street:</label>
                <input
                  name="street"
                  type="text"
                  value={formData.street}
                  className="form-control"
                  placeholder="Enter street address"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Postal Code:</label>
                <input
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  className="form-control"
                  placeholder="Enter postal code"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  name="city"
                  type="text"
                  value={formData.city}
                  className="form-control"
                  placeholder="Enter city"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Province / State:</label>
                <select
                  className="custom-select rounded-0"
                  onChange={handleRegion}
                >
                  {regions.map((region) => (
                    <option value={region.value}>{region.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Country:</label>
                <select
                  className="custom-select rounded-0"
                  onChange={handleCountry}
                >
                  <option value="Canada"> Canada </option>
                  <option value="United States"> United States</option>
                </select>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>{" "}
                <Link to="/" className="btn btn-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddBusiness;
