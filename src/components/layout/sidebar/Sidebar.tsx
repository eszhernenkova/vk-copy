
import React, { FC } from 'react'
import UserItems from './UserItems'
import Menu from './Menu'

const Sidebar:FC = () => {
  return (
    <>
      <UserItems />
      <Menu />
    </>
  )
}

export default Sidebar