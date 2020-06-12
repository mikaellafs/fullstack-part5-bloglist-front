import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
		console.log(visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<>
			<button className="btn btn-info" style={hideWhenVisible} onClick={toggleVisibility}> {props.buttonLabel}</button>
			<div style={showWhenVisible}>
				<div>{props.children}</div>
				<button className="btn btn-info" onClick={toggleVisibility}>cancel</button>
			</div>
		</>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable