import React, { useState } from 'react'

const Blog = ({ blog, modifyBlog, removeBlog, user }) => {
	const [show, setShow] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const showB = event => {
		event.preventDefault()

		setShow(!show)
	}

	const increaseLikes = (event) => {
		event.preventDefault()

		modifyBlog(blog.id, {
			...blog,
			likes: blog.likes + 1,
			user: blog.user
		})
	}

	const deleteBlog = event => {
		event.preventDefault()

		let result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
		if (result) removeBlog(blog.id)
	}

	return (
		<div style={blogStyle} className = 'blog'>
			<div>{blog.title} {blog.author} <button id = 'view' onClick={showB}>{show ? 'hide' : 'view'}</button></div>
			<div style={{ display: show ? '' : 'none' }} className = 'extraInfo'>
				{blog.url}
				<div>likes <span className = 'numberOfLikes'>{blog.likes}</span> <button id = 'like' onClick={increaseLikes}>like</button> </div>
				<div>{blog.user.name}</div>
				{user.name === blog.user.name ? <button id = 'delete' onClick={deleteBlog}>remove</button> : ''}
			</div>
		</div>
	)
}

export default Blog
