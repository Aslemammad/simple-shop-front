import React, { useState } from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';

import { Navbar, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useStateContext, useSetStateContext } from '../Context';

import { AddProduct, ContextInterface } from '../interfaces'

const AddProduct = (props: any) => {
    const { register, handleSubmit: handleSave, watch, errors } = useForm<AddProduct>();

    const [
        showModal,
        setShowModal
    ] = useState(false)
    const [
        message,
        setMessage
    ] = useState('');
    const [
        token,
        setToken
    ] = useLocalStorage('token', '');
    const [
        state,
        setState
    ] = [
            useStateContext(),
            useSetStateContext()
        ];
    const handleClick = (show: boolean) => () => setShowModal(show);
    const onSave = (product: AddProduct) => {
        const API_URL = process.env['API_URL'];
        axios
            .post(`${API_URL}/api/add-product`, product, {
                headers: {
                    'x-access-token': token
                }
            })
            .then(({ data }: any) => {
                setState((prevState: ContextInterface) => ({ ...prevState, products: [...prevState.products, { name: data.name, price: data.price, description: data.description, _id: data._id }] }))
                setShowModal(false)
            })
            .catch(({ response }: any) => {
                setMessage(response.data.message);
            });
    };
    return (
        <>
            <Button className='ml-3 mt-3' variant='info' onClick={handleClick(true)}>{'\u{2935}'}</Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClick(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add a Product
    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={register({ required: true })} placeholder='Name' name='name' />

                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                ref={register({ required: true })}
                                placeholder='Price'
                                name='price'
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                ref={register({ required: true })}
                                placeholder='Description'
                                name='description'
                            />
                            <Form.Text className='text-muted'>{message}</Form.Text>

                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='mr-1'
                        variant='primary'
                        type='submit'
                        name='register'
                        onClick={handleSave(onSave)}
                    >
                        Save{' '}
                    </Button>
                    <Button variant='secondary' onClick={handleClick(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};
export default AddProduct;
