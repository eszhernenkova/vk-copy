import { FC, useState } from 'react'

import {Search} from '@mui/icons-material'

import styles from './Header.module.css'


const Header:FC = () => {

  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  }
  return (
    <header className={styles.header}>
      <div className={styles['image-wrapper']}>
        <img src='../../vk-logo.png' alt="" />
      </div>
      <div className={styles.wrapper}>
      {!isSearchActive &&
        <Search />
      }
        <input 
          type="text" 
          placeholder='Поиск'
          onClick={handleSearchClick} />
      </div>

    </header>
  )
}

export default Header