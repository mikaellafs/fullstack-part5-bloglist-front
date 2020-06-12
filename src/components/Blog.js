import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

import { likeBlog, removeBlog } from '../reducers/blogReducer'

import Comments from './Comments'
import { Table } from 'react-bootstrap'

const Blog = ({ blogById, user }) => {
	const dispatch = useDispatch()
	const blog = blogById(useParams().id)

	if (!blog) return null

	const increaseLikes = (event) => {
		event.preventDefault()

		dispatch(likeBlog(blog))
	}

	const deleteBlog = event => {
		event.preventDefault()

		let result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
		if (result) dispatch(removeBlog(blog.id))
	}

	return (
		<>
		<Table >
			<tbody className = "blog">
					<tr>
						<td><h3>{blog.title} {blog.author}</h3></td>
					</tr>
					<tr>
						<td>
						<a href={blog.url}>{blog.url}</a>
						<div>likes <span className='numberOfLikes'>{blog.likes}  </span>
							<button className="btn btn-info" id='like' onClick={increaseLikes}>like</button> </div>
						<div>added by {blog.user.name}</div>
						{user.name === blog.user.name ? <button className="btn btn-info" id='delete' onClick={deleteBlog}>remove</button> : ''}
						</td>
					</tr>
					<tr><td> </td></tr>
			</tbody>
		</Table>
		<Comments blog={blog} />
		</>
	)
}

export default Blog
