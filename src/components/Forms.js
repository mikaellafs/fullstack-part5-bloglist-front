import React, { useState } from 'react'
import Notification from './Notification'

const Login = ({ notification, handleLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const doLogin = async (event) => {
		event.preventDefault()

		await handleLogin(username, password)

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<Notification m={notification} />
			<form onSubmit={doLogin}>
				<div>
					username
					<input
						id = 'username'
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id = 'password'
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

const CreateBlog = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const addBlog = async (event) => {
		event.preventDefault()

		await createBlog(newBlog)
		
		setNewBlog({ title: '', author: '', url: '' })
	}

	return (
		<form onSubmit={addBlog}>
			<table>
				<tbody>
					<tr>
						<td>title</td>
						<td><input
							id = 'title'
							type="text"
							name="Title"
							value={newBlog.title}
							onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}>
						</input>
						</td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td>author</td>
						<td><input
							id = 'author'
							type="text"
							name="Author"
							value={newBlog.author}
							onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}>
						</input>
						</td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td>url</td>
						<td><input
							id = 'url'
							type="text"
							name="URL"
							value={newBlog.url}
							onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}>
						</input>
						</td>
					</tr>
				</tbody>
			</table>
			<button type="submit">create</button>
		</form>
	)
}
export {CreateBlog, Login}