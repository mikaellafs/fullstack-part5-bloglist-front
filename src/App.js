import React, { useEffect } from 'react'
import { CreateBlog, Login } from './components/Forms'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'

import { initBlogs, newBlog } from './reducers/blogReducer'
import { successNotif } from './reducers/notificationReducer'
import { keepLogin } from './reducers/loginReducer'

import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { Card } from 'react-bootstrap'


import {
	BrowserRouter as Router,
	Switch, Route
} from "react-router-dom"
import { initUsers } from './reducers/userReducer'
import Menu from './components/Menu'

const App = () => {
	const dispatch = useDispatch()
	const [user, users, blogs] = useSelector(state => [state.user, state.users, state.blogs])

	useEffect(() => {
		dispatch(initBlogs())
		dispatch(initUsers())
	}, [dispatch])

	const blogFormRef = React.createRef()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(keepLogin(user))
		}
	}, [dispatch])

	const createBlog = async blog => {
		blogFormRef.current.toggleVisibility()

		dispatch(newBlog(blog))

		dispatch(successNotif(`a new blog ${blog.title} by ${blog.author}`))
	}

	const userById = (id) => users.find(u => u.id === id)
	const blogById = (id) => blogs.find(b => b.id === id)

	if (user) {
		return (
			<div className="container">
				<Notification />
				<Router>
					<Menu />
					<Switch>
						<Route path="/users/:id">
							<User userById={userById} />
						</Route>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/blogs/:id">
							<Blog user={user} blogById={blogById} />
						</Route>
						<Route path="/">
							<h2>Blogs</h2>
							<Togglable buttonLabel='new blog' ref={blogFormRef} class="container-fluid">
								<Card style={{ width: '40rem', padding: "10px", margin: "2px"}} >
									<Card.Title>Create new</Card.Title>
									<Card.Body>
									<CreateBlog createBlog={createBlog} />
									</Card.Body>
								</Card>
							</Togglable>
							<BlogList user={user} />
						</Route>
					</Switch>
				</Router>
			</div>
		)

	}

	return (
		<div className="container">
			<Login />
		</div>
	)
}

export default App

