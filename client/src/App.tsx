import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home/Home'
import { UserRegistration } from './pages/Auth/UserRegistration/UserRegistration'
import Login from './pages/Auth/Login/Login'
import { BusinessList } from './pages/Businesses/BusinessList'
import { BusinessDetails } from './components/BusinessDetails/BusinessDetails'
import { AddBusiness } from './pages/AddBusiness'
import { AddReview } from './components/AddReview/AddReview/AddReview'
import { MyBusinessList } from './components/MyBusinessList/MyBusinessList'
import { Navbar } from './components/Navbar'
import { Profile } from './pages/Profile/Profile'
import { EditProfile } from './pages/Auth/EditProfile'

export const App = () => {
  let routes: any
  routes = (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/user-signin' exact>
        <Login />
      </Route>
      <Route path='/user-signup' exact>
        <UserRegistration />
      </Route>
      <Route path='/users/:id' exact>
        <EditProfile />
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
