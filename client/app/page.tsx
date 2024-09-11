import React, { FC } from 'react'
import Hero from './components/Home/Hero'
import {Toaster} from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const Navbar:FC<Props> = () => {
  return (
    <div>
      <Toaster/>
      <Hero/>
    </div>
  )
}

export default Navbar