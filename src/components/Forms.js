import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/loginReducer'
import { failNotif } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'

const Login = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const doLogin = (event) => {
		event.preventDefault()

		try {
			dispatch(login(username, password))
		} catch (exception) {
			dispatch(failNotif('Wrong username or password'))
		}

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<Notification />
			<Form onSubmit={doLogin}>
				<Form.Group >
					<Form.Label>username:</Form.Label>
					<Form.Control
						id='username'
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
					<Form.Label>password:</Form.Label>
					<Form.Control
						id='password'
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
					<p> </p>
					<Button variant="primary" type="submit">login</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

const CreateBlog = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const addBlog = (event) => {
		event.preventDefault()

		createBlog(newBlog)

		setNewBlog({ title: '', author: '', url: '' })
	}

	return (
		<form onSubmit={addBlog}>
			<div className="form-group row">
				<label className="col-sm col-form-label">title</label>
				<div className="col-sm-10">
					<input
						className="form-control form-control-sm"
						id='title'
						type="text"
						name="Title"
						value={newBlog.title}
						onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}>
					</input>
				</div>
			</div>

			<div className="form-group row">
				<label className="col-sm col-form-label">author</label>
				<div className="col-sm-10">
					<input
						className="form-control form-control-sm"
						id='author'
						type="text"
						name="Author"
						value={newBlog.author}
						onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}>
					</input>
				</div>
			</div>

			<div className="form-group row">
				<label className="col-sm col-form-label">url</label>
				<div className="col-sm-10">
					<input
						className="form-control form-control-sm"
						id='url'
						type="text"
						name="URL"
						value={newBlog.url}
						onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}>
					</input>
				</div>
			</div>
			<Button className="btn btn-info" type= "submit">create</Button>
		</form>
	)
}
export { CreateBlog, Login }