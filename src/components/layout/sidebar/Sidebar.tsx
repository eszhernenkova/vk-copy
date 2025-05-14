
import { FC } from 'react'
import UserItems from './UserItems'
import Menu from './Menu'
import User from './User'

const Sidebar:FC = () => {
  return (
    <>
      <User />
      <UserItems />
      <Menu />
    </>
  )
}

export default Sidebar