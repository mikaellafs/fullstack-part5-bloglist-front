let idLast

export const removeNotif = () =>{
	return dispatch =>{
		clearTimeout(idLast)

		idLast = setTimeout(() => {
			dispatch({
				type: 'REMOVE'
			})
		}, 5000)
	}
}

export const successNotif = (message) =>{
	return dispatch =>{
		dispatch({
			type: 'NEW_GOOD',
			message: message
		})

		dispatch(removeNotif())
	}
}

export const failNotif = (message) =>{
	return dispatch =>{
		dispatch({
			type: 'NEW_BAD',
			message: message
		})

		dispatch(removeNotif())
	}
}

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'NEW_GOOD': return {message: action.message, style: 'good'}
		case 'NEW_BAD': return {message: action.message, style: 'bad'}
		case 'REMOVE': return null
		default: return state
	}
}

export default notificationReducer