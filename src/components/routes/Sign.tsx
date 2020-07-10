import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SignInterface } from '../../interfaces';

import {
	FormControl,
	InputGroup,
	Form,
	Col,
	Row,
	Container,
	ButtonToolbar,
	ButtonGroup,
	Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import { useStateContext, useSetStateContext } from '../../Context';

const Sign = () => {
	const { register, handleSubmit, watch, errors } = useForm<SignInterface>();
	const [
		state,
		setState
	] = [
			useStateContext(),
			useSetStateContext()
		];
	const [
		token,
		setToken
	] = useLocalStorage('token', '');
	const [
		message,
		setMessage
	] = useState('');
	const history = useHistory()

	const onSubmit = (data: SignInterface, event: any) => {
		const API_URL = process.env['API_URL'];
		const eventTarget = event.target.name;
		axios
			.post(`${API_URL}/api/${eventTarget}`, data)
			.then(({ data }: any) => {
				setToken(data.token);
				setState({ ...state, user: data.username })
				history.push('/')

			})
			.catch(({ response }: any) => {

				setMessage(response.data.message);
			});
	};


	return (

		<Container className='p-5'>
			<Row>
				<Col>
					<Form>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Username</Form.Label>
							<Form.Control ref={register} type='username' placeholder='Enter username' name='username' />
							<Form.Text className='text-muted'>
								We will never share your username with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								ref={register({ required: true })}
								type='password'
								placeholder='Password'
								name='password'
							/>
							<Form.Text className='text-muted red'>{message} </Form.Text>
						</Form.Group>

						<Button
							className='mr-1'
							variant='secondary'
							type='submit'
							name='register'
							onClick={handleSubmit(onSubmit)}>
							Sign up{' '}
						</Button>
						<Button variant='outline-secondary' type='submit' name='login' onClick={handleSubmit(onSubmit)}>
							Log in
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
export default Sign;
