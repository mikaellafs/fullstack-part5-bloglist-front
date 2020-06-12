import React from 'react'
import './notification.css'
import { useSelector } from 'react-redux'


import { Alert } from 'react-bootstrap'

const Notification = () => {
	const m = useSelector(state => state.notification)

	if (m === null) {
		return null
	}

	return (
		<div >
			<Alert variant = {m.style === "good"? "success": "danger"}>
				{m.message}
			</Alert>
		</div>
	)
}

export default Notification