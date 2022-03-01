import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

const Navbar = () => {
  return (
    <header className='navbar'>
      <h4>LOGO</h4>
      <nav>
        <ul>
          <h4>
            <li className='active'>Home</li>
            <li>Sign Up</li>
            <li>Sign In</li>
          </h4>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
