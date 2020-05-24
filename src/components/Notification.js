import React from 'react'
import './notification.css'

const Notification = ({ m }) => {
	if (m === null) {
		return null
	}

	return (
		<div className={m.style}>
			{m.message}
		</div>
	)
}

export default Notification