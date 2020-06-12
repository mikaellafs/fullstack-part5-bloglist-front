import React from 'react'
import { useParams } from "react-router-dom"
import { ListGroup } from 'react-bootstrap'

const User = ({userById}) => {
	const id = useParams().id
	const user = userById(id)
	if (!user) {
    return null
  }

	return (
		<ListGroup>
			<ListGroup.Item><h2>{user.name}</h2></ListGroup.Item>
			<ListGroup.Item>
			<h4>added blogs</h4>
			</ListGroup.Item>
			<ListGroup.Item>
			<ListGroup>
				{user.blogs.map(blog => (
					<ListGroup.Item key = {blog.id}>
						{blog.title}
					</ListGroup.Item>
				))}
			</ListGroup>
			</ListGroup.Item>
		</ListGroup>
	)
}

export default User