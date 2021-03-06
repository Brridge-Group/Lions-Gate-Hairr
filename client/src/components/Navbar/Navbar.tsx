import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

import decode from 'jwt-decode'
import axios from 'axios'
import { MenuButton } from './MenuButton'
import './Navbar.css'

export const Navbar = () => {
  const location = useLocation()
  const history: any = useHistory()
  const dispatch = useDispatch()
  const getIsMobile = () => window.innerWidth <= 575
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('profile') ?? 'false')
  )
  const [role, setRole] = useState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [click, setClick] = useState(false)
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // console.log('isMobile', isMobile)
  const handleClickMobile = () => {
    setDropdown(!dropdown)
  }

  const onMouseEnter = () => {
    setDropdown(true)
  }

  const onMouseLeave = () => {
    setDropdown(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
  useEffect(() => {
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
      fetchData()
    }
  }, [user])

  const profileRoleOwner = async () => {
    if (role !== 'owner') {
      let revisedRole = {
        role: 'owner',
      }
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...revisedRole }),
      }
      try {
        const response = await fetch(
          `/api/users/${user.result._id}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error('New profile not saved! Please resubmit.')
        }
        await response.json()

        setRole(user.result.role)
        history.push('/my-businesses')
      } catch (error) {
        console.error('profile not created.')
      }
    }
  }
  const profileRoleUser = async () => {
    if (role !== 'user') {
      let revisedRole = {
        role: 'user',
      }
      // console.log('in profile user,revisedRole', revisedRole)
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...revisedRole }),
      }
      try {
        const response = await fetch(
          `/api/users/${user.result._id}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error('New profile not saved! Please resubmit.')
        }
        await response.json()
        setRole(user.result.role)
        // console.log(user, 'user, profileRoleUser', response, 'response')

        history.push('/profile')
      } catch (error) {
        console.error('profile not created.')
      }
    }
  }
  return (
    <nav className='Navbar'>
      <h4 className='Navbar_logo'>LOGO</h4>
      <input type='checkbox' id='chk' />
      <label htmlFor='chk' className='show-menu-btn' onClick={toggleMenu}>
        <MenuButton isOpen={isMenuOpen} />
      </label>
      <ul className='NavbarList menu'>
        <h4>
          <li className='NavbarList_link'>
            <NavLink to='/' exact={true} activeStyle={{ fontWeight: 400 }}>
              Home
            </NavLink>
          </li>
          {!user ? (
            <>
              <li className='NavbarList_link noUser'>
                <NavLink to='/user-signup' activeStyle={{ fontWeight: 400 }}>
                  Sign Up
                </NavLink>
              </li>
              <li className='NavbarList_link noUser'>
                <NavLink to='/user-signin' activeStyle={{ fontWeight: 400 }}>
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {isMobile ? (
                <li className='NavbarList_link mobile'>
                  <div className='Profile-dropdown' onClick={handleClickMobile}>
                    Profile{' '}
                    <span className='NavbarDropdown-carat'>
                      {!dropdown ? <FaCaretDown /> : <FaCaretUp />}
                    </span>
                  </div>
                  {dropdown && (
                    <ul
                      className={
                        click ? 'dropdown-menu clicked ' : 'dropdown-menu'
                      }>
                      <li
                        className='NavbarList_link dropdown'
                        onClick={profileRoleUser}>
                        <NavLink
                          to='/profile'
                          activeStyle={{ fontWeight: 400 }}>
                          User
                        </NavLink>
                      </li>

                      <li
                        className='NavbarList_link dropdown'
                        onClick={profileRoleOwner}>
                        <NavLink
                          to='/profile'
                          activeStyle={{ fontWeight: 400 }}>
                          Owner
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li
                  className='NavbarList_link '
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}>
                  Profile{' '}
                  <span className='NavbarDropdown-carat'>
                    <FaCaretDown />
                  </span>
                  {dropdown && (
                    <ul
                      className={
                        click ? 'dropdown-menu clicked ' : 'dropdown-menu'
                      }>
                      <li className='NavbarList_link' onClick={profileRoleUser}>
                        <NavLink
                          to='/profile'
                          activeStyle={{ fontWeight: 400 }}>
                          User
                        </NavLink>
                      </li>
                      <li
                        className='NavbarList_link'
                        onClick={profileRoleOwner}>
                        <NavLink
                          to='/my-businesses'
                          activeStyle={{ fontWeight: 400 }}>
                          Owner
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              )}

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
