import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

export const Navbar = () => {
  const location = useLocation()
  const history = useHistory()
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
    history.push('/user-signin')
    setUser('false')
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
        .catch(error => {
          console.log(error)
        })
    }
  }

  console.log(user, role)

  return (
    <header className='navbar'>
      <h4>LOGO</h4>
      <nav>
        <ul>
          <h4>
            <li>
              <NavLink to='/' exact={true} className='nav'>
                Home
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to='/user-signup' className='nav'>
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/user-signin' className='nav'>
                    Sign In
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='#' className='nav'>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to='#' className='nav' onClick={logout}>
                    Log Out
                  </NavLink>
                </li>
              </>
            )}
          </h4>
        </ul>
      </nav>
    </header>
  )
}
