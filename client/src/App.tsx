import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import ListItems from "./pages/ListItems";
import NewItem from "./pages/NewItem";
import UpdateItem from "./pages/UpdateItem";
import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/Login";
import BusinessList from "./components/Businesses/BusinessList";
import BusinessDetails from "./components/BusinessDetails/BusinessDetails";
import AddBusiness from "./pages/AddBusiness";
import AddReview from "./components/AddReview/AddReview";

const App = () => {
  let routes;

  routes = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/items" exact>
        <ListItems />
      </Route>
      <Route path="/items/new" exact>
        <NewItem />
      </Route>
      <Route path="/items/:id" exact>
        <UpdateItem />
      </Route>
      <Route path="/user-signin" exact>
        <Login />
      </Route>
      <Route path="/user-signup" exact>
        <UserRegistration />
      </Route>
      <Route path="/businesses" exact>
        <BusinessList />
      </Route>
      <Route path="/businesses/:id" exact>
        <BusinessDetails />
      </Route>
      <Route path="/businessByCity/:city" exact>
        <BusinessList />
      </Route>
      <Route path="/add-business" exact>
        <AddBusiness />
      </Route>
      <Route path="/businesses/:id/add-review" exact>
        <AddReview />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Router>
      <div className="App">
        <Header />
        <SideBar />
        <div className="content">{routes}</div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
