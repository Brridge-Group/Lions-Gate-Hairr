import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

export const Navbar = () => {
  const location = useLocation()
  const history: any = useHistory()
  const dispatch = useDispatch()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('profile') ?? 'false')
  )
  const [role, setRole] = useState()

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken: any = decode(token)
      const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime()
      // if (isTokenExpired) logout()
    }
    setUser(JSON.parse(localStorage.getItem('profile') ?? 'false'))
  }, [location])

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    //export to tell home component user is false
    history.push('export', {
      pathname: '/',
      state: { user: 'false' },
    })
  }

  if (user) {
    const fetchData = async () => {
      await axios
        .get(
          'http://localhost:5000/api/users' +
            `/get-profile/?id=${user.result._id}`
        )
        .then(async res => {
          // setName(res.data.name)
          setRole(res.data.role)
          // setImage(res.data.imageProfile)
        })
        .catch(error => {})
    }
  }

  return (
    <nav className='Navbar'>
      <h4 className='Navbar_logo'>LOGO</h4>
      <ul className='NavbarList'>
        <h4>
          <li className='NavbarList_link'>
            <NavLink to='/' exact={true} activeStyle={{ fontWeight: '400' }}>
              Home
            </NavLink>
          </li>
          {!user ? (
            <>
              <li className='NavbarList_link'>
                <NavLink to='/user-signup' activeStyle={{ fontWeight: '400' }}>
                  Sign Up
                </NavLink>
              </li>
              <li className='NavbarList_link'>
                <NavLink to='/user-signin' activeStyle={{ fontWeight: '400' }}>
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className='NavbarList_link'>
                <NavLink to='/profile' activeStyle={{ fontWeight: '400' }}>
                  Profile
                </NavLink>
              </li>
              <li className='NavbarList_link '>
                <NavLink to='/' onClick={logout}>
                  Log Out
                </NavLink>
              </li>
            </>
          )}
        </h4>
      </ul>
    </nav>
  )
}
