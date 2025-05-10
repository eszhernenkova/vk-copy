import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import Layout from './components/layout/Layout';
import Home from './components/pages/home/Home';
import { store } from './components/store/store';


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout><Home /></Layout>,
		children: [
			
			{
				path: '/profile/:id',
				element: <Home /> //исправить на нужный
			},
			{
				path: '/friends/:id',
				element: <Home /> //исправить на нужный

			}
		]
	},
	// {
	// 	path: '/auth',
	// 	element: <AuthLayout />,
	// 	children: [
	// 		{
	// 			path: 'login',
	// 			element: <Login />
	// 		},
	// 		{
	// 			path: 'register',
	// 			element: <Register />
	// 		}
	// 	]
	// },
	// {
	// 	path: '*',
	// 	element: <Error/>
	// }
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>

	</StrictMode>
);

