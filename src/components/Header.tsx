import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar bg='dark' variant='dark' sticky='top'>
			<Navbar.Brand className='mr-auto' href='/'>{'\u{1F4BB}'}</Navbar.Brand>
			<Form inline>
				<FormControl type='text' placeholder='Search' className='mr-2' />
				<Button variant='outline-info'>Search</Button>
			</Form>
		</Navbar>
	);
};
export default Header;
