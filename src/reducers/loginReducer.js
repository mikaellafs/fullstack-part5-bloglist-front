import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (username, password) => {
	return async dispatch => {
		const user = await loginService.login({
			username, password,
		})

		blogService.setToken(user.token)
		window.localStorage.setItem(
			'loggedBlogappUser', JSON.stringify(user)
		)

		dispatch({
			type: 'LOGIN',
			user: user
		})
	}
}

export const logout = () =>{
	return async dispatch =>{
		window.localStorage.removeItem('loggedBlogappUser')

		dispatch({
			type: 'LOGOUT'
		})
	}
}

export const keepLogin = (user) =>{
	blogService.setToken(user.token)
	
	return dispatch =>{
		dispatch({
			type: 'LOGIN',
			user: user
		})
	}
}

const loginReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN': return action.user
		case 'LOGOUT': return null
		default: return state
	}
}

export default loginReducer