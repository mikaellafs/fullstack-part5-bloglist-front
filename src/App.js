import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {CreateBlog, Login} from './components/Forms'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null)
	const blogFormRef = React.createRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const logout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({
				username, password,
			})
			blogService.setToken(user.token)
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)

			setUser(user)
		} catch (exception) {
			setNotification({ message: 'Wrong username or password', style: 'bad' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
		}
	}

	const createBlog = async newBlog => {
		blogFormRef.current.toggleVisibility()

		const createdBlog = await blogService.create(newBlog)
		setNotification({ message: `a new blog ${createdBlog.title} by ${createdBlog.author}`, style: 'good' })
		setTimeout(() => {
			setNotification(null)
		}, 5000)

		setBlogs(blogs.concat(createdBlog))
	}

	const setBlog = async (id, updatedBlog) => {
		const blog = await blogService.update(id, updatedBlog)

		setBlogs(blogs.map(b => (b.id === blog.id) ? updatedBlog : b))
	}

	const removeBlog = async id => {
		await blogService.remove(id)

		setBlogs(blogs.filter(b => b.id !== id))
	}


	const showBlogs = () => {
		let sortedBlogs = blogs.sort((b1, b2) => b1.likes - b2.likes)
		return (
			<div>
				<h2>Blogs</h2>
				<Notification m={notification} />
				<p>{user.name} logged in <button onClick={logout}>logout </button></p>

				<Togglable buttonLabel='new blog' buttonLabel2='cancel' ref={blogFormRef}>
					<h2>Create new</h2>
					<CreateBlog createBlog={createBlog} />
				</Togglable>

				{sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} modifyBlog={setBlog} removeBlog={removeBlog} user={user} />)}
			</div>
		)
	}

	return (
		<div>
			{user ? showBlogs()
				: <Login handleLogin={handleLogin} notification={notification} />}
		</div>
	)
}

export default App