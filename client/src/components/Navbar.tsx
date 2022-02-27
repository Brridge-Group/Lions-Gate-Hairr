import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li>Home</li>
        <li>Sign Up</li>
        <li>Sign In</li>
      </ul>
    </div>
  )
}

export default Navbar
