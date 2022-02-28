import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

const Navbar = () => {
  return (
    <header className='navbar'>
      <h5>LOGO</h5>
      <nav>
        <ul>
          <h5>
            <li className='active'>Home</li>
            <li>Sign Up</li>
            <li>Sign In</li>
          </h5>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
