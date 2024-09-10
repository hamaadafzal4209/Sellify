import React, { FC } from 'react'
import Hero from './components/Home/Hero'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const Navbar:FC<Props> = () => {
  return (
    <div>
      <Hero/>
    </div>
  )
}

export default Navbar