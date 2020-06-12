import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

import { ListGroup, Table } from 'react-bootstrap'

const Comments = ({ blog }) => {
	const dispatch = useDispatch()

	const addComment = (event) =>{
		event.preventDefault()
		
		dispatch(commentBlog(blog, event.target.comment.value))
		event.target.comment.value = ""
	}



	return (
		<Table borderless >
			<tbody>
			<tr>
				<td><h4>Comments</h4></td>
			</tr>
			<tr>
			<td>
			<form onSubmit = {addComment}>
				<input type = "text" id = "comment">
				</input>            
				<button className="btn btn-info" type = "submit"> add comment </button>
			</form>
			</td>
			</tr>
			<tr>
			<td>
			<ListGroup>
				{blog.comments.map(cm => (
					
					<ListGroup.Item key = {cm}>{cm}</ListGroup.Item>
					
				))}
			</ListGroup>
			</td>
			</tr>
			</tbody>
		</Table>
	)
}

export default Comments