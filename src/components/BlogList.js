import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogList = ({user}) => {
	const sortedBlogs = useSelector(state => state.blogs.sort((b1, b2) => b2.likes - b1.likes))

	return (
		<ListGroup >
			{sortedBlogs.map(blog => (
				<ListGroup.Item key = {blog.id}>
					<Link to = {`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
				</ListGroup.Item>
			))}
		</ListGroup>
	)

}

export default BlogList