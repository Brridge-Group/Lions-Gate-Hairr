import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

export const Navbar = () => {
  const location = useLocation()
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

  console.log(user, role)

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
                <NavLink to='profile' activeStyle={{ fontWeight: '400' }}>
                  Profile
                </NavLink>
              </li>
              <li className='NavbarList_link '>
                <NavLink to='/'>Log Out</NavLink>
                {/* {localStorage.clear()} */}
              </li>
            </>
          )}
        </h4>
      </ul>
    </nav>
  )
}
