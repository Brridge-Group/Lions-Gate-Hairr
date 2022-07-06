// React Components
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

// Custom Imports
import { Home } from './pages/Home/Home'
import { UserRegistration } from './pages/Auth/UserRegistration/UserRegistration'
import Login from './pages/Auth/Login/Login'
import { BusinessList } from './pages/BusinessList/BusinessList'
import { BusinessDetails } from './components/BusinessDetails/BusinessDetails'
import { AddBusiness } from './pages/AddBusiness/AddBusiness'
import { AddReview } from './components/Reviews/AddReview'
import { EditReview } from './components/Reviews/EditReview'
import { MyBusinessList } from './components/MyBusinessList/MyBusinessList'
import { EditBusiness } from './pages/EditBusiness/EditBusiness'

import { Navbar } from './components/Navbar/Navbar'
import { Profile } from './pages/Profile/Profile'
import { EditProfile } from './pages/Auth/EditProfile'

// Custom Styles
import './App.css'

export const App = () => {
  let routes: any
  routes = (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/user-signin'>
        <Login />
      </Route>
      <Route exact path='/user-signup'>
        <UserRegistration />
      </Route>
      <Route exact path='/users/:id'>
        <EditProfile />
      </Route>
      <Route exact path='/my-businesses'>
        <MyBusinessList />
      </Route>
      <Route exact path='/businesses/:id/edit-business'>
        <EditBusiness />
      </Route>
      <Route exact path='/businesses/:id'>
        <BusinessDetails />
      </Route>
      <Route exact path='/businessByCity/:city'>
        <BusinessList />
      </Route>
      <Route exact path='/add-business'>
        <AddBusiness />
      </Route>
      <Route exact path='/businesses/:id/add-review'>
        <AddReview />
      </Route>
      <Route exact path='/reviews/:id/edit-review'>
        <EditReview />
      </Route>
      <Route exact path='/profile'>
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
