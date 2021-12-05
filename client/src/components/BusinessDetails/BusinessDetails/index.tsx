import { Header } from "./BusinessDetailsPageElements";
import About from "../About";
import Book from "../Book";
import Review from "../Review";

interface Business {
  name: string;
  description: string;
  image: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  stars: number;
  phone: string;
}

const BusinessPage = () => {
  const data: Business = {
    name: "Business Name",
    description: "Description of business goes here.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    address: {
      street: "12 Main Street",
      city: "Toronto",
      province: "ON",
      postalCode: "L3H 4L6",
    },
    stars: 3.5,
    phone: "+1 (111) 111-1111",
  };

  return (
    <div className="content-wrapper">
      <Header>
        <div className="content">
          <h1>Business Details</h1>
        </div>
      </Header>
      <About
        name={data.name}
        description={data.description}
        image={data.image}
        address={data.address}
      />
      <Review stars={data.stars} />
      <Book phone={data.phone} />
    </div>
  );
};

export default BusinessPage;
