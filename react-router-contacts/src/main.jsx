import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import './index.css'
import Index from './routes'
import Contact, { action as contactAction, loader as contactLoader } from './routes/contact'
import { action as destroyAction } from './routes/destroy'
import EditContact, { action as editAction } from './routes/edit'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Index />
					},
					{
						path: "contacts/:contactId",
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: "contacts/:contactId/edit",
						element: <EditContact />,
						loader: contactLoader,
						action: editAction,
					},
					{
						path: "contacts/:contactId/destroy",
						action: destroyAction,
						errorElement: <div>Oops! There was an error.</div>
					}
				]
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)








/* import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import './index.css'
import Index from './routes'
import Contact, { action as contactAction, loader as contactLoader } from './routes/contact'
import { action as destroyAction } from './routes/destroy'
import EditContact, { action as editAction } from './routes/edit'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Root/>}
			loader={rootLoader}
			action={rootAction}
			errorElement={<ErrorPage/>}
		>
			<Route errorElement={<ErrorPage/>}>
				<Route index element={<Index/>} />
				<Route path='contacts/:contactId' element={<Contact/>} loader={contactLoader} action={contactAction} />
				<Route path='contacts/:contactId/edit' element={<EditContact />} loader={contactLoader} action={editAction} />
				<Route path='contacts/:contactId/destroy' action={destroyAction} />
			</Route>
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
) */
