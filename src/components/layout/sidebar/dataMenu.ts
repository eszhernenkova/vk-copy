import * as Icons from '@mui/icons-material'
import { IMenuItem } from '../../../types'

export const menu: IMenuItem[] = [
    {
       tittle: 'Моя страница',
       link: '/profile',
       icon: Icons.Home
    },
    {
        tittle: 'Друзья',
        link: '/friends',
        icon: Icons.People
    },
    {
        tittle: 'Новости',
        link: '/',
        icon: Icons.Article
    },

]