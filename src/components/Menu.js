import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

import { Nav, Navbar } from 'react-bootstrap'

const Menu = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const padding = {
		paddingLeft: 10,
		paddingRight: 10
	}
	return (
		<Navbar variant="outline-secondary" style ={{backgroundColor: "#ccd9ff", borderRadius: "0px 0px 10px 10px"}}>
			<Nav>
				<Nav.Link className="navbar-brand" href='/' >blogs</Nav.Link>
				<Nav.Link className="navbar-brand" href='/users' >users</Nav.Link>
			</Nav>
			<Navbar.Brand>
				<span style={padding}>
					{user.name} logged in
				</span>
				<button className="btn btn-info" onClick={() => dispatch(logout())}>logout </button>
			</Navbar.Brand>
		</Navbar>
	)
}

export default Menu