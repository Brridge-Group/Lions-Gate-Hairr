import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

const Navbar = () => {
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
    <div className='Navbar'>
      <h4 className='Navbar-Logo'>LOGO</h4>
      <nav className='Navbar-Container'>
        <ul className='Navbar-List'>
          <h4>
            <li className='Navbar-Link'>
              <NavLink to='/' exact={true} activeStyle={{ fontWeight: '400' }}>
                Home
              </NavLink>
            </li>
            {!user ? (
              <>
                <li className='Navbar-Link'>
                  <NavLink to='/user-signup'>Sign Up</NavLink>
                </li>
                <li className='Navbar-Link'>
                  <NavLink to='/user-signin'>Sign In</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className='Navbar-Link'>
                  <NavLink to='profile'>Profile</NavLink>
                </li>
                <li className='Navbar-Link'>
                  <NavLink to='#'>Log Out</NavLink>
                </li>
              </>
            )}
          </h4>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
