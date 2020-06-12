import blogService from '../services/blogs'

export const likeBlog = (blog) =>{
	return async dispatch =>{
		const newBlog = {...blog, likes: blog.likes +1}
		await blogService.update(blog.id, newBlog)

		dispatch({
			type: 'UPDATE',
			id: blog.id,
			blog: newBlog
		})
	}
}

export const commentBlog = (blog, comment) =>{
	return async dispatch =>{
		const newBlog = {...blog, comments: blog.comments.concat(comment)}
		await blogService.comment(blog.id, comment)

		dispatch({
			type: 'UPDATE',
			id: blog.id,
			blog: newBlog
		})
	}
}

export const newBlog = (blog) =>{
	return async dispatch =>{
		const createdBlog = await blogService.create(blog)

		dispatch({
			type: 'NEW',
			blog: createdBlog
		})
	}
}

export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

export const removeBlog = (id) =>{
	return async dispatch =>{
		await blogService.remove(id)

		dispatch({
			type: 'REMOVE',
			id: id
		})
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS': return action.data
		case 'NEW': return state.concat(action.blog)
		case 'UPDATE': return state.map(blog => blog.id === action.id ? action.blog : blog)
		case 'REMOVE': return state.filter(blog => blog.id !== action.id)
		default: return state
	}

}

export default reducer