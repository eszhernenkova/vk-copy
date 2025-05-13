import React, {  StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import firebase from 'firebase/compat/app'



import './index.css';
import Layout from './components/layout/Layout';
import { store } from './components/store/store';
import Profile from './components/pages/profile/Profile';
import Friends from './components/pages/friends/Friends';
import Messages from './components/pages/massages/Messages';
import Home from './components/pages/home/Home';
import Auth from './components/pages/auth/Auth'


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home /> 
			},
			{
				path: '/profile/:id',
				element: <Profile /> 
			},
			{
				path: '/friends',
				element: <Friends />
			},
			{
				path: '/messages',
				element: <Messages /> 
			},
			{
				path: '/messages/id',
				element: <Messages /> 
			},
		]
		
	},
	{
		path: '/auth',
		element: <Auth />,
		children: [
			// {
			// 	path: 'login',
			// 	element: <Login />
			// },
			// {
			// 	path: 'register',
			// 	element: <Register />
			// }
		]
	},
]);



firebase.initializeApp({
	apiKey: "AIzaSyDbfZCbyFP-AmekPrIgnupiflxl6xCiGqM",
	authDomain: "vk-copy-c539d.firebaseapp.com",
	projectId: "vk-copy-c539d",
	storageBucket: "vk-copy-c539d.firebasestorage.app",
	messagingSenderId: "1078291128555",
	appId: "1:1078291128555:web:21b2f5d0ac2021bb205eae"
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>

	</StrictMode>
);

