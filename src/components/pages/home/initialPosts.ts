import { IPost } from "../../../types";

export const initialPosts: IPost[] = [
    {
        author: {
            _id: 'fdsfsf',
            avatar: '/image.png',
            name: 'Dmitry'
        },
        content: 'Пробный пост',
        createdAt: '15 минут назад',
        images: [
            '/1.jpg',
            '/2.jpg',
            '/3.jpg',
            '/4.jpg',
            '/5.jpg'
        ],
      },
]