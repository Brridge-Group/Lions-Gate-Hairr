import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import ListItems from './pages/ListItems'
import UserRegistration from './pages/UserRegistration'
import Login from './pages/Login'
import BusinessList from './pages/Businesses/BusinessList'
import BusinessDetails from './components/BusinessDetails/BusinessDetails'
import AddBusiness from './pages/AddBusiness'
import AddReview from './components/AddReview/AddReview'
import MyBusinessList from './components/Businesses/MyBusinessList'
import Navbar from './components/Navbar/Navbar'
import Profile from './pages/Profile/Profile'

import './App.css'

const App = () => {
  let routes: any

  routes = (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/items' exact>
        <ListItems />
      </Route>
      <Route path='/user-signin' exact>
        <Login />
      </Route>
      <Route path='/user-signup' exact>
        <UserRegistration />
      </Route>
      <Route path='/businesses' exact>
        <BusinessList />
      </Route>
      <Route path='/my-businesses' exact>
        <MyBusinessList />
      </Route>
      <Route path='/businesses/:id' exact>
        <BusinessDetails />
      </Route>
      <Route path='/businessByCity/:city' exact>
        <BusinessList />
      </Route>
      <Route path='/add-business' exact>
        <AddBusiness />
      </Route>
      <Route path='/businesses/:id/add-review' exact>
        <AddReview />
      </Route>
      <Route path='/profile' exact>
        <Profile />
      </Route>
      <Redirect to='/' />
    </Switch>
  )

  return (
    <Router>
      <div className='AppContainer'>
        <Navbar />
        {routes}
      </div>
    </Router>
  )
}

export default App
